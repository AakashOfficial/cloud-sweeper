var Screens = (function Screens(){
	"use strict";

	var publicAPI,
		dirty = false,
		screens,
		elements;

	screens = {
		welcome: {
			src: "images/screens/welcome.svg",
			width: 900,
			height: 750,
			hitAreas: [
				{ x1: 605, y1: 130, x2: 845, y2: 295, },	// easy
				{ x1: 665, y1: 315, x2: 905, y2: 480, },	// medium
				{ x1: 570, y1: 490, x2: 810, y2: 655, },	// hard
			],
			scaled: {
				cnv: document.createElement("canvas"),
				ctx: null,
				hitAreas: [],
			},
		},
		retry: {
			src: "images/screens/retry.svg",
			width: 900,
			height: 600,
			hitAreas: [
				{ x1: 285, y1: 380, x2: 413, y2: 412, },	// best score badge
				{ x1: 110, y1: 450, x2: 430, y2: 580, },	// go back
				{ x1: 465, y1: 450, x2: 785, y2: 580, },	// fly again
			],
			scaled: {
				cnv: document.createElement("canvas"),
				ctx: null,
				hitAreas: [],
			},
		},
	};

	screens.welcome.scaled.ctx = screens.welcome.scaled.cnv.getContext("2d");
	screens.retry.scaled.ctx = screens.retry.scaled.cnv.getContext("2d");

	elements = {
		scoreboard: {
			src: "images/screens/scoreboard.svg",
			width: 150,
			height: 150,
			scaled: {
				cnv: document.createElement("canvas"),
				ctx: null,
			},
		},
		sunMeter: {
			src: "images/screens/sun-meter.svg",
			width: 50,
			height: 300,
			scaled: {
				cnv: document.createElement("canvas"),
				ctx: null,
			},
		},
		sunMeterBar: {
			src: "images/screens/sun-meter-bar.svg",
			width: 50,
			height: 300,
			bar: {
				y1: 35,
				y2: 273,
			},
			scaled: {
				cnv: document.createElement("canvas"),
				ctx: null,
			},
		},
		sunMeterBarTop: {
			src: "images/screens/sun-meter-bar-top.svg",
			width: 50,
			height: 4,
			scaled: {
				cnv: document.createElement("canvas"),
				ctx: null,
			},
		},
		gameover: {
			src: "images/screens/game-over.svg",
			width: 655,
			height: 110,
			scaled: {
				cnv: document.createElement("canvas"),
				ctx: null,
			},
		},
	};

	elements.scoreboard.scaled.ctx = elements.scoreboard.scaled.cnv.getContext("2d");
	elements.sunMeter.scaled.ctx = elements.sunMeter.scaled.cnv.getContext("2d");
	elements.sunMeterBar.scaled.ctx = elements.sunMeterBar.scaled.cnv.getContext("2d");
	elements.sunMeterBarTop.scaled.ctx = elements.sunMeterBarTop.scaled.cnv.getContext("2d");
	elements.gameover.scaled.ctx = elements.gameover.scaled.cnv.getContext("2d");

	publicAPI = {
		load: load,
		scaleTo: scaleTo,
		getWelcomeScreen: getWelcomeScreen,
		getRetryScreen: getRetryScreen,
		getElement: getElement,
	};

	return publicAPI;


	// ******************************

	function load() {
		return Promise.all(
			Object.keys(screens)
			.map(function mapper(screenID){
				return Utils.loadImgOnEntry(screens[screenID]);
			})
			.concat(
				Object.keys(elements)
				.map(function mapper(elementID){
					return Utils.loadImgOnEntry(elements[elementID]);
				})
			)
		);
	}

	function scaleTo(width,height) {
		Object.keys(screens).forEach(function eacher(screenID){
			var screen = screens[screenID];

			var widthRatio = width / screen.width;
			var heightRatio = height / screen.height;
			var ratio = (heightRatio < widthRatio) ? heightRatio : widthRatio;

			screen.scaled.width = Math.floor(screen.width * ratio);
			screen.scaled.height = Math.floor(screen.height * ratio);

			for (var i=0; i<screen.hitAreas.length; i++) {
				screen.scaled.hitAreas[i] = screen.scaled.hitAreas[i] || {};
				screen.scaled.hitAreas[i].x1 = screen.hitAreas[i].x1 * ratio;
				screen.scaled.hitAreas[i].y1 = screen.hitAreas[i].y1 * ratio;
				screen.scaled.hitAreas[i].x2 = screen.hitAreas[i].x2 * ratio;
				screen.scaled.hitAreas[i].y2 = screen.hitAreas[i].y2 * ratio;
			}

			screen.scaled.cnv.width = screen.scaled.width;
			screen.scaled.cnv.height = screen.scaled.height;
			screen.scaled.ctx.drawImage(screen.img,0,0,screen.scaled.width,screen.scaled.height);
		});
	}

	function getWelcomeScreen() {
		return screens.welcome.scaled;
	}

	function getRetryScreen() {
		return screens.retry.scaled;
	}

	function getElement(elementID) {
		return elements[elementID];
	}

})();
