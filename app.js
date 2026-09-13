// DOM Elements
const visitedPrefecturesList = document.getElementById('visitedPrefecturesList');
const genreFiltersList = document.getElementById('genreFiltersList');
const budgetFilter = document.getElementById('budgetFilter');
const modeCar = document.getElementById('modeCar');
const modeShinkansen = document.getElementById('modeShinkansen');
const modeFlight = document.getElementById('modeFlight');
const timeFilter = document.getElementById('timeFilter');
const startBtn = document.getElementById('startBtn');
const destinationName = document.getElementById('destinationName');
const destinationCost = document.getElementById('destinationCost');
const rouletteDisplay = document.getElementById('rouletteDisplay');
const resultDetails = document.getElementById('resultDetails');
const spotsList = document.getElementById('spotsList');

let isSpinning = false;
let spinInterval;

// 初期化処理
function init() {
    renderPrefectureCheckboxes();
    renderGenreCheckboxes();
    startBtn.addEventListener('click', startRoulette);
}

// ジャンルチェックボックスを描画
function renderGenreCheckboxes() {
    const genres = [...new Set(prefectureData.flatMap(p => p.genre))];
    genres.forEach(genre => {
        const wrapper = document.createElement('div');
        wrapper.className = 'pref-checkbox-wrapper';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `genre-${genre}`;
        checkbox.value = genre;
        
        const label = document.createElement('label');
        label.htmlFor = `genre-${genre}`;
        label.textContent = genre;
        
        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
        genreFiltersList.appendChild(wrapper);
    });
}

// 地方ごとにグループ化してチェックボックスを描画
function renderPrefectureCheckboxes() {
    const savedVisited = JSON.parse(localStorage.getItem('visitedPrefectures') || '[]');
    
    const regions = {};
    prefectureData.forEach(pref => {
        if (!regions[pref.region]) {
            regions[pref.region] = [];
        }
        regions[pref.region].push(pref);
    });

    for (const [regionName, prefs] of Object.entries(regions)) {
        const header = document.createElement('div');
        header.className = 'region-header';
        header.textContent = regionName;
        visitedPrefecturesList.appendChild(header);

        prefs.forEach(pref => {
            const wrapper = document.createElement('div');
            wrapper.className = 'pref-checkbox-wrapper';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `pref-${pref.id}`;
            checkbox.value = pref.id;
            if (savedVisited.includes(pref.id)) {
                checkbox.checked = true;
            }
            
            checkbox.addEventListener('change', saveVisitedToStorage);

            const label = document.createElement('label');
            label.htmlFor = `pref-${pref.id}`;
            label.textContent = pref.name;

            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);
            visitedPrefecturesList.appendChild(wrapper);
        });
    }
}

function saveVisitedToStorage() {
    const visitedIds = Array.from(document.querySelectorAll('.visited-prefectures-container input[type="checkbox"][id^="pref-"]:checked'))
                           .map(cb => parseInt(cb.value));
    localStorage.setItem('visitedPrefectures', JSON.stringify(visitedIds));
}

// 候補となる都道府県をフィルター
function getCandidates() {
    const visitedIds = Array.from(document.querySelectorAll('.visited-prefectures-container input[type="checkbox"][id^="pref-"]:checked'))
                           .map(cb => parseInt(cb.value));

    const maxBudgetStr = budgetFilter.value;
    const maxBudget = maxBudgetStr === 'unlimited' ? Infinity : parseInt(maxBudgetStr);
    
    const maxTimeStr = timeFilter.value;
    const maxTime = maxTimeStr === 'unlimited' ? Infinity : parseInt(maxTimeStr);

    const checkedGenres = Array.from(document.querySelectorAll('#genreFiltersList input[type="checkbox"]:checked'))
                               .map(cb => cb.value);
                               
    const allowedModes = {
        car: modeCar.checked,
        shinkansen: modeShinkansen.checked,
        flight: modeFlight.checked
    };

    return prefectureData.filter(pref => {
        // 除外県チェック
        if (visitedIds.includes(pref.id)) return false;
        
        // ジャンルチェック
        const matchesGenre = checkedGenres.length === 0 || checkedGenres.some(g => pref.genre.includes(g));
        if (!matchesGenre) return false;
        
        // 交通手段・時間・予算のチェック
        let hasValidTransport = false;
        let lowestTotalCost = Infinity;

        // 指定された各移動手段について、条件に合うかチェック
        for (const mode of ['car', 'shinkansen', 'flight']) {
            if (!allowedModes[mode]) continue; // チェックされていない手段はスキップ
            const tInfo = pref.transport[mode];
            if (!tInfo) continue; // その手段が存在しない場合はスキップ
            
            if (tInfo.time <= maxTime) {
                hasValidTransport = true;
                const totalCost = pref.accommodationCost + tInfo.cost;
                if (totalCost < lowestTotalCost) {
                    lowestTotalCost = totalCost;
                }
            }
        }

        if (!hasValidTransport) return false; // 条件を満たす移動手段がない
        if (lowestTotalCost > maxBudget) return false; // 最安で行っても予算オーバー

        return true;
    });
}

