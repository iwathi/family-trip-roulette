const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Create a minimal HTML file to test in real browser context
  const html = `
    <html>
      <body>
        <input type="checkbox" id="modeCar" value="car" checked>
        <input type="checkbox" id="modeShinkansen" value="shinkansen" checked>
        <input type="checkbox" id="modeFlight" value="flight">
        <select id="budgetFilter"><option value="unlimited">unlimited</option></select>
        <select id="timeFilter"><option value="unlimited">unlimited</option></select>
        <div id="genreFiltersList"></div>
        <div class="visited-prefectures-container"></div>
        <script>
          ${require('fs').readFileSync('data.js', 'utf8')}
        </script>
        <script>
          const modeCar = document.getElementById('modeCar');
          const modeShinkansen = document.getElementById('modeShinkansen');
          const modeFlight = document.getElementById('modeFlight');
          const budgetFilter = document.getElementById('budgetFilter');
          const timeFilter = document.getElementById('timeFilter');
          
          function getCandidates() {
            const allowedModes = {
                car: modeCar.checked,
                shinkansen: modeShinkansen.checked,
                flight: modeFlight.checked
            };
            const maxTime = Infinity;
            const maxBudget = Infinity;
            
            return prefectureData.filter(pref => {
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
          }
          window.result = getCandidates().length;
        </script>
      </body>
    </html>
  `;
  
  await page.setContent(html);
  const result = await page.evaluate(() => window.result);
  console.log("Browser result:", result);
  await browser.close();
})();
