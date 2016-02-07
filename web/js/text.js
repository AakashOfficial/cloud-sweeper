var Text = (function Text(){
	"use strict";

	var publicAPI,
		characters,
		cache;

	characters = {
		small: [
			" ",
			"0","1","2","3","4","5","6","7","8","9"
		],
		big: [
			" ",
			"0","1","2","3","4","5","6","7","8","9"
		],
	};

	cache = {};

	publicAPI = {
		load: load,
		getText: getText,
		cacheCharacter: cacheCharacter,
		getCachedCharacter: getCachedCharacter,
	};

	return publicAPI;


	// ******************************

	function load() {
		return Promise.all(
			Object.keys(characters).map(function mapper(textType){
				var width1, width2, width3, height;

				if (textType === "big") {
					width1 = 100;
					width2 = 124;
					width3 = 200;
					height = 250;
				}
				else if (textType === "small") {
					width1 = 18;
					width2 = 28;
					width3 = 50;
					height = 70;
				}

				return Promise.all(
					characters[textType].map(function mapper(char,idx){
						var chName = char;
						if (chName === " ") {
							chName = "space";
						}

						characters[textType][idx] = {
							char: char,
							src: "images/text/" + textType + "/" + chName + ".svg"
						};

						var pr = Utils.loadImgOnEntry(characters[textType][idx]);

						if (chName === "space") {
							characters[textType][idx].img.width = width1;
						}
						else if (chName === "1") {
							characters[textType][idx].img.width = width2;
						}
						else {
							characters[textType][idx].img.width = width3;
						}
						characters[textType][idx].img.height = height;

						return pr;
					})
				);
			})
		);
	}

	function getText(textType,str) {
		return str.split("").map(function mapper(char){
			for (var i=0; i<characters[textType].length; i++) {
				if (characters[textType][i].char === char) {
					return characters[textType][i].img;
				}
			}
		});
	}

	function cacheCharacter(cacheID) {
		if (!cache[cacheID]) {
			cache[cacheID] = {
				cnv: document.createElement("canvas"),
				ctx: null,
			};
			cache[cacheID].ctx = cache[cacheID].cnv.getContext("2d");
			cache[cacheID].cnv.width = cache[cacheID].cnv.height = 0;
		}

		// clear canvas
		cache[cacheID].cnv.width = cache[cacheID].cnv.width;

		return cache[cacheID];
	}

	function getCachedCharacter(cacheID) {
		if (!cache[cacheID]) {
			cacheCharacter(cacheID);
		}

		return cache[cacheID];
	}

})();
