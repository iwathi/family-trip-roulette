const fs = require('fs');

function updateHeader(filename, activePage) {
    let html = fs.readFileSync(filename, 'utf8');
    
    // Replace everything between <header> and </header>
    const headerRegex = /<header>[\s\S]*?<\/header>/;
    const newHeader = `<header>
            <h1>${activePage === 'index' ? '🎯 家族旅行 行き先ルーレット' : '📋 全都道府県データ一覧'}</h1>
            <nav class="global-nav">
                <a href="index.html" class="nav-item ${activePage === 'index' ? 'active' : ''}">🎰 ルーレット</a>
                <a href="list.html" class="nav-item ${activePage === 'list' ? 'active' : ''}">📋 データ一覧</a>
                <a href="guide.html" class="nav-item">📖 費用ガイド</a>
            </nav>
        </header>`;
        
    html = html.replace(headerRegex, newHeader);
    
    // Update versions
    html = html.replace(/v=[0-9]+/g, 'v=14');
    
    fs.writeFileSync(filename, html);
}

updateHeader('index.html', 'index');
updateHeader('list.html', 'list');
