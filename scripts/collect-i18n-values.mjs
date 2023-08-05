import fs from 'fs/promises';
import path from 'path';

async function findFiles(dirPath) {
  let fileList = [];
  const files = await fs.readdir(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      fileList = fileList.concat(await findFiles(filePath));
    } else if (stats.isFile()) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function extractTranslations(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  const lines = content.split('\n');
  const matches = [];

  lines.forEach((line, lineNumber) => {
    const lineMatches = line.match(/t\('(.+?)'\)/g) || [];
    lineMatches.forEach(match => {
      const translationMatch = match.match(/t\('(.+?)'\)/);
      if (translationMatch && translationMatch[1]) {
        matches.push({
          path: `${filePath}:${lineNumber + 1}`,
          text: match
        });
      }
    });
  });

  return matches;
}

// 主函数
async function main() {
  const translations = [];

  const files = await findFiles('./src');
  for (const filePath of files) {
    const extracted = await extractTranslations(filePath);
    translations.push(...extracted);
  }

  console.table(translations);
  await fs.writeFile('.translate_file.json', JSON.stringify(translations, null, 2), 'utf8');
  console.log('.translate_file.json has been saved with translations.');
}

main().catch(err => console.error(err));
