import express from 'express';
const routes = express.Router();
import path from 'path';
import {existsSync, promises as fsPromises} from 'fs';

routes.get('/', (req, res) => {
  const filename = req.query.filename;
  const width = req.query.width;
  const height = req.query.height;
  if (filename == undefined) {
    res.status(400).send("400: A file was not specified.");
  } else if(!existsSync(path.resolve('src/assets/full/' + filename + ".jpg"))) {
    res.status(404).send("404: The file " + filename + ".jpg does not exist.");
  } else if (width == undefined && height == undefined) {
    res.sendFile(path.resolve('src/assets/full/' + filename + ".jpg"));
  } else if (width == undefined) {
    res.status(400).send("400: Please define the height of the resized image.");
  } else if (height == undefined) {
    res.status(400).send("400: Please define the height of the resized image.");
  } else {
    res.status(500).send("Image to be processed...");
  }
});

export default routes;
