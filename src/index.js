let link = document.getElementById('download');
let cropBtn = document.getElementById('crop');
let destCanvas = document.getElementById('dest');
let cropper = document.getElementById('cropper');
let srcCanvas = document.getElementById('canvas');
let container = document.getElementById('container');

let context = srcCanvas.getContext('2d');

let getValueProperty = (style, prop) => {
  return parseInt(style.getPropertyValue(prop), 10);
};

cropper.addEventListener('dragstart', e => {
  let style = window.getComputedStyle(e.target, null);
  let obj = {
    left: getValueProperty(style, 'left') - e.clientX,
    top: getValueProperty(style, 'top') - e.clientY
  };
  e.dataTransfer.setData('text', JSON.stringify(obj));
});

container.addEventListener('dragover', e => {
  e.preventDefault();
});

container.addEventListener('drop', e => {
  let offset = JSON.parse(e.dataTransfer.getData('text/plain'));
  cropper.style.left = (e.clientX + offset.left) + 'px';
  cropper.style.top = (e.clientY + offset.top) + 'px';
  e.preventDefault();
  crop();
});

cropper.addEventListener('drag', e => {
});

link.addEventListener('click', () => {
  link.href = destCanvas.toDataURL();
  link.download = 'crop.png';
});

let crop = () => {
  let style = window.getComputedStyle(cropper, null);
  let top = getValueProperty(style, 'top');
  let left = getValueProperty(style, 'left');
  destCtx.drawImage(img, left, top, 400, 400, 0, 0, 400, 400);
};

cropBtn.addEventListener('click', crop);

destCanvas.height = 400;
destCanvas.width = 400;
let destCtx = destCanvas.getContext('2d');

let img = new Image();
img.src = 'demo.jpg';
img.onload = () => {
  srcCanvas.width = img.naturalWidth;
  srcCanvas.height = img.naturalHeight;
  context.drawImage(img, 0, 0);
};

