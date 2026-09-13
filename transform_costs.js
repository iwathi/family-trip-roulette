const fs = require('fs');

let dataFile = fs.readFileSync('data.js', 'utf-8');
const jsonStr = dataFile.replace('const prefectureData = ', '').replace(/;/g, '').trim();
const data = JSON.parse(jsonStr);

function getTier(prefName, region) {
    if (prefName === "宮城県") return 0;
    if (["山形県", "福島県", "岩手県"].includes(prefName)) return 1;
    if (["秋田県", "青森県", "新潟県", "栃木県", "茨城県", "群馬県"].includes(prefName)) return 2;
    if (["埼玉県", "千葉県", "東京都", "神奈川県", "山梨県", "長野県", "富山県"].includes(prefName)) return 3;
    if (["石川県", "福井県", "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県"].includes(prefName)) return 4;
    if (["京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"].includes(prefName)) return 5;
    if (region === "中国" || region === "四国") return 6;
    if (region === "九州") return 7;
    if (region === "北海道") return 8;
    if (region === "沖縄") return 9;
    return 3;
}

data.forEach(pref => {
    const tier = getTier(pref.name, pref.region);
    
    // Base accommodation for 5 people (2 nights)
    pref.accommodationCost = 100000 + ((pref.id % 5) * 5000);
    
    pref.transport = {
        car: null,
        shinkansen: null,
        flight: null
    };

    // Calculate Car (Round trip gas + tolls for 1 vehicle)
    if (tier < 9) {
        let hours = tier === 0 ? 1 : tier * 2;
        if (tier === 8) hours = 15; // Hokkaido ferry
        let cost = tier === 0 ? 5000 : tier * 15000;
        if (tier === 8) cost = 80000;
        pref.transport.car = { time: hours * 60, cost: cost };
    }

    // Calculate Shinkansen (Round trip for 5: 2 adults, 3 kids)
    if (tier > 0 && tier < 8) {
        let hours = tier * 1.2;
        let cost = tier * 40000;
        pref.transport.shinkansen = { time: Math.round(hours * 60), cost: cost };
    }
    if (tier === 8) { // Hokkaido Shinkansen
        pref.transport.shinkansen = { time: 4 * 60, cost: 120000 };
    }

    // Calculate Flight (Round trip for 5)
    if (tier >= 4) {
        let hours = 1.5 + (tier - 4) * 0.2;
        if (tier === 8) hours = 1.2;
        if (tier === 9) hours = 3;
        let cost = 120000 + (tier - 4) * 20000;
        if (tier === 8) cost = 100000;
        if (tier === 9) cost = 250000;
        pref.transport.flight = { time: Math.round(hours * 60), cost: cost };
    }
});

const output = 'const prefectureData = ' + JSON.stringify(data, null, 4) + ';';
fs.writeFileSync('data.js', output);
console.log("Costs separated and transport modes added!");
