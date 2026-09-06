const fs = require('fs');
function extract(f) {
    const c = fs.readFileSync(f, 'utf8');
    const m = c.match(/,\s*""\s*,\s*(\{.*?\})\s*\]\s*\);?/s);
    if (m) {
        const sm = JSON.parse(m[1]);
        if (sm.sourcesContent && sm.sourcesContent[0]) {
            fs.writeFileSync(f, sm.sourcesContent[0]);
            console.log('Extracted ' + f);
        }
    }
}
extract('src/index.css');
extract('src/App.css');
