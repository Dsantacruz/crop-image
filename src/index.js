import $ from 'jquery';
import _ from 'jquery-ui/draggable';
import Vue from 'vue';

let vm = new Vue({
  el: '#app',
  data: {
    config: {
      width: 300,
      height: 400
    },
    srcCanvasStyle: {
      width: '500px',
      height: '600px'
    }
  },

  ready() {
    this.img = new Image();
    this.link = document.getElementById('download');
    this.srcCanvas = document.getElementById('source');
    this.destCanvas = document.getElementById('dest');
    this.destCtx = this.destCanvas.getContext('2d');
    this.destCanvas.width = this.config.width;
    this.destCanvas.height = this.config.height;
    this.cropper = $('#cropper');
    this.cropper
      .draggable({containment: '#container', drag: () => {this.crop();}});
  },

  methods: {

    fileUpload(e) {
      let file = e.target.files[0];
      let reader = new FileReader();

      reader.onloadend = () => {
        this.img.src = reader.result;

        this.img.onload = () => {
          this.srcCanvas.width = this.srcCanvasStyle.width = this.img.naturalWidth;
          this.srcCanvas.height = this.srcCanvasStyle.height = this.img.naturalHeight;
          this.srcCanvas
            .getContext('2d')
            .drawImage(this.img, 0, 0);
          this.crop();
        };
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },

    crop() {
      let pos = this.cropper.position();
      this.destCtx.clearRect(0, 0, this.config.width, this.config.height);
      this.destCtx.drawImage(this.img, pos.left, pos.top, this.config.width,
                             this.config.height, 0, 0, this.config.width,
                             this.config.height);

    },

    download() {
      this.link.href = this.destCanvas.toDataURL();
      this.link.download = 'crop.png';
    }

  }
});

let update = function(prop, newVal) {
  this.destCanvas[prop] = newVal;
  this.crop();
};

let createWatcher = (prop) => {
  vm.$watch(`config.${prop}`, function(val) {
    update.call(this, prop, val);
  });
};

createWatcher('width');
createWatcher('height');
