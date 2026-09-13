        document.addEventListener('DOMContentLoaded', () => {
            const dataGrid = document.getElementById('dataGrid');
            const listBudgetFilter = document.getElementById('listBudgetFilter');
            const listTimeFilter = document.getElementById('listTimeFilter');
            const listModeCar = document.getElementById('listModeCar');
            const listModeShinkansen = document.getElementById('listModeShinkansen');
            const listModeFlight = document.getElementById('listModeFlight');
            const genreFiltersContainer = document.getElementById('genreFilters');
            
            // Extract unique genres
            const genres = [...new Set(prefectureData.flatMap(p => p.genre))];
            
            // Render genre checkboxes
            genres.forEach(genre => {
                const wrapper = document.createElement('div');
                wrapper.className = 'pref-checkbox-wrapper';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `genre-${genre}`;
                checkbox.value = genre;
                checkbox.checked = false; 
                
                const label = document.createElement('label');
                label.htmlFor = `genre-${genre}`;
                label.textContent = genre;
                
                wrapper.appendChild(checkbox);
                wrapper.appendChild(label);
                genreFiltersContainer.appendChild(wrapper);
                
                checkbox.addEventListener('change', renderCards);
            });
            
            listBudgetFilter.addEventListener('change', renderCards);
            listTimeFilter.addEventListener('change', renderCards);
            listModeCar.addEventListener('change', renderCards);
            listModeShinkansen.addEventListener('change', renderCards);
            listModeFlight.addEventListener('change', renderCards);

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
            
            function renderCards() {
                dataGrid.innerHTML = '';
                
                const maxBudgetStr = listBudgetFilter.value;
                const maxBudget = maxBudgetStr === 'unlimited' ? Infinity : parseInt(maxBudgetStr);
                
                const maxTimeStr = listTimeFilter.value;
                const maxTime = maxTimeStr === 'unlimited' ? Infinity : parseInt(maxTimeStr);
                
                const checkedGenres = Array.from(genreFiltersContainer.querySelectorAll('input:checked')).map(cb => cb.value);
                
                const allowedModes = {
                    car: listModeCar.checked,
                    shinkansen: listModeShinkansen.checked,
                    flight: listModeFlight.checked
                };
                
                const filteredData = prefectureData.filter(pref => {
                    const matchesGenre = checkedGenres.length === 0 || checkedGenres.some(g => pref.genre.includes(g));
                    if (!matchesGenre) return false;
                    
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
                
                if (filteredData.length === 0) {
                    dataGrid.innerHTML = '<p>条件に一致する都道府県がありません。</p>';
                    return;
                }

                filteredData.forEach(pref => {
                    const card = document.createElement('div');
                    card.className = 'data-card';
                    
                    const spotsHtml = pref.spots.map(spot => `<li>${spot}</li>`).join('');
                    
                    let tHtml = `<div style="font-size:0.9rem; background:#fff; padding:10px; border-radius:8px; border:1px solid #ccc; margin-bottom:10px;">`;
                    tHtml += `<div style="color:var(--primary-color); font-weight:bold;">🏨 宿泊費(2泊): 約${formatCurrency(pref.accommodationCost)}</div>`;
                    tHtml += `<div style="font-weight:bold; margin-top:5px; font-size:0.8rem;">往復交通費/片道時間:</div>`;
                    if (pref.transport.car) tHtml += `<div>🚗 車: 約${formatCurrency(pref.transport.car.cost)} / ${formatTime(pref.transport.car.time)}</div>`;
                    if (pref.transport.shinkansen) tHtml += `<div>🚄 新: 約${formatCurrency(pref.transport.shinkansen.cost)} / ${formatTime(pref.transport.shinkansen.time)}</div>`;
                    if (pref.transport.flight) tHtml += `<div>✈️ 空: 約${formatCurrency(pref.transport.flight.cost)} / ${formatTime(pref.transport.flight.time)}</div>`;
                    tHtml += `</div>`;
                    
                    card.innerHTML = `
                        <h3>${pref.name}</h3>
                        <div class="region-badge">${pref.region}</div>
                        <div class="region-badge" style="background: var(--secondary-color); color: white;">${pref.genre.join(" / ")}</div>
                        ${tHtml}
                        <div><strong>おすすめスポット:</strong></div>
                        <ul>${spotsHtml}</ul>
                    `;
                    
                    dataGrid.appendChild(card);
                });
            }
            
            // Initial render
            renderCards();
        });
