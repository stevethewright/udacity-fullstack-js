import sharp from "sharp";
import path from 'path';
import {promises as fs} from 'fs'

async function resizeImage(filename: string, width: number, height: number): Promise<boolean> {
    try {
        const fullFilePath = path.resolve('src/assets/full/' + filename + '.jpg');
        await sharp(fullFilePath).resize(width, height, {
          kernel: sharp.kernel.nearest,
          fit: 'cover'
        }).toFile('./src/assets/thumb/' + filename + '_thumb_' + width + 'x' + height + '.jpg').then(async () => {
          console.log('Created ' + filename + '_thumb_' + width + 'x' + height + '.jpg');
          return true;
        });
    } catch (error) {
          console.log('Error: Failed to create ' + filename + '_thumb_' + width + 'x' + height + '.jpg');
          return false;
    }
    return true;
}

export default resizeImage;