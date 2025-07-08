#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

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

// Конфігурація замін - стандартні patterns і їх Next.js відповідники
const replacements = [
    // Іконки стандартні
    {
        pattern: /<img\s+src="\/img\/icons\/star\.svg"\s+alt="star"\s*\/?>|<img\s+loading="lazy"\s+src="\/img\/icons\/star\.svg"\s+alt="star"\s*\/?>/g,
        replacement: '<Image src="/img/icons/star.svg" alt="star" width={16} height={16} />'
    },
    {
        pattern: /<img\s+src="\/img\/icons\/like\.svg"\s+alt="like"\s*\/?>|<img\s+loading="lazy"\s+src="\/img\/icons\/like\.svg"\s+alt="like"\s*\/?>/g,
        replacement: '<Image src="/img/icons/like.svg" alt="like" width={16} height={16} />'
    },
    {
        pattern: /<img\s+src="\/img\/icons\/gift\.svg"\s+alt="gift"\s*\/?>|<img\s+loading="lazy"\s+src="\/img\/icons\/gift\.svg"\s+alt="gift"\s*\/?>/g,
        replacement: '<Image src="/img/icons/gift.svg" alt="gift" width={20} height={20} />'
    },
    {
        pattern: /<img\s+src="\/img\/icons\/shield\.svg"\s+alt="shield"\s*\/?>|<img\s+loading="lazy"\s+src="\/img\/icons\/shield\.svg"\s+alt="shield"\s*\/?>/g,
        replacement: '<Image src="/img/icons/shield.svg" alt="shield" width={20} height={20} />'
    },
    {
        pattern: /<img\s+src="\/img\/icons\/deposit-icon\.svg"\s+alt="deposit-icon"\s*\/?>|<img\s+loading="lazy"\s+src="\/img\/icons\/deposit-icon\.svg"\s+alt="deposit-icon"\s*\/?>/g,
        replacement: '<Image src="/img/icons/deposit-icon.svg" alt="deposit-icon" width={24} height={24} />'
    },
    {
        pattern: /<img\s+src="\/img\/icons\/roulette\.svg"\s+alt="roulette"\s*\/?>|<img\s+loading="lazy"\s+src="\/img\/icons\/roulette\.svg"\s+alt="roulette"\s*\/?>/g,
        replacement: '<Image src="/img/icons/roulette.svg" alt="roulette" width={32} height={32} />'
    },
    {
        pattern: /<img\s+src="\/img\/icons\/arrow-yellow\.svg"\s+alt="arrow-yellow"\s*\/?>|<img\s+loading="lazy"\s+src="\/img\/icons\/arrow-yellow\.svg"\s+alt="arrow-yellow"\s*\/?>/g,
        replacement: '<Image src="/img/icons/arrow-yellow.svg" alt="arrow-yellow" width={16} height={16} />'
    },
    {
        pattern: /<img\s+src="\/img\/icons\/close\.svg"\s+alt="close"\s*\/?>|<img\s+loading="lazy"\s+src="\/img\/icons\/close\.svg"\s+alt="close"\s*\/?>/g,
        replacement: '<Image src="/img/icons/close.svg" alt="close" width={16} height={16} />'
    },
    {
        pattern: /<img\s+src="\/img\/icons\/check-icon\.svg"\s+alt="check"\s*\/?>|<img\s+loading="lazy"\s+src="\/img\/icons\/check-icon\.svg"\s+alt="check"\s*\/?>/g,
        replacement: '<Image src="/img/icons/check-icon.svg" alt="check" width={20} height={20} />'
    },
    {
        pattern: /<img\s+src="\/img\/icons\/error-icon\.svg"\s+alt="error"\s*\/?>|<img\s+loading="lazy"\s+src="\/img\/icons\/error-icon\.svg"\s+alt="error"\s*\/?>/g,
        replacement: '<Image src="/img/icons/error-icon.svg" alt="error" width={20} height={20} />'
    },
    
    // Title images для блоків
    {
        pattern: /<img\s+src=\{([^}]+)\.items_block\.title_image\}\s+alt="security"\s*\/?>|<img\s+loading="lazy"\s+src=\{([^}]+)\.items_block\.title_image\}\s+alt="security"\s*\/?>/g,
        replacement: '<Image src={$1.items_block.title_image} alt="security" width={400} height={250} />'
    },
    
    // Прапорці країн
    {
        pattern: /<img\s+loading="lazy"\s+alt=\{([^}]+)\?\.\w+\}\s+src=\{([^}]+)\?\.\w+\s+\|\|\s+([^}]+)\?\.\w+\s+\|\|\s+''\}\s+width=\{20\}\s+height=\{20\}\s*\/?>|<img\s+alt=\{([^}]+)\?\.\w+\}\s+src=\{([^}]+)\?\.\w+\s+\|\|\s+([^}]+)\?\.\w+\s+\|\|\s+''\}\s+width=\{20\}\s+height=\{20\}\s*\/?>/g,
        replacement: '<Image alt={$1?.name} src={$2?.image || $3?.flag_image || ""} width={20} height={20} />'
    },
    
    // Загальні img теги з динамічними src
    {
        pattern: /<img\s+loading="lazy"\s+src=\{([^}]+)\}\s+alt="([^"]+)"\s*\/?>|<img\s+src=\{([^}]+)\}\s+alt="([^"]+)"\s*\/?>/g,
        replacement: (match, src1, alt1, src2, alt2) => {
            const src = src1 || src2;
            const alt = alt1 || alt2;
            // Визначаємо розміри залежно від типу зображення
            if (alt.includes('logo') || alt.includes('casino')) {
                return `<Image src={${src}} alt="${alt}" width={60} height={60} />`;
            } else if (alt.includes('game') || alt.includes('slot')) {
                return `<Image src={${src}} alt="${alt}" width={80} height={80} />`;
            } else {
                return `<Image src={${src}} alt="${alt}" width={100} height={100} />`;
            }
        }
    }
];

// Функція для додавання імпорту Image, якщо його немає
function addImageImport(content) {
    // Перевіряємо чи вже є імпорт Image
    if (content.includes("import Image from 'next/image'")) {
        return content;
    }
    
    // Шукаємо останній імпорт з next
    const nextImportMatch = content.match(/import\s+.*from\s+['"]next\/[^'"]+['"]/g);
    if (nextImportMatch) {
        const lastNextImport = nextImportMatch[nextImportMatch.length - 1];
        const importIndex = content.lastIndexOf(lastNextImport);
        const endOfImport = content.indexOf('\n', importIndex);
        return content.slice(0, endOfImport + 1) + "import Image from 'next/image'\n" + content.slice(endOfImport + 1);
    }
    
    // Якщо немає імпортів з next, шукаємо будь-які React імпорти
    const reactImportMatch = content.match(/import\s+.*from\s+['"]react['"]/);
    if (reactImportMatch) {
        const importIndex = content.indexOf(reactImportMatch[0]);
        const endOfImport = content.indexOf('\n', importIndex);
        return content.slice(0, endOfImport + 1) + "import Image from 'next/image'\n" + content.slice(endOfImport + 1);
    }
    
    // Якщо нічого не знайдено, додаємо на початок
    return "import Image from 'next/image'\n" + content;
}

// Функція для обробки файлу
function processFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let hasChanges = false;
        
        // Перевіряємо чи є img теги в файлі
        if (!content.includes('<img')) {
            return { processed: false, changes: 0 };
        }
        
        let changeCount = 0;
        
        // Застосовуємо всі заміни
        replacements.forEach(({ pattern, replacement }) => {
            const beforeReplace = content;
            if (typeof replacement === 'function') {
                content = content.replace(pattern, replacement);
            } else {
                content = content.replace(pattern, replacement);
            }
            
            if (beforeReplace !== content) {
                hasChanges = true;
                // Підраховуємо кількість замін для цього pattern
                const matches = beforeReplace.match(pattern);
                if (matches) {
                    changeCount += matches.length;
                }
            }
        });
        
        // Якщо були зміни, додаємо імпорт Image та зберігаємо файл
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
    console.log('🚀 Починаю заміну <img> тегів на Next.js <Image> компоненти...\n');
    
    // Знаходимо всі .tsx та .jsx файли
    const files = findFiles('./src', ['.tsx', '.jsx']);
    
    console.log(`📁 Знайдено ${files.length} файлів для обробки\n`);
    
    let totalProcessed = 0;
    let totalChanges = 0;
    const processedFiles = [];
    const errorFiles = [];
    
    files.forEach(file => {
        const result = processFile(file);
        
        if (result.error) {
            errorFiles.push({ file, error: result.error });
        } else if (result.processed) {
            totalProcessed++;
            totalChanges += result.changes;
            processedFiles.push({ file, changes: result.changes });
            console.log(`✅ ${file} - ${result.changes} замін`);
        }
    });
    
    console.log('\n📊 Результати:');
    console.log(`✅ Оброблено файлів: ${totalProcessed}`);
    console.log(`🔄 Загальна кількість замін: ${totalChanges}`);
    
    if (errorFiles.length > 0) {
        console.log(`\n❌ Помилки при обробці ${errorFiles.length} файлів:`);
        errorFiles.forEach(({ file, error }) => {
            console.log(`  - ${file}: ${error}`);
        });
    }
    
    if (processedFiles.length > 0) {
        console.log('\n📝 Детальний звіт:');
        processedFiles.forEach(({ file, changes }) => {
            console.log(`  ${file} - ${changes} замін`);
        });
    }
    
    console.log('\n✨ Готово! Всі <img> теги замінено на Next.js <Image> компоненти.');
}

// Запускаємо скрипт
if (require.main === module) {
    main();
}

module.exports = { processFile, addImageImport };
