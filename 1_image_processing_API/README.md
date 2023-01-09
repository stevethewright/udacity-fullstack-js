# Image Processing API

The Udacity Image Processing API project completed by Stephen Wright.

This project includes an API that takes in a JPEG image, converts it to a specific width and height and provides access to it via the URL.

## Example of Resizing an Image to 2560 by 1440:
```
localhost:3000/api/images?filename=santamonica&width=2560&height=1440
```
Generated resized images are cached, meaning that upon the second reload of an image, the API will serve the image instead of generating it again.

# Building the API

To build the api:
```
npm run build
```

# Starting the API

To start running the api:
```
npm run start
```
OR
```
npm run build
node build/.
```

## Accessing the API
The API can be accessed on localhost:3000/api/image. A usage page is provided at localhost:3000/.

## Providing Images
Images can be provided in the ./src/assets/full folder. A default image (santamonica.jpg) is already included here.

# Running Jasmine Tests
To run the Jasmine tests:
```
npm test
```