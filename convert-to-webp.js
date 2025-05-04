import sharp from "sharp";
import { globby } from "globby";
import fs from "fs";

const convertImages = async () => {
  const images = await globby([
    "public/**/*.{png,jpg,jpeg,JPG,JPEG,PNG}"
  ]);

  for (const imgPath of images) {
    const webpPath = imgPath.replace(/\.(png|jpg|jpeg)$/i, ".webp");

    if (fs.existsSync(webpPath)) {
      console.log(`⏩ Пропущено (уже есть): ${webpPath}`);
      continue;
    }

    try {
      await sharp(imgPath)
        .webp({ quality: 80 })
        .toFile(webpPath);

      console.log(`✅ Сконвертировано: ${imgPath} → ${webpPath}`);
    } catch (err) {
      console.error(`❌ Ошибка с файлом ${imgPath}:`, err);
    }
  }
};

convertImages();
