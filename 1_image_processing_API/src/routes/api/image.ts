import express from 'express';
import path from 'path';
import { existsSync, promises as fsPromises } from 'fs';
import sharp from 'sharp';
const images: express.Router = express.Router();

// API Image Route
images.get('/', (req, res) => {
  const filename: string = req.query.filename as string;
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);

  if (filename == undefined) {
    console.log('400: A file was not specified.');
    res.status(400).send('400: A file was not specified.');
  } else if (!existsSync(path.resolve('src/assets/full/' + filename + '.jpg'))) {
    console.log('404: The file ' + filename + '.jpg does not exist.');
    res.status(404).send('404: The file ' + filename + '.jpg does not exist.');
  } else if (isNaN(width) && isNaN(height)) {
    console.log('Serving ' + filename + '.jpg');
    res.sendFile(path.resolve('src/assets/full/' + filename + '.jpg'));
  } else if (isNaN(width)) {
    console.log('400: Please define the width of the resized image.');
    res.status(400).send('400: Please define the width of the resized image.');
  } else if (isNaN(height)) {
    console.log('400: Please define the height of the resized image.');
    res.status(400).send('400: Please define the height of the resized image.');
  } else {
    if (existsSync(path.resolve('src/assets/thumb/' + filename + '_thumb_' + width + 'x' + height + '.jpg'))) {
      console.log('Serving ' + filename + '_thumb_' + width + 'x' + height + '.jpg');
      res
        .status(200)
        .sendFile(path.resolve('src/assets/thumb/' + filename + '_thumb_' + width + 'x' + height + '.jpg'));
    } else {
      const fullFile = path.resolve('src/assets/full/' + filename + '.jpg');
      sharp(fullFile)
        .resize(width, height, {
          kernel: sharp.kernel.nearest,
          fit: 'cover'
        })
        .toFile('./src/assets/thumb/' + filename + '_thumb_' + width + 'x' + height + '.jpg')
        .then(() => {
          console.log('Created ' + filename + '_thumb_' + width + 'x' + height + '.jpg');
          res
            .status(200)
            .sendFile(path.resolve('src/assets/thumb/' + filename + '_thumb_' + width + 'x' + height + '.jpg'));
        });
    }
  }
});

export default images;
