import $ from 'jquery';
import _ from 'jquery-ui/draggable';

let link = document.getElementById('download');
let destCanvas = document.getElementById('dest');
let cropper = document.getElementById('cropper');
let srcCanvas = document.getElementById('source');

$('#cropper')
  .draggable({containment: '#container', drag: () => {crop(cropper, img);}});

let config = {
  width: 400,
  height: 400
};

destCanvas.height = 400;
destCanvas.width = 400;
let destCtx = destCanvas.getContext('2d');

document.getElementById('cropHeight')
  .addEventListener('change', e => {
    cropper.style.height = destCanvas.height = config.height = Number(e.target.value);
  });
document.getElementById('cropWidth')
  .addEventListener('change', e => {
    cropper.style.width = destCanvas.width = config.width = Number(e.target.value);
  });

let getValueProperty = (style, prop) => {
  return parseInt(style.getPropertyValue(prop), 10);
};

link.addEventListener('click', () => {
  link.href = destCanvas.toDataURL();
  link.download = 'crop.png';
});

let crop = (cropper, image) => {
  let style = window.getComputedStyle(cropper, null);
  let top = getValueProperty(style, 'top');
  let left = getValueProperty(style, 'left');
  destCtx.clearRect(0, 0, config.width, config.height);
  destCtx.drawImage(image, left, top, config.width, config.height, 0, 0,
                    config.width, config.height);
};

let img = new Image();
img.src = 'demo.jpg';
img.onload = () => {
  srcCanvas.width = img.naturalWidth;
  srcCanvas.height = img.naturalHeight;
  srcCanvas
    .getContext('2d')
    .drawImage(img, 0, 0);
  crop(cropper, img);
};


document.getElementById('fileUpload')
  .addEventListener('change', (e) => {
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      img.src = reader.result;
      img.onload = () => {
        srcCanvas.width = img.naturalWidth;
        srcCanvas.height = img.naturalHeight;
        srcCanvas
          .getContext('2d')
          .drawImage(img, 0, 0);
        crop(cropper, img);
      };
    };

    if (file) {
      console.log('file fond');
      reader.readAsDataURL(file);
    }
  });

