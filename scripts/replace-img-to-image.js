#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Функція для заміни img тегів на Image компонент
function replaceImgTags(content, filePath) {
    let updatedContent = content;
    let hasChanges = false;

    // Додаємо імпорт Image якщо його немає
    if (!updatedContent.includes("import Image from 'next/image'") && updatedContent.includes('<img')) {
        // Знайдемо місце для вставки імпорту
        const importMatch = updatedContent.match(/(import.*from ['"][^'"]*['"])/g);
        if (importMatch) {
            const lastImport = importMatch[importMatch.length - 1];
            const importIndex = updatedContent.indexOf(lastImport) + lastImport.length;
            updatedContent = updatedContent.slice(0, importIndex) + "\nimport Image from 'next/image'" + updatedContent.slice(importIndex);
            hasChanges = true;
        }
    }

    // Заміни для різних типів img тегів
    const replacements = [
        // Прості іконки з фіксованими розмірами
        {
            pattern: /<img\s+src="\/img\/icons\/([^"]+)"\s+alt="([^"]+)"\s*\/?>|<img\s+alt="([^"]+)"\s+src="\/img\/icons\/([^"]+)"\s*\/?>/g,
            replacement: (match, src1, alt1, alt2, src2) => {
                const src = src1 || src2;
                const alt = alt1 || alt2;
                return `<Image src="/img/icons/${src}" alt="${alt}" width={16} height={16} />`;
            }
        },
        // Іконки з loading="lazy"
        {
            pattern: /<img\s+loading="lazy"\s+src="\/img\/icons\/([^"]+)"\s+alt="([^"]+)"\s*\/?>|<img\s+alt="([^"]+)"\s+src="\/img\/icons\/([^"]+)"\s+loading="lazy"\s*\/?>/g,
            replacement: (match, src1, alt1, alt2, src2) => {
                const src = src1 || src2;
                const alt = alt1 || alt2;
                return `<Image src="/img/icons/${src}" alt="${alt}" width={16} height={16} />`;
            }
        },
        // Логотипи казино та інші зображення з динамічними src
        {
            pattern: /<img\s+src=\{([^}]+)\}\s+alt="([^"]+)"\s*\/?>|<img\s+alt="([^"]+)"\s+src=\{([^}]+)\}\s*\/?>/g,
            replacement: (match, src1, alt1, alt2, src2) => {
                const src = src1 || src2;
                const alt = alt1 || alt2;
                return `<Image src={${src}} alt="${alt}" width={100} height={60} />`;
            }
        },
        // Прапорці країн з розмірами
        {
            pattern: /<img\s+(?:loading="lazy"\s+)?alt="([^"]+)"\s+src=\{([^}]+)\}\s+width=\{?(\d+)\}?\s+height=\{?(\d+)\}?\s*\/?>|<img\s+src=\{([^}]+)\}\s+(?:loading="lazy"\s+)?width="(\d+)"\s+height="(\d+)"\s+alt="([^"]+)"\s*\/?>/g,
            replacement: (match, alt1, src1, w1, h1, src2, w2, h2, alt2) => {
                const src = src1 || src2;
                const alt = alt1 || alt2;
                const width = w1 || w2;
                const height = h1 || h2;
                return `<Image alt="${alt}" src={${src}} width={${width}} height={${height}} />`;
            }
        }
    ];

    // Застосовуємо заміни
    replacements.forEach(({ pattern, replacement }) => {
        if (pattern.test(updatedContent)) {
            updatedContent = updatedContent.replace(pattern, replacement);
            hasChanges = true;
        }
    });

    return { content: updatedContent, hasChanges };
}

// Основна функція
function main() {
    const srcPattern = 'src/**/*.{tsx,jsx}';
    const files = glob.sync(srcPattern, { 
        ignore: ['**/node_modules/**', '**/.*/**'] 
    });

    console.log(`Знайдено ${files.length} файлів для обробки...`);

    let processedCount = 0;
    let modifiedCount = 0;

    files.forEach(filePath => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Пропускаємо файли без img тегів
            if (!content.includes('<img')) {
                return;
            }

            const { content: newContent, hasChanges } = replaceImgTags(content, filePath);
            
            processedCount++;
            
            if (hasChanges) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                modifiedCount++;
                console.log(`✅ Оновлено: ${filePath}`);
            }
        } catch (error) {
            console.error(`❌ Помилка обробки ${filePath}:`, error.message);
        }
    });

    console.log(`\n📊 Результати:`);
    console.log(`- Оброблено файлів: ${processedCount}`);
    console.log(`- Змінено файлів: ${modifiedCount}`);
    console.log(`\n🎉 Заміна img тегів на Image компонент завершена!`);
}

// Запускаємо якщо файл викликається напряму
if (require.main === module) {
    main();
}

module.exports = { replaceImgTags };
