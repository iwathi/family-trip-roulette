const fs = require('fs');

let dataFile = fs.readFileSync('data.js', 'utf-8');
const jsonStr = dataFile.replace('const prefectureData = ', '').replace(/;/g, '').trim();
const data = JSON.parse(jsonStr);

data.forEach(pref => {
    if (typeof pref.genre === 'string') {
        pref.genre = pref.genre.split('・').filter(g => g !== '');
        
        // Let's recombine some base ones that were split unintentionally
        // e.g., "歴史", "文化" -> "歴史・文化"
        const baseGenres = [];
        let str = pref.genre.join('・');
        if (str.includes("大自然・リゾート")) baseGenres.push("大自然・リゾート");
        else if (str.includes("温泉リラックス")) baseGenres.push("温泉リラックス");
        else if (str.includes("テーマパーク・遊び")) baseGenres.push("テーマパーク・遊び");
        else if (str.includes("歴史・文化")) baseGenres.push("歴史・文化");
        else if (str.includes("海・リゾート")) baseGenres.push("海・リゾート");
        else if (str.includes("都市・グルメ")) baseGenres.push("都市・グルメ");
        else if (str.includes("自然")) baseGenres.push("自然");
        
        if (str.includes("絶景")) baseGenres.push("絶景");
        if (str.includes("子連れ・ファミリー")) baseGenres.push("子連れ・ファミリー");
        
        pref.genre = baseGenres;
    }
});

const output = 'const prefectureData = ' + JSON.stringify(data, null, 4) + ';';
fs.writeFileSync('data.js', output);
