const fs = require('fs');

let dataFile = fs.readFileSync('data.js', 'utf-8');
dataFile = dataFile.replace('// 47都道府県データ（仙台発・家族5人旅行の概算費用）', '');
const jsonStr = dataFile.replace('const prefectureData = ', '').replace(/;/g, '').trim();
const data = JSON.parse(jsonStr);

const genres = new Set();
data.forEach(pref => {
    let genre = "自然・絶景"; // default
    const spots = pref.spots.join("");
    if (spots.includes("温泉") || spots.includes("湯畑")) {
        genre = "温泉リラックス";
    } else if (spots.includes("テーマパーク") || spots.includes("ディズニー") || spots.includes("USJ") || spots.includes("水族館") || spots.includes("動物園") || spots.includes("ハイランド") || spots.includes("シーワールド") || spots.includes("王国") || spots.includes("スパーランド") || spots.includes("パルケ") || spots.includes("レゴ")) {
        genre = "テーマパーク・遊び";
    } else if (spots.includes("城") || spots.includes("寺") || spots.includes("神") || spots.includes("遺跡") || spots.includes("歴史") || spots.includes("武家") || spots.includes("町並み")) {
        genre = "歴史・文化";
    } else if (spots.includes("海") || spots.includes("島") || spots.includes("砂丘") || spots.includes("湖")) {
        genre = "海・リゾート";
    }
    
    // Some manual overrides
    if (pref.name === "北海道" || pref.name === "沖縄県") genre = "大自然・リゾート";
    if (pref.name === "東京都" || pref.name === "大阪府" || pref.name === "福岡県" || pref.name === "愛知県") genre = "都市・グルメ";
    
    pref.genre = genre;
    genres.add(genre);
});

const output = 'const prefectureData = ' + JSON.stringify(data, null, 4) + ';';
fs.writeFileSync('data.js', output);
console.log(Array.from(genres));
