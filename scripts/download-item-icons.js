/**
 * Albion Online Item Icon Downloader
 * 
 * Fetches item icons from the official Albion Online Render API:
 * https://render.albiononline.com/v1/item/{identifier}.png
 * and stores them in public/images/items/
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const TARGET_DIR = path.resolve(__dirname, '../public/images/items');
const GLOBAL_ITEMS_PATH = path.resolve(__dirname, '../data/global-items.ts');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

function extractIconKeys() {
  const content = fs.readFileSync(GLOBAL_ITEMS_PATH, 'utf8');
  const iconKeys = new Set();

  // Pattern 1: aoRender("ID", enchant)
  const aoRenderRegex = /aoRender\s*\(\s*["']([^"']+)["']\s*(?:,\s*(\d+))?\s*\)/g;
  let match;
  while ((match = aoRenderRegex.exec(content)) !== null) {
    const id = match[1];
    const enchant = match[2] ? parseInt(match[2], 10) : 0;
    const key = enchant > 0 ? `${id}@${enchant}` : id;
    iconKeys.add(key);
  }

  // Pattern 2: identifier: "ID" with enchantment: X
  const itemBlockRegex = /identifier\s*:\s*["']([^"']+)["'][\s\S]*?enchantment\s*:\s*(\d+)/g;
  while ((match = itemBlockRegex.exec(content)) !== null) {
    const id = match[1];
    const enchant = parseInt(match[2], 10);
    const key = enchant > 0 ? `${id}@${enchant}` : id;
    iconKeys.add(key);
  }

  // Pattern 3: any identifier in ingredients
  const ingRegex = /identifier\s*:\s*["']([^"']+)["']/g;
  while ((match = ingRegex.exec(content)) !== null) {
    iconKeys.add(match[1]);
  }

  return Array.from(iconKeys).sort();
}

function downloadImage(key) {
  return new Promise((resolve) => {
    const filePath = path.join(TARGET_DIR, `${key}.png`);
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 100) {
      return resolve({ key, status: 'cached' });
    }

    const url = `https://render.albiononline.com/v1/item/${encodeURIComponent(key)}.png`;
    const file = fs.createWriteStream(filePath);

    const request = https.get(url, { headers: { 'User-Agent': 'AlbionOnlineApp/1.0' } }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve({ key, status: 'downloaded' });
        });
      } else {
        file.close();
        fs.unlink(filePath, () => {});
        resolve({ key, status: `failed (${res.statusCode})` });
      }
    });

    request.on('error', (err) => {
      file.close();
      fs.unlink(filePath, () => {});
      resolve({ key, status: `error (${err.message})` });
    });

    request.setTimeout(12000, () => {
      request.destroy();
      file.close();
      fs.unlink(filePath, () => {});
      resolve({ key, status: 'timeout' });
    });
  });
}

async function run() {
  console.log('Extracting icon keys from data/global-items.ts...');
  const keys = extractIconKeys();
  console.log(`Found ${keys.length} unique item icon keys.`);

  let downloaded = 0;
  let cached = 0;
  let failed = 0;

  const concurrency = 6;
  let index = 0;

  async function worker() {
    while (index < keys.length) {
      const current = keys[index++];
      const res = await downloadImage(current);
      if (res.status === 'downloaded') {
        downloaded++;
      } else if (res.status === 'cached') {
        cached++;
      } else {
        failed++;
      }
      const totalDone = downloaded + cached + failed;
      if (totalDone % 15 === 0 || totalDone === keys.length) {
        process.stdout.write(`\rProgress: ${totalDone}/${keys.length} (New: ${downloaded}, Cached: ${cached}, Failed: ${failed})`);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  console.log('\n\nDownload completed!');
  console.log(`- Downloaded: ${downloaded}`);
  console.log(`- Cached/Existing: ${cached}`);
  console.log(`- Failed: ${failed}`);
  console.log(`Saved to: ${TARGET_DIR}`);
}

run();
