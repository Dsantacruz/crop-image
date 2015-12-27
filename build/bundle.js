/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var link = document.getElementById('download');
	var cropBtn = document.getElementById('crop');
	var destCanvas = document.getElementById('dest');
	var cropper = document.getElementById('cropper');
	var srcCanvas = document.getElementById('canvas');
	var container = document.getElementById('container');

	var context = srcCanvas.getContext('2d');

	var getValueProperty = function getValueProperty(style, prop) {
	  return parseInt(style.getPropertyValue(prop), 10);
	};

	cropper.addEventListener('dragstart', function (e) {
	  var style = window.getComputedStyle(e.target, null);
	  var obj = {
	    left: getValueProperty(style, 'left') - e.clientX,
	    top: getValueProperty(style, 'top') - e.clientY
	  };
	  e.dataTransfer.setData('text', JSON.stringify(obj));
	});

	container.addEventListener('dragover', function (e) {
	  e.preventDefault();
	});

	container.addEventListener('drop', function (e) {
	  var offset = JSON.parse(e.dataTransfer.getData('text/plain'));
	  cropper.style.left = e.clientX + offset.left + 'px';
	  cropper.style.top = e.clientY + offset.top + 'px';
	  e.preventDefault();
	  crop();
	});

	cropper.addEventListener('drag', function (e) {});

	link.addEventListener('click', function () {
	  link.href = destCanvas.toDataURL();
	  link.download = 'crop.png';
	});

	var crop = function crop() {
	  var style = window.getComputedStyle(cropper, null);
	  var top = getValueProperty(style, 'top');
	  var left = getValueProperty(style, 'left');
	  destCtx.drawImage(img, left, top, 400, 400, 0, 0, 400, 400);
	};

	cropBtn.addEventListener('click', crop);

	destCanvas.height = 400;
	destCanvas.width = 400;
	var destCtx = destCanvas.getContext('2d');

	var img = new Image();
	img.src = 'demo.jpg';
	img.onload = function () {
	  srcCanvas.width = img.naturalWidth;
	  srcCanvas.height = img.naturalHeight;
	  context.drawImage(img, 0, 0);
	};

/***/ }
/******/ ]);