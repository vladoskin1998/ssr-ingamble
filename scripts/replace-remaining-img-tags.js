#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Розширений список замін для решти файлів
const additionalReplacements = [
    // Залишкові іконки з loading="lazy"
    {
        pattern: /<img\s+src="\/img\/icons\/deposit-icon\.svg"\s+alt="deposit-icon"\s+loading="lazy"\s*\/?>|<img\s+loading="lazy"\s+src="\/img\/icons\/deposit-icon\.svg"\s+alt="deposit-icon"\s*\/?>/g,
        replacement: '<Image src="/img/icons/deposit-icon.svg" alt="deposit-icon" width={24} height={24} />'
    },
    {
        pattern: /<img\s+src="\/img\/icons\/roulette\.svg"\s+alt="roulette"\s+loading="lazy"\s*\/?>|<img\s+loading="lazy"\s+src="\/img\/icons\/roulette\.svg"\s+alt="roulette"\s*\/?>/g,
        replacement: '<Image src="/img/icons/roulette.svg" alt="roulette" width={32} height={32} />'
    },
    {
        pattern: /<img\s+src="\/img\/icons\/gift\.svg"\s+alt="gift"\s+loading="lazy"\s*\/?>|<img\s+loading="lazy"\s+src="\/img\/icons\/gift\.svg"\s+alt="gift"\s*\/?>/g,
        replacement: '<Image src="/img/icons/gift.svg" alt="gift" width={20} height={20} />'
    },
    
    // Title images з loading="lazy"
    {
        pattern: /<img\s+src=\{([^}]+)\.items_block\.title_image\}\s+alt="security"\s+loading="lazy"\s*\/?>|<img\s+loading="lazy"\s+src=\{([^}]+)\.items_block\.title_image\}\s+alt="security"\s*\/?>/g,
        replacement: '<Image src={$1.items_block.title_image} alt="security" width={400} height={250} />'
    },
    
    // Background images
    {
        pattern: /<img\s+src="\/img\/bg\/08\.webp"\s+alt="bg"\s+loading="lazy"\s*\/?>|<img\s+loading="lazy"\s+src="\/img\/bg\/08\.webp"\s+alt="bg"\s*\/?>/g,
        replacement: '<Image src="/img/bg/08.webp" alt="bg" width={600} height={400} />'
    },
    
    // Multi-line img tags
    {
        pattern: /<img\s*\n?\s*src=\{([^}]+)\}\s*\n?\s*alt="([^"]+)"\s*\n?\s*style=\{[^}]+\}\s*\n?\s*\/?>|<img\s*\n?\s*src=\{([^}]+)\}\s*\n?\s*alt="([^"]+)"\s*\n?\s*\/?>|<img\s*\n?\s*loading="lazy"\s*\n?\s*src=\{([^}]+)\}\s*\n?\s*alt="([^"]+)"\s*\n?\s*\/?>|<img\s*\n?\s*loading="lazy"\s*\n?\s*alt=\{([^}]+)\}\s*\n?\s*src=\{([^}]+)\}\s*\n?\s*width=\{[^}]+\}\s*\n?\s*height=\{[^}]+\}\s*\n?\s*\/?>/gs,
        replacement: (match, src1, alt1, src2, alt2, src3, alt3, altVar, srcVar) => {
            const src = src1 || src2 || src3 || srcVar;
            const alt = alt1 || alt2 || alt3 || altVar;
            
            if (alt && alt.includes('logo')) {
                return `<Image src={${src}} alt="${alt}" width={60} height={60} />`;
            } else if (alt && alt.includes('game')) {
                return `<Image src={${src}} alt="${alt}" width={80} height={80} />`;
            } else if (altVar) {
                return `<Image alt={${altVar}} src={${src}} width={60} height={60} />`;
            } else {
                return `<Image src={${src}} alt="${alt}" width={100} height={100} />`;
            }
        }
    }
];

// Функція для додавання імпорту Image
function addImageImport(content) {
    if (content.includes("import Image from 'next/image'")) {
        return content;
    }
    
    const nextImportMatch = content.match(/import\s+.*from\s+['"]next\/[^'"]+['"]/g);
    if (nextImportMatch) {
        const lastNextImport = nextImportMatch[nextImportMatch.length - 1];
        const importIndex = content.lastIndexOf(lastNextImport);
        const endOfImport = content.indexOf('\n', importIndex);
        return content.slice(0, endOfImport + 1) + "import Image from 'next/image'\n" + content.slice(endOfImport + 1);
    }
    
    const reactImportMatch = content.match(/import\s+.*from\s+['"]react['"]/);
    if (reactImportMatch) {
        const importIndex = content.indexOf(reactImportMatch[0]);
        const endOfImport = content.indexOf('\n', importIndex);
        return content.slice(0, endOfImport + 1) + "import Image from 'next/image'\n" + content.slice(endOfImport + 1);
    }
    
    return "import Image from 'next/image'\n" + content;
}

// Функція для рекурсивного пошуку файлів
function findFiles(dir, extensions, result = []) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
            findFiles(filePath, extensions, result);
        } else if (stat.isFile() && extensions.some(ext => file.endsWith(ext))) {
            result.push(filePath);
        }
    }
    
    return result;
}

// Функція для обробки файлу
function processFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        if (!content.includes('<img')) {
            return { processed: false, changes: 0 };
        }
        
        let hasChanges = false;
        let changeCount = 0;
        
        additionalReplacements.forEach(({ pattern, replacement }) => {
            const beforeReplace = content;
            if (typeof replacement === 'function') {
                content = content.replace(pattern, replacement);
            } else {
                content = content.replace(pattern, replacement);
            }
            
            if (beforeReplace !== content) {
                hasChanges = true;
                const beforeMatches = (beforeReplace.match(/<img/g) || []).length;
                const afterMatches = (content.match(/<img/g) || []).length;
                changeCount += beforeMatches - afterMatches;
            }
        });
        
        if (hasChanges) {
            content = addImageImport(content);
            fs.writeFileSync(filePath, content, 'utf8');
            return { processed: true, changes: changeCount };
        }
        
        return { processed: false, changes: 0 };
    } catch (error) {
        console.error(`Помилка при обробці файлу ${filePath}:`, error.message);
        return { processed: false, changes: 0, error: error.message };
    }
}

// Основна функція
function main() {
    console.log('🔄 Обробляю залишкові <img> теги...\n');
    
    const files = findFiles('./src', ['.tsx', '.jsx']);
    
    let totalProcessed = 0;
    let totalChanges = 0;
    const processedFiles = [];
    
    files.forEach(file => {
        const result = processFile(file);
        
        if (result.processed) {
            totalProcessed++;
            totalChanges += result.changes;
            processedFiles.push({ file, changes: result.changes });
            console.log(`✅ ${file} - ${result.changes} замін`);
        }
    });
    
    console.log('\n📊 Результати:');
    console.log(`✅ Додатково оброблено файлів: ${totalProcessed}`);
    console.log(`🔄 Додаткова кількість замін: ${totalChanges}`);
    
    console.log('\n✨ Додаткова обробка завершена!');
}

if (require.main === module) {
    main();
}

module.exports = { processFile, addImageImport };
