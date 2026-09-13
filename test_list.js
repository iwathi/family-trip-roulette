const fs = require('fs');
const dataFile = fs.readFileSync('data.js', 'utf-8').replace('const prefectureData = ', '').replace(/;/g, '').trim();
const prefectureData = JSON.parse(dataFile);

const allowedModes = { car: true, shinkansen: true, flight: false };
const maxTime = Infinity;
const maxBudget = Infinity;

const filteredData = prefectureData.filter(pref => {
    let hasValidTransport = false;
    let lowestTotalCost = Infinity;

    for (const mode of ['car', 'shinkansen', 'flight']) {
        if (!allowedModes[mode]) continue;
        const tInfo = pref.transport[mode];
        if (!tInfo) continue;
        
        if (tInfo.time <= maxTime) {
            hasValidTransport = true;
            const totalCost = pref.accommodationCost + tInfo.cost;
            if (totalCost < lowestTotalCost) {
                lowestTotalCost = totalCost;
            }
        }
    }

    if (!hasValidTransport) return false;
    if (lowestTotalCost > maxBudget) return false;
    
    return true;
});
console.log(filteredData.length);
