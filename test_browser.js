const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('list.html', 'utf-8');
const dataFile = fs.readFileSync('data.js', 'utf-8').replace('const prefectureData = ', '').replace(/;/g, '').trim();

const dom = new JSDOM(html, { runScripts: "outside-only" });
dom.window.eval('const prefectureData = ' + dataFile + ';');

// Now run the script part
const scriptContent = html.match(/<script>([\s\S]*?)<\/script>/)[1];

dom.window.eval(scriptContent);

setTimeout(() => {
    // Check initial render
    const cards = dom.window.document.querySelectorAll('.data-card');
    console.log("Initial cards:", cards.length);
    
    // Uncheck flight
    dom.window.document.getElementById('listModeFlight').checked = false;
    
    // Trigger change event
    const event = new dom.window.Event('change');
    dom.window.document.getElementById('listModeFlight').dispatchEvent(event);
    
    const cardsAfter = dom.window.document.querySelectorAll('.data-card');
    console.log("Cards after unchecking flight:", cardsAfter.length);
}, 500);
