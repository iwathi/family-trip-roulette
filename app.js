
// DOM Elements
const visitedPrefecturesList = document.getElementById('visitedPrefecturesList');
const budgetFilter = document.getElementById('budgetFilter');
const startBtn = document.getElementById('startBtn');
const destinationName = document.getElementById('destinationName');
const destinationCost = document.getElementById('destinationCost');
const rouletteDisplay = document.getElementById('rouletteDisplay');
const resultDetails = document.getElementById('resultDetails');
const spotsList = document.getElementById('spotsList');
const rakutenLink = document.getElementById('rakutenLink');

let isSpinning = false;
let spinInterval;

// 初期化処理
function init() {
    renderPrefectureCheckboxes();
    startBtn.addEventListener('click', startRoulette);
}

// 地方ごとにグループ化してチェックボックスを描画
function renderPrefectureCheckboxes() {
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

            const label = document.createElement('label');
            label.htmlFor = `pref-${pref.id}`;
            label.textContent = pref.name;

            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);
            visitedPrefecturesList.appendChild(wrapper);
        });
    }
}

// 候補となる都道府県をフィルター
function getCandidates() {
    const visitedIds = Array.from(document.querySelectorAll('.visited-prefectures-container input[type="checkbox"]:checked'))
                           .map(cb => parseInt(cb.value));

    const maxBudgetStr = budgetFilter.value;
    const maxBudget = maxBudgetStr === 'unlimited' ? Infinity : parseInt(maxBudgetStr);

    return prefectureData.filter(pref => {
        const notVisited = !visitedIds.includes(pref.id);
        const withinBudget = pref.cost <= maxBudget;
        return notVisited && withinBudget;
    });
}

function formatCurrency(number) {
    return new Intl.NumberFormat('ja-JP').format(number) + '円';
}

function startRoulette() {
    if (isSpinning) return;

    const candidates = getCandidates();

    if (candidates.length === 0) {
        alert("条件に合う行き先がありません。フィルター条件を緩めてください。");
        return;
    }

    isSpinning = true;
    startBtn.disabled = true;
    startBtn.textContent = "ルーレット中...";
    destinationCost.textContent = "";
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
    rouletteDisplay.classList.remove('spinning');

    const finalIndex = Math.floor(Math.random() * candidates.length);
    const selected = candidates[finalIndex];

    destinationName.textContent = `🎊 ${selected.name} 🎊`;
    destinationCost.textContent = `概算費用: 約 ${formatCurrency(selected.cost)}`;
    
    // 観光スポットを表示
    spotsList.innerHTML = '';
    selected.spots.forEach(spot => {
        const li = document.createElement('li');
        li.textContent = spot;
        spotsList.appendChild(li);
    });
    
    // 地図を表示（Google Mapsの埋め込みで、県にピンが刺さるようにする）
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