function formatCurrency(number) {
    return new Intl.NumberFormat('ja-JP').format(number) + '円';
}

function formatTime(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h}時間${m}分`;
    if (h > 0) return `${h}時間`;
    return `${m}分`;
}

function startRoulette() {
    if (isSpinning) return;

    const candidates = getCandidates();

    if (candidates.length === 0) {
        alert("条件に合う行き先がありません。予算や移動時間、手段などの条件を緩めてください。");
        return;
    }

    isSpinning = true;
    startBtn.disabled = true;
    startBtn.textContent = "ルーレット中...";
    startBtn.classList.remove('pulse');
    destinationCost.innerHTML = "";
    resultDetails.style.display = 'none'; // 追加情報を隠す
    rouletteDisplay.classList.add('spinning');

    let count = 0;
    const maxCount = 30; 
    const speed = 50; 

    spinInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * candidates.length);
        destinationName.textContent = candidates[randomIndex].name;
        
        count++;
        if (count >= maxCount) {
            stopRoulette(candidates);
        }
    }, speed);
}

function stopRoulette(candidates) {
    clearInterval(spinInterval);
    isSpinning = false;
    startBtn.disabled = false;
    startBtn.textContent = "もう一度決める！";
    startBtn.classList.add('pulse');
    rouletteDisplay.classList.remove('spinning');

    const finalIndex = Math.floor(Math.random() * candidates.length);
    const selected = candidates[finalIndex];

    destinationName.textContent = `🎊 ${selected.name} 🎊`;
    
    // 詳細な費用の内訳を作成
    let breakdownHtml = `<div class="cost-breakdown" style="font-size: 1rem; text-align: left; background: #fff; padding: 15px; border-radius: 10px; border: 2px solid var(--text-color); margin-top: 15px;">`;
    breakdownHtml += `<div style="font-weight:bold; color:var(--primary-color); margin-bottom: 5px;">🏨 宿泊費（2泊概算）: 約 ${formatCurrency(selected.accommodationCost)}</div>`;
    breakdownHtml += `<div style="font-weight:bold; margin-bottom: 5px;">移動手段（往復概算）:</div>`;
    
    if (selected.transport.car) {
        breakdownHtml += `<div style="margin-left: 10px;">🚗 車: 約 ${formatTime(selected.transport.car.time)} / ${formatCurrency(selected.transport.car.cost)}</div>`;
    }
    if (selected.transport.shinkansen) {
        breakdownHtml += `<div style="margin-left: 10px;">🚄 新幹線: 約 ${formatTime(selected.transport.shinkansen.time)} / ${formatCurrency(selected.transport.shinkansen.cost)}</div>`;
    }
    if (selected.transport.flight) {
        breakdownHtml += `<div style="margin-left: 10px;">✈️ 飛行機: 約 ${formatTime(selected.transport.flight.time)} / ${formatCurrency(selected.transport.flight.cost)}</div>`;
    }
    breakdownHtml += `</div>`;
    
    destinationCost.innerHTML = breakdownHtml;
    
    // 観光スポットを表示
    spotsList.innerHTML = '';
    selected.spots.forEach(spot => {
        const li = document.createElement('li');
        li.textContent = spot;
        spotsList.appendChild(li);
    });
    
    // 地図を表示
    const mapContainer = document.getElementById('mapContainer');
    mapContainer.innerHTML = `
        <div class="map-wrapper">
            <div class="dart-icon">🎯</div>
            <iframe 
                width="100%" 
                height="300" 
                frameborder="0" 
                style="border:0; border-radius: 10px;" 
                referrerpolicy="no-referrer-when-downgrade" 
                src="https://maps.google.com/maps?q=${encodeURIComponent(selected.name)}&t=&z=6&ie=UTF8&iwloc=&output=embed">
            </iframe>
        </div>
    `;

    // 観光プラン検索リンクを設定
    const planLink = document.getElementById('planLink');
    const planUrl = `https://www.google.com/search?q=${encodeURIComponent(selected.name + ' 観光スポット モデルコース')}`;
    planLink.href = planUrl;
    
    // 追加情報を表示
    resultDetails.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', init);
