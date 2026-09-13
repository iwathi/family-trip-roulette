// 47都道府県データ（仙台発・家族5人旅行の概算費用）
const prefectureData = [
    {
        "id": 1,
        "name": "北海道",
        "region": "北海道",
        "cost": 250000,
        "spots": [
            "札幌・小樽（時計台、運河）",
            "函館（夜景、五稜郭）",
            "富良野・美瑛（ラベンダー、青い池）"
        ]
    },
    {
        "id": 2,
        "name": "青森県",
        "region": "東北",
        "cost": 80000,
        "spots": [
            "青森市周辺（ねぶた、三内丸山遺跡）",
            "弘前・白神山地（弘前城）",
            "奥入瀬・十和田湖"
        ]
    },
    {
        "id": 3,
        "name": "岩手県",
        "region": "東北",
        "cost": 60000,
        "spots": [
            "平泉（中尊寺金色堂）",
            "盛岡（わんこそば、冷麺）",
            "三陸海岸（浄土ヶ浜）"
        ]
    },
    {
        "id": 4,
        "name": "宮城県",
        "region": "東北",
        "cost": 40000,
        "spots": [
            "仙台（牛タン、瑞鳳殿）",
            "松島（日本三景）",
            "秋保・作並温泉"
        ]
    },
    {
        "id": 5,
        "name": "秋田県",
        "region": "東北",
        "cost": 80000,
        "spots": [
            "角館（武家屋敷）",
            "田沢湖・乳頭温泉",
            "男鹿半島（なまはげ）"
        ]
    },
    {
        "id": 6,
        "name": "山形県",
        "region": "東北",
        "cost": 50000,
        "spots": [
            "山形・蔵王（樹氷、お釜）",
            "銀山温泉（大正ロマン）",
            "米沢（米沢牛、上杉神社）"
        ]
    },
    {
        "id": 7,
        "name": "福島県",
        "region": "東北",
        "cost": 50000,
        "spots": [
            "会津若松（鶴ヶ城、白虎隊）",
            "磐梯高原・猪苗代湖",
            "スパリゾートハワイアンズ"
        ]
    },
    {
        "id": 8,
        "name": "茨城県",
        "region": "関東",
        "cost": 100000,
        "spots": [
            "水戸・ひたちなか（偕楽園、ひたち海浜公園）",
            "つくば・霞ヶ浦",
            "大洗（アクアワールド）"
        ]
    },
    {
        "id": 9,
        "name": "栃木県",
        "region": "関東",
        "cost": 90000,
        "spots": [
            "日光（東照宮、華厳の滝）",
            "那須高原（どうぶつ王国）",
            "鬼怒川温泉"
        ]
    },
    {
        "id": 10,
        "name": "群馬県",
        "region": "関東",
        "cost": 90000,
        "spots": [
            "草津温泉（湯畑）",
            "伊香保温泉（石段街）",
            "富岡製糸場"
        ]
    },
    {
        "id": 11,
        "name": "埼玉県",
        "region": "関東",
        "cost": 120000,
        "spots": [
            "川越（蔵造りの町並み）",
            "秩父・長瀞（ライン下り）",
            "さいたま・鉄道博物館"
        ]
    },
    {
        "id": 12,
        "name": "千葉県",
        "region": "関東",
        "cost": 150000,
        "spots": [
            "舞浜（東京ディズニーリゾート）",
            "鴨川・館山（鴨川シーワールド）",
            "成田（成田山新勝寺）"
        ]
    },
    {
        "id": 13,
        "name": "東京都",
        "region": "関東",
        "cost": 180000,
        "spots": [
            "浅草・スカイツリー",
            "渋谷・原宿・表参道",
            "お台場"
        ]
    },
    {
        "id": 14,
        "name": "神奈川県",
        "region": "関東",
        "cost": 160000,
        "spots": [
            "横浜（中華街、みなとみらい）",
            "鎌倉・江ノ島（大仏）",
            "箱根（温泉、芦ノ湖）"
        ]
    },
    {
        "id": 15,
        "name": "新潟県",
        "region": "中部",
        "cost": 90000,
        "spots": [
            "越後湯沢・十日町（スキー、棚田）",
            "新潟・月岡温泉",
            "佐渡島（金山）"
        ]
    },
    {
        "id": 16,
        "name": "富山県",
        "region": "中部",
        "cost": 140000,
        "spots": [
            "黒部峡谷・トロッコ",
            "立山黒部アルペンルート",
            "五箇山（合掌造り）"
        ]
    },
    {
        "id": 17,
        "name": "石川県",
        "region": "中部",
        "cost": 150000,
        "spots": [
            "金沢（兼六園、21世紀美術館）",
            "能登半島（輪島朝市）",
            "加賀温泉郷"
        ]
    },
    {
        "id": 18,
        "name": "福井県",
        "region": "中部",
        "cost": 160000,
        "spots": [
            "勝山（恐竜博物館）",
            "東尋坊",
            "あわら温泉"
        ]
    },
    {
        "id": 19,
        "name": "山梨県",
        "region": "中部",
        "cost": 120000,
        "spots": [
            "富士五湖・富士急ハイランド",
            "勝沼（ワイナリー）",
            "甲府・昇仙峡"
        ]
    },
    {
        "id": 20,
        "name": "長野県",
        "region": "中部",
        "cost": 110000,
        "spots": [
            "軽井沢（アウトレット）",
            "松本・上高地（松本城）",
            "白馬・志賀高原"
        ]
    },
    {
        "id": 21,
        "name": "岐阜県",
        "region": "中部",
        "cost": 150000,
        "spots": [
            "白川郷・高山（古い町並み）",
            "下呂温泉",
            "岐阜・関ヶ原"
        ]
    },
    {
        "id": 22,
        "name": "静岡県",
        "region": "中部",
        "cost": 140000,
        "spots": [
            "伊豆半島（温泉、海）",
            "熱海",
            "富士宮・御殿場"
        ]
    },
    {
        "id": 23,
        "name": "愛知県",
        "region": "中部",
        "cost": 170000,
        "spots": [
            "名古屋（名古屋城、レゴランド）",
            "犬山（犬山城、明治村）",
            "知多・常滑"
        ]
    },
    {
        "id": 24,
        "name": "三重県",
        "region": "近畿",
        "cost": 180000,
        "spots": [
            "伊勢・鳥羽（伊勢神宮、鳥羽水族館）",
            "志摩（パルケエスパーニャ）",
            "桑名（ナガシマスパーランド）"
        ]
    },
    {
        "id": 25,
        "name": "滋賀県",
        "region": "近畿",
        "cost": 180000,
        "spots": [
            "琵琶湖周辺",
            "彦根（彦根城）",
            "比叡山延暦寺"
        ]
    },
    {
        "id": 26,
        "name": "京都府",
        "region": "近畿",
        "cost": 220000,
        "spots": [
            "京都市内（清水寺、金閣寺）",
            "嵐山（竹林）",
            "宇治（平等院）"
        ]
    },
    {
        "id": 27,
        "name": "大阪府",
        "region": "近畿",
        "cost": 240000,
        "spots": [
            "USJ（ユニバーサル・スタジオ）",
            "道頓堀・難波",
            "大阪城・梅田"
        ]
    },
    {
        "id": 28,
        "name": "兵庫県",
        "region": "近畿",
        "cost": 210000,
        "spots": [
            "神戸（異人館、南京町）",
            "姫路（姫路城）",
            "城崎温泉"
        ]
    },
    {
        "id": 29,
        "name": "奈良県",
        "region": "近畿",
        "cost": 20000,
        "spots": [
            "奈良公園（東大寺、鹿）",
            "飛鳥・橿原",
            "吉野"
        ]
    },
    {
        "id": 30,
        "name": "和歌山県",
        "region": "近畿",
        "cost": 220000,
        "spots": [
            "白浜（アドベンチャーワールド）",
            "高野山",
            "熊野古道・那智の滝"
        ]
    },
    {
        "id": 31,
        "name": "鳥取県",
        "region": "中国",
        "cost": 230000,
        "spots": [
            "鳥取砂丘",
            "境港（水木しげるロード）",
            "大山"
        ]
    },
    {
        "id": 32,
        "name": "島根県",
        "region": "中国",
        "cost": 240000,
        "spots": [
            "出雲（出雲大社）",
            "松江（松江城、宍道湖）",
            "石見銀山"
        ]
    },
    {
        "id": 33,
        "name": "岡山県",
        "region": "中国",
        "cost": 220000,
        "spots": [
            "倉敷（美観地区）",
            "岡山・後楽園",
            "蒜山高原"
        ]
    },
    {
        "id": 34,
        "name": "広島県",
        "region": "中国",
        "cost": 240000,
        "spots": [
            "宮島（厳島神社）",
            "広島市内（平和記念公園）",
            "尾道"
        ]
    },
    {
        "id": 35,
        "name": "山口県",
        "region": "中国",
        "cost": 250000,
        "spots": [
            "下関（唐戸市場、角島大橋）",
            "萩（城下町）",
            "秋吉台・秋芳洞"
        ]
    },
    {
        "id": 36,
        "name": "徳島県",
        "region": "四国",
        "cost": 240000,
        "spots": [
            "鳴門（渦潮、大塚国際美術館）",
            "祖谷（かずら橋）",
            "徳島市（阿波おどり）"
        ]
    },
    {
        "id": 37,
        "name": "香川県",
        "region": "四国",
        "cost": 230000,
        "spots": [
            "琴平（金刀比羅宮）",
            "高松（栗林公園）",
            "小豆島"
        ]
    },
    {
        "id": 38,
        "name": "愛媛県",
        "region": "四国",
        "cost": 250000,
        "spots": [
            "松山（道後温泉、松山城）",
            "今治（しまなみ海道）",
            "宇和島"
        ]
    },
    {
        "id": 39,
        "name": "高知県",
        "region": "四国",
        "cost": 260000,
        "spots": [
            "高知市（桂浜、ひろめ市場）",
            "四万十川",
            "足摺岬"
        ]
    },
    {
        "id": 40,
        "name": "福岡県",
        "region": "九州",
        "cost": 280000,
        "spots": [
            "福岡・博多（屋台、太宰府天満宮）",
            "北九州（門司港）",
            "糸島"
        ]
    },
    {
        "id": 41,
        "name": "佐賀県",
        "region": "九州",
        "cost": 270000,
        "spots": [
            "嬉野・武雄温泉",
            "唐津・呼子（イカ）",
            "吉野ヶ里遺跡"
        ]
    },
    {
        "id": 42,
        "name": "長崎県",
        "region": "九州",
        "cost": 290000,
        "spots": [
            "長崎市内（グラバー園、夜景）",
            "佐世保（ハウステンボス）",
            "五島列島"
        ]
    },
    {
        "id": 43,
        "name": "熊本県",
        "region": "九州",
        "cost": 280000,
        "spots": [
            "熊本城",
            "阿蘇（草千里）",
            "黒川温泉"
        ]
    },
    {
        "id": 44,
        "name": "大分県",
        "region": "九州",
        "cost": 270000,
        "spots": [
            "別府（地獄めぐり）",
            "湯布院",
            "九重（夢大吊橋）"
        ]
    },
    {
        "id": 45,
        "name": "宮崎県",
        "region": "九州",
        "cost": 290000,
        "spots": [
            "高千穂（高千穂峡）",
            "日南海岸（青島）",
            "シーガイア"
        ]
    },
    {
        "id": 46,
        "name": "鹿児島県",
        "region": "九州",
        "cost": 300000,
        "spots": [
            "鹿児島市（桜島）",
            "指宿（砂むし温泉）",
            "屋久島・奄美"
        ]
    },
    {
        "id": 47,
        "name": "沖縄県",
        "region": "沖縄",
        "cost": 380000,
        "spots": [
            "那覇（国際通り、首里城）",
            "恩納村・美ら海水族館",
            "石垣島・宮古島"
        ]
    }
];

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
    
    // 楽天トラベルのリンクを設定（直接リンクだとエラーになるためGoogle検索経由）
    const rakutenUrl = `https://www.google.com/search?q=${encodeURIComponent('楽天トラベル ' + selected.name + ' 宿')}`;
    rakutenLink.href = rakutenUrl;
    
    // 追加情報を表示
    resultDetails.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', init);
