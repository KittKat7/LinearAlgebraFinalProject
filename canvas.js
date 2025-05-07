var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;
let posx = width / 2;
let posy = height / 2;
let rotation = 0;

const RADIUS = 2;
let units = 10;
let unitScale = units / width;

let box = [[1, 1], [1, 4], [4, 4], [4, 1]];
let triforce = [[1, 1], [3, 4 * Math.sqrt(3) / 2 + 1], [4, 2 * Math.sqrt(3) / 2 + 1], [2, 2 * Math.sqrt(3) / 2 + 1], [3, 1], [4, 2 * Math.sqrt(3) / 2 + 1], [5, 1]];
let car = [[3, 6], [3, 9], [3.5, 9], [4, 8], [6, 12], [10, 15], [15, 16], [17, 20], [20, 20.5], [23, 21], [28, 20.5], [32, 19], [36, 16], [39, 12], [40, 11.6], [40.7, 11], [39.5, 10.8], [41, 8], [41.5, 9], [42, 9], [42, 6], [36, 6], [35.8, 5], [35, 3.5], [34, 2.5], [32, 2], [30, 2.5], [29, 3.5], [28.2, 5], [28, 6], [20, 6], [19.8, 5], [19, 3.5], [18, 2.5], [16, 2], [14, 2.5], [13, 3.5], [12.2, 5], [12, 6], [3, 6]];

let modifyDefault = [[0.5, 0], [0, 0.5]];
let modify = modifyDefault;

let input = box;

function setInputShape(shape) {
	input = shape;
	if (input == car) {
		units = 50;
	} else {
		units = 10;
	}
}

function setTransform() {
	modify = JSON.parse(document.getElementById("transform").value);
}

function resetTransform() {
	document.getElementById("transform").value = JSON.stringify(modifyDefault);
	setTransform();
}

function multiply(vectors, matrix) {
	let output = [];

	for (let i = 0; i < vectors.length; i++) {
		let vector = vectors[i]; // one vector
		let result = [];

		for (let j = 0; j < matrix.length; j++) {
			let sum = 0;

			for (let k = 0; k < matrix[j].length; k++) {
				sum += vector[k] * matrix[k][j];
			}

			result.push(sum);
		}

		output.push(result);
	}

	return output;
}



function clear() {
	ctx.rect(-1, -1, width + 2, height + 2);
	ctx.fillStyle = "white";
	ctx.fill();
	// ctx.closePath();
}

function drawRuler() {
	ctx.fillStyle = "#000000";
	for (var i = 0; i <= units; i++) {
		ctx.beginPath();
		ctx.arc(calcX(i), calcY(0), RADIUS, 0, 2 * Math.PI, false);
		ctx.fill();
	}
	for (var i = 1; i <= units; i++) {
		ctx.beginPath();
		ctx.arc(calcX(0), calcY(i), RADIUS, 0, 2 * Math.PI, false);
		ctx.fill();
	}
	ctx.fillStyle = "#555555";
	for (var i = 1; i <= units; i++) {
		for (var j = 1; j <= units; j++) {
			ctx.beginPath();
			ctx.arc(calcX(i), calcY(j), RADIUS / 2, 0, 2 * Math.PI, false);
			ctx.fill();
		}
	}
	ctx.stroke();
}

function calcX(x) {
	return x * width / units;
}

function calcY(y) {
	return height - y * height / units
}

function drawMatrix(matrix, color) {
	// ctx.strokeStyle = "#FF0000";
	ctx.fillStyle = color;
	ctx.beginPath();
	for (var v = 0; v < matrix.length + 1; v++) {
		ctx.arc(calcX(matrix[v % matrix.length][0]), calcY(matrix[v % matrix.length][1]), 0, 0, 2 * Math.PI, false);
	}
	ctx.fill();
	ctx.stroke();
	for (var v = 0; v < matrix.length; v++) {
		ctx.beginPath();
		ctx.arc(calcX(matrix[v][0]), calcY(matrix[v][1]), RADIUS, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
	}
}

function redraw() {
	clear();
	drawRuler();
	drawMatrix(input, "#FF5555AA");
	drawMatrix(multiply(input, modify), "#5555FFAA");
}

function drawCanvas() {
	redraw();
	setTimeout(drawCanvas, 10);
}

drawCanvas();