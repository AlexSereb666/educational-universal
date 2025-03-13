const fs = require('fs');
const path = require('path');

const ruLocalePath = path.join(__dirname, '../public/locales/ru');

fs.readdirSync(ruLocalePath).forEach((file) => {
    if (file.endsWith('.json')) {
        const filePath = path.join(ruLocalePath, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        Object.keys(content).forEach((key) => {
            if (content[key] === '') {
                content[key] = key;
            }
        });

        fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
        console.log(`✅ Исправлен перевод: ${file}`);
    }
});

console.log('🎉 Русские переводы обновлены!');
