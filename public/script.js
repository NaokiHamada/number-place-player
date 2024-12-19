// grid variable
var table;

// game number
var gameId = 0;

var puzzleName = "";

// puzzle grid
var puzzle = [];

// solution grid
var solution = [];

// remaining number counts
var remaining = [9, 9, 9, 9, 9, 9, 9, 9, 9];

// variable to check if "Sudoku Solver" solve the puzzle
var isSolved = false;
var canSolved = true;

// stopwatch timer variables
var timer = 0;
var pauseTimer = false;
var intervalId;
var gameOn = false;

// grid[match][player]
var gridInit = {
	"single-objective-1": {
		"Ayato2003":     ['700000009', '003902400', '090030010', '040000070', '002000600', '010000080', '030050090', '005409300', '800000006'],
		"hoge":          ['700000005', '004507300', '090080020', '050000060', '006000100', '070000080', '040050090', '007402600', '800000004'],
		"kushida":       ['400000005', '005103200', '070080060', '090000050', '006000700', '020000010', '040070080', '002608500', '300000001'],
		"penguin": 	     ['400000006', '009304100', '050080030', '040000060', '001000400', '070000020', '080020070', '004609800', '300000002'],
		"satori":        ['300000008', '008602700', '020080040', '040000090', '003000500', '010000030', '090010060', '002703900', '100000005'],
		"SoraY677":      ['800000009', '001805700', '070030040', '010000090', '004000100', '030000020', '080020030', '009706200', '400000006'],
		"t-um":          ['100000002', '003401500', '060070080', '080000030', '005000600', '040000010', '020010070', '006504900', '400000008'],
		"XUYuefeng":     ['400000001', '008305900', '030070020', '050000040', '004000600', '020000050', '070080090', '003706400', '500000002'],
		"yukichi":       ['500000001', '003401700', '010080090', '030000070', '006000400', '040000050', '050060010', '008709300', '200000006'],
		"yukihanawa":    ['400000008', '001403500', '070050040', '030000050', '002000600', '060000010', '040070060', '007908100', '300000002'],
		"YutaNakanishi": ['700000001', '008604300', '050070080', '090000020', '002000400', '060000050', '070060030', '003402100', '200000009'],
	},
	"single-objective-2": {
		"Ayato2003":     ['600000009', '005102800', '040090030', '080000010', '007000200', '010000040', '060030020', '009608300', '400000006'],
		"hoge":          ['700000005', '004507300', '090080020', '050000060', '006000100', '070000080', '040050090', '007402600', '800000004'],
		"kushida":       ['600000005', '009307400', '050010090', '020000040', '004000800', '030000070', '010090020', '005803700', '700000009'],
		"penguin":       ['800000009', '005406700', '020080040', '070000090', '006000400', '010000020', '050020010', '009603500', '300000004'],
		"satori":        ['200000006', '007402800', '010090050', '050000020', '006000900', '040000030', '030060090', '002801500', '100000004'],
		"SoraY677":      ['600000007', '002809400', '050030060', '060000050', '008000100', '070000020', '020010040', '005203800', '900000002'],
		"t-um":          ['100000002', '003104500', '060070080', '080000010', '005000800', '090000030', '030010070', '007905400', '200000009'],
		"XUYuefeng":     ['600000003', '002904100', '050060080', '060000040', '008000200', '070000050', '040080090', '003109600', '100000004'],
		"yukichi":       ['800000002', '007408300', '060070050', '010000020', '002000100', '090000070', '030060080', '001209400', '600000003'],
		"yukihanawa":    ['100000007', '008503900', '040020060', '080000050', '004000200', '050000040', '070030080', '003209100', '500000003'],
		"YutaNakanishi": ['300000006', '008207900', '090030010', '040000080', '005000200', '010000090', '060080070', '002306500', '400000009'],
	},
	"single-objective-3": {
		"Ayato2003":     ['000000000', '005102400', '070090060', '080000090', '001000500', '060000070', '030060080', '008304100', '000000000'],
		"hoge":          ['000000000', '005703600', '010060020', '080000010', '003000900', '040000070', '050010080', '006509300', '000000000'],
		"kushida":       ['000000000', '009601700', '080020030', '060000040', '001000500', '030000080', '050030020', '007904100', '000000000'],
		"penguin":       ['000000000', '004206300', '080090070', '070000050', '005000100', '060000090', '090060080', '003105400', '000000000'],
		"satori":        ['000000000', '008605300', '090040010', '040000070', '003000500', '010000030', '080010040', '005203600', '000000000'],
		"SoraY677":      ['000000000', '005708100', '060030020', '020000070', '009000800', '050000060', '070060030', '008501400', '000000000'],
		"t-um":          ['000000000', '001203400', '040050060', '060000010', '002000700', '050000080', '080060040', '007304200', '000000000'],
		"XUYuefeng":     ['000000000', '001609400', '070020080', '010000050', '009000100', '030000070', '050070020', '008104900', '000000000'],
		"yukichi":       ['000000000', '004306700', '070090030', '010000020', '007000400', '080000090', '090080010', '005407600', '000000000'],
		"yukihanawa":    ['000000000', '001305400', '080090070', '090000080', '004000100', '020000060', '010060090', '007403500', '000000000'],
		"YutaNakanishi": ['000000000', '003106700', '040020090', '090000020', '008000100', '070000050', '050090070', '001703600', '000000000'],
	},
	"multi-objective-1": {
		"Ayato2003": [
			"100000000",
			"020000000",
			"003000000",
			"000400000",
			"000050000",
			"000006000",
			"000000700",
			"000000080",
			"000000009",
		],
		"hoge": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"penguin": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"satori": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"SoraY677": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"t-um": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"XUYuefeng": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"yukihanawa": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"YutaNakanishi": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
	},
	"multi-objective-2": {
		"Ayato2003": [
			"100000000",
			"020000000",
			"003000000",
			"000400000",
			"000050000",
			"000006000",
			"000000700",
			"000000080",
			"000000009",
		],
		"hoge": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"penguin": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"satori": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"SoraY677": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"t-um": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"XUYuefeng": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"yukihanawa": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"YutaNakanishi": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
	},
	"multi-objective-3": {
		"Ayato2003": [
			"100000000",
			"020000000",
			"003000000",
			"000400000",
			"000050000",
			"000006000",
			"000000700",
			"000000080",
			"000000009",
		],
		"hoge": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"penguin": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"satori": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"SoraY677": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"t-um": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"XUYuefeng": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"yukihanawa": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
		"YutaNakanishi": [
			"900000000",
			"080000000",
			"007000000",
			"000600000",
			"000050000",
			"000004000",
			"000000300",
			"000000020",
			"000000001",
		],
	},
};

function newGame(match, user) {
	// get random position for numbers from '1' to '9' to generate a random puzzle
	var grid = getGridInitOf(match, user);

	// prepare rows, columns and blocks to solove the initioaled grid
	var rows = grid;
	var cols = getColumns(grid);
	var blks = getBlocks(grid);

	//          solve the grid section
	// generate allowed digits for each cell
	var psNum = generatePossibleNumber(rows, cols, blks);

	// solve the grid
	solution = solveGrid(psNum, rows, true);

	// reset the game state timer and remaining number
	timer = 0;
	for (var i in remaining) remaining[i] = 9;

	puzzle = grid;
	gameOn = true;

	// update the UI
	ViewPuzzle(puzzle);
	updateRemainingTable();

	// finally, start the timer
	if (gameOn) startTimer();
}

function getGridInitOf(match, user) {
	return gridInit[match][user];
}

function getRandomPropertyName(obj) {
	var keys = Object.keys(obj);
	return keys[keys.length * Math.random() << 0];
}

function getGridInit() {
	var rand = [];
	// for each digits from 1 to 9 find a random row and column
	for (var i = 1; i <= 9; i++) {
		var row = Math.floor(Math.random() * 9);
		var col = Math.floor(Math.random() * 9);
		var accept = true;
		for (var j = 0; j < rand.length; j++) {
			// if number exist or there is a number already located in then ignore and try again
			if ((rand[j][0] == i) | ((rand[j][1] == row) & (rand[j][2] == col))) {
				accept = false;

				// try to get a new position for this number
				i--;
				break;
			}
		}
		if (accept) {
			rand.push([i, row, col]);
		}
	}

	// initialize new empty grid
	var result = [];
	for (var i = 0; i < 9; i++) {
		var row = "000000000";
		result.push(row);
	}

	// put numbers in the grid
	for (var i = 0; i < rand.length; i++) {
		result[rand[i][1]] = replaceCharAt(
			result[rand[i][1]],
			rand[i][2],
			rand[i][0]
		);
	}

	return result;
}

// return columns from a row grid
function getColumns(grid) {
	var result = ["", "", "", "", "", "", "", "", ""];
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) result[j] += grid[i][j];
		/*try {
				result[j] += grid[i][j];
			} catch (err) {
				alert(grid);
			}*/
	}
	return result;
}

// return blocks from a row grid
function getBlocks(grid) {
	var result = ["", "", "", "", "", "", "", "", ""];
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++)
			result[Math.floor(i / 3) * 3 + Math.floor(j / 3)] += grid[i][j];
	}
	return result;
}

// function to replace char in string
function replaceCharAt(string, index, char) {
	if (index > string.length - 1) return string;
	return string.substr(0, index) + char + string.substr(index + 1);
}

// get allowed numbers that can be placed in each cell
function generatePossibleNumber(rows, columns, blocks) {
	var psb = [];

	// for each cell get numbers that are not viewed in a row, column or block
	// if the cell is not empty then, allowed number is the number already exist in it
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			psb[i * 9 + j] = "";
			if (rows[i][j] != 0) {
				psb[i * 9 + j] += rows[i][j];
			} else {
				for (var k = "1"; k <= "9"; k++) {
					if (!rows[i].includes(k))
						if (!columns[j].includes(k))
							if (
								!blocks[Math.floor(i / 3) * 3 + Math.floor(j / 3)].includes(k)
							)
								psb[i * 9 + j] += k;
				}
			}
		}
	}
	return psb;
}

function solveGrid(possibleNumber, rows, startFromZero) {
	var solution = [];

	// solve Sudoku with a backtracking algorithm
	// Steps are:
	//  1.  get all allowed numbers that fit in each empty cell
	//  2.  generate all possible rows that fit in the first row depend on the allowed number list
	//` 3.  select one row from possible row list and put it in the first row
	//  4.  go to next row and find all possible number that fit in each cell
	//  5.  generate all possible row fit in this row then go to step 3 until reach the last row or there aren't any possible rows left
	//  6.  if next row hasn't any possible left then go the previous row and try the next possibility from possibility rows' list
	//  7.  if the last row has reached and a row fit in it has found then the grid has solved

	var result = nextStep(0, possibleNumber, rows, solution, startFromZero);
	if (result == 1) return solution;
}

// level is current row number in the grid
function nextStep(level, possibleNumber, rows, solution, startFromZero) {
	// get possible number fit in each cell in this row
	var x = possibleNumber.slice(level * 9, (level + 1) * 9);

	// generate possible numbers sequence that fit in the current row
	var y = generatePossibleRows(x);
	if (y.length == 0) return 0;

	// to allow check is solution is unique
	var start = startFromZero ? 0 : y.length - 1;
	var stop = startFromZero ? y.length - 1 : 0;
	var step = startFromZero ? 1 : -1;
	var condition = startFromZero ? start <= stop : start >= stop;

	// try every numbers sequence in this list and go to next row
	for (var num = start; condition; num += step) {
		var condition = startFromZero ? num + step <= stop : num + step >= stop;
		for (var i = level + 1; i < 9; i++) solution[i] = rows[i];
		solution[level] = y[num];
		if (level < 8) {
			/*if (solution[4] === undefined) {
					  var x = 0;
					  x++;
				  }*/
			var cols = getColumns(solution);
			var blocks = getBlocks(solution);

			var poss = generatePossibleNumber(solution, cols, blocks);
			if (nextStep(level + 1, poss, rows, solution, startFromZero) == 1)
				return 1;
		}
		if (level == 8) return 1;
	}
	return -1;
}

// generate possible numbers sequence that fit in the current row
function generatePossibleRows(possibleNumber) {
	var result = [];

	function step(level, PossibleRow) {
		if (level == 9) {
			result.push(PossibleRow);
			return;
		}

		for (var i in possibleNumber[level]) {
			if (PossibleRow.includes(possibleNumber[level][i])) continue;
			step(level + 1, PossibleRow + possibleNumber[level][i]);
		}
	}

	step(0, "");

	return result;
}

// view grid in html page
function ViewPuzzle(grid) {
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			var input = table.rows[i].cells[j].getElementsByTagName("input")[0];
			addClassToCell(table.rows[i].cells[j].getElementsByTagName("input")[0]);
			if (grid[i][j] == "0") {
				input.disabled = false;
				input.value = "";
			} else {
				input.disabled = true;
				input.value = grid[i][j];
				remaining[grid[i][j] - 1]--;
			}
		}
	}
}

// read current grid
function readInput() {
	var result = [];
	for (var i = 0; i < 9; i++) {
		result.push("");
		for (var j = 0; j < 9; j++) {
			var input = table.rows[i].cells[j].getElementsByTagName("input")[0];
			if (input.value == "" || input.value.length > 1 || input.value == "0") {
				input.value = "";
				result[i] += "0";
			} else result[i] += input.value;
		}
	}
	return result;
}

// check value if it is correct or wrong
// return:
//  0 for value can't be changed
//  1 for correct value
//  2 for value that hasn't any conflict with other values
//  3 for value that conflict with value in its row, column or block
//  4 for incorect input
function checkValue(value, row, column, block, defaultValue, currectValue) {
	if (value === "" || value === "0") return 0;
	if (!(value > "0" && value < ":")) return 4;
	if (value === defaultValue) return 0;
	if (
		row.indexOf(value) != row.lastIndexOf(value) ||
		column.indexOf(value) != column.lastIndexOf(value) ||
		block.indexOf(value) != block.lastIndexOf(value)
	) {
		return 3;
	}
	if (value !== currectValue) return 2;
	return 1;
}

// remove old class from input and add a new class to represent current cell's state
function addClassToCell(input, className) {
	// remove old class from input
	input.classList.remove("right-cell");
	input.classList.remove("worning-cell");
	input.classList.remove("wrong-cell");

	if (className != undefined) input.classList.add(className);
}

// update value of remaining numbers in html page
function updateRemainingTable() {
	for (var i = 1; i < 10; i++) {
		var item = document.getElementById("remain-" + i);
		item.innerText = remaining[i - 1];
		item.classList.remove("red");
		item.classList.remove("gray");
		if (remaining[i - 1] === 0) item.classList.add("gray");
		else if (remaining[i - 1] < 0 || remaining[i - 1] > 9)
			item.classList.add("red");
	}
}

// start stopwatch timer
function startTimer() {
	var timerDiv = document.getElementById("timer");
	clearInterval(intervalId);

	// update stopwatch value every one second
	pauseTimer = false;
	intervalId = setInterval(function () {
		if (!pauseTimer) {
			timer++;
			var min = Math.floor(timer / 60);
			var sec = timer % 60;
			timerDiv.innerText =
				(("" + min).length < 2 ? "0" + min : min) +
				":" +
				(("" + sec).length < 2 ? "0" + sec : sec);
		}
	}, 1000);
}

// solve sudoku function
// input: changeUI boolean      true to allow function to change UI
// output:
//  0 when everything goes right
//  1 when grid is already solved
//  2 when Invalid input
//  3 when no solution
function solveSudoku(changeUI) {
	// read current state
	puzzle = readInput();

	var columns = getColumns(puzzle);
	var blocks = getBlocks(puzzle);

	// check if there is any conflict
	var errors = 0;
	var correct = 0;

	for (var i = 0; i < puzzle.length; i++) {
		for (var j = 0; j < puzzle[i].length; j++) {
			var result = checkValue(
				puzzle[i][j],
				puzzle[i],
				columns[j],
				blocks[Math.floor(i / 3) * 3 + Math.floor(j / 3)],
				-1,
				-1
			);
			correct = correct + (result === 2 ? 1 : 0);
			errors = errors + (result > 2 ? 1 : 0);
			addClassToCell(
				table.rows[i].cells[j].getElementsByTagName("input")[0],
				result > 2 ? "wrong-cell" : undefined
			);
		}
	}

	// check if invalid input
	if (errors > 0) {
		canSolved = false;
		return 2;
	}

	canSolved = true;
	isSolved = true;

	// check if grid is already solved
	if (correct === 81) {
		return 1;
	}

	//read the current time
	var time = Date.now();

	// solve the grid
	solution = solveGrid(
		generatePossibleNumber(puzzle, columns, blocks),
		puzzle,
		true
	);

	// show result
	// get time
	time = Date.now() - time;

	if (changeUI)
		document.getElementById("timer").innerText =
			Math.floor(time / 1000) + "." + ("000" + (time % 1000)).slice(-3);

	if (solution === undefined) {
		isSolved = false;
		canSolved = false;
		return 3;
	}

	if (changeUI) {
		remaining = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		updateRemainingTable();
		ViewPuzzle(solution);
	}
	return 0;
}

// hide more option menu
function hideMoreOptionMenu() {
	var moreOptionList = document.getElementById("more-option-list");
	if (moreOptionList.style.visibility == "visible") {
		moreOptionList.style.maxWidth = "40px";
		moreOptionList.style.minWidth = "40px";
		moreOptionList.style.maxHeight = "10px";
		moreOptionList.style.opacity = "0";
		setTimeout(function () {
			moreOptionList.style.visibility = "hidden";
		}, 175);
	}
}

// UI Comunication functions

// function that must run when document loaded
window.onload = function () {
	// assigne table to its value
	table = document.getElementById("puzzle-grid");
	// add ripple effect to all buttons in layout
	var rippleButtons = document.getElementsByClassName("button");
	for (var i = 0; i < rippleButtons.length; i++) {
		rippleButtons[i].onmousedown = function (e) {
			// get ripple effect's position depend on mouse and button position
			var x = e.pageX - this.offsetLeft;
			var y = e.pageY - this.offsetTop;

			// add div that represents the ripple
			var rippleItem = document.createElement("div");
			rippleItem.classList.add("ripple");
			rippleItem.setAttribute("style", "left: " + x + "px; top: " + y + "px");

			// if ripple item should have special color... get and apply it
			var rippleColor = this.getAttribute("ripple-color");
			if (rippleColor) rippleItem.style.background = rippleColor;
			this.appendChild(rippleItem);

			// set timer to remove the dif after the effect ends
			setTimeout(function () {
				rippleItem.parentElement.removeChild(rippleItem);
			}, 1500);
		};
	}
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			var input = table.rows[i].cells[j].getElementsByTagName("input")[0];

			// add function to remove color from cells and update remaining numbers table when it get changed
			input.onchange = function () {
				//remove color from cell
				addClassToCell(this);

				// check if the new value entered is allowed
				function checkInput(input) {
					if (input.value[0] < "1" || input.value[0] > "9") {
						if (input.value != "?" && input.value != "؟") {
							input.value = "";
							alert("only numbers [1-9] and question mark '?' are allowed!!");
							input.focus();
						}
					}
				}
				checkInput(this);

				// compare old value and new value then update remaining numbers table
				if (this.value > 0 && this.value < 10) remaining[this.value - 1]--;
				if (this.oldvalue !== "") {
					if (this.oldvalue > 0 && this.oldvalue < 10)
						remaining[this.oldvalue - 1]++;
				}

				//reset canSolved value when change any cell
				canSolved = true;

				updateRemainingTable();
			};

			//change cell 'old value' when it got focused to track numbers and changes on grid
			input.onfocus = function () {
				this.oldvalue = this.value;
			};
		}
	}
};

// function to hide dialog opened in window
window.onclick = function (event) {
	var d1 = document.getElementById("dialog");
	var d2 = document.getElementById("about-dialog");
	var m1 = document.getElementById("more-option-list");

	if (event.target == d1) {
		hideDialogButtonClick("dialog");
	} else if (event.target == d2) {
		hideDialogButtonClick("about-dialog");
	} else if (m1.style.visibility == "visible") {
		hideMoreOptionMenu();
	}
};

// show hamburger menu
function HamburgerButtonClick() {
	debugger
	var div = document.getElementById("hamburger-menu");
	var menu = document.getElementById("nav-menu");
	div.style.display = "block";
	div.style.visibility = "visible";
	setTimeout(function () {
		div.style.opacity = 1;
		menu.style.left = 0;
	}, 50);
}

// start new game
function startGameButtonClick() {
	var difficulties = document.getElementsByName("difficulty");

	// initial difficulty to 5 (solved)
	var difficulty = 5;

	// get difficulty value
	for (var i = 0; i < difficulties.length; i++) {
		if (difficulties[i].checked) {
			var d = eval("(" + difficulties[i].value + ")")
			if (!d.match) d.match = getRandomPropertyName(gridInit);
			if (!d.user) d.user = getRandomPropertyName(gridInit[d.match]);
			puzzleName = d.match + ", " + d.user
			newGame(d.match, d.user);
			difficulty = i;
			break;
		}
	}

	hideDialogButtonClick("dialog");
	gameId++;
	document.getElementById("game-number").innerText = "game #" + gameId;

	// hide solver buttons
	// show other buttons
	document.getElementById("moreoption-sec").style.display = "block";
	document.getElementById("pause-btn").style.display = "block";
	document.getElementById("check-btn").style.display = "block";
	document.getElementById("isunique-btn").style.display = "none";
	document.getElementById("solve-btn").style.display = "none";

	// prerpare view for new game
	document.getElementById("timer-label").innerText = "Time";
	document.getElementById("timer").innerText = "00:00";
	document.getElementById("game-difficulty-label").innerText =
		"Game";

	document.getElementById("game-difficulty").innerText =
		difficulty < difficulties.length
			? puzzleName
			: "solved";
}

// pause \ continue button click function
function pauseGameButtonClick() {
	var icon = document.getElementById("pause-icon");
	var label = document.getElementById("pause-text");

	// change icon and label of the button and hide or show the grid
	if (pauseTimer) {
		icon.innerText = "pause";
		label.innerText = "Pause";
		table.style.opacity = 1;
	} else {
		icon.innerText = "play_arrow";
		label.innerText = "Continue";
		table.style.opacity = 0;
	}

	pauseTimer = !pauseTimer;
}

// check grid if correct
function checkButtonClick() {
	// check if game is started
	if (gameOn) {
		// add one minute to the stopwatch as a cost of grid's check
		timer += 60;
		var currentGrid = [];

		// read gritd status
		currentGrid = readInput();

		var columns = getColumns(currentGrid);
		var blocks = getBlocks(currentGrid);

		var errors = 0;
		var currects = 0;

		for (var i = 0; i < currentGrid.length; i++) {
			for (var j = 0; j < currentGrid[i].length; j++) {
				if (currentGrid[i][j] == "0") continue;

				// check value if it is correct or wrong
				var result = checkValue(
					currentGrid[i][j],
					currentGrid[i],
					columns[j],
					blocks[Math.floor(i / 3) * 3 + Math.floor(j / 3)],
					puzzle[i][j],
					solution[i][j]
				);

				// remove old class from input and add a new class to represent current cell's state
				addClassToCell(
					table.rows[i].cells[j].getElementsByTagName("input")[0],
					result === 1
						? "right-cell"
						: result === 2
							? "worning-cell"
							: result === 3
								? "wrong-cell"
								: undefined
				);

				if (result === 1 || result === 0) {
					currects++;
				} else if (result === 3) {
					errors++;
				}
			}
		}

		// if all values are correct and they equal original values then game over and the puzzle has been solved
		// if all values are correct and they aren't equal original values then game over but the puzzle has not been solved yet
		if (currects === 81) {
			gameOn = false;
			pauseTimer = true;
			document.getElementById("game-difficulty").innerText = "Solved";
			clearInterval(intervalId);
			alert("Congrats, You solved it.");
		} else if (errors === 0 && currects === 0) {
			alert(
				"Congrats, You solved it, but this is not the solution that I want."
			);
		}
	}
}

// restart game
function restartButtonClick() {
	if (gameOn) {
		// reset remaining number table
		for (var i in remaining) remaining[i] = 9;

		// review puzzle
		ViewPuzzle(puzzle);

		// update remaining numbers table
		updateRemainingTable();

		// restart the timer
		// -1 is because it take 1 sec to update the timer so it will start from 0
		timer = -1;
	}
}

// surrender
function SurrenderButtonClick() {
	if (gameOn) {
		// reset remaining number table
		for (var i in remaining) remaining[i] = 9;

		// review puzzle
		ViewPuzzle(solution);

		// update remaining numbers table
		updateRemainingTable();

		// stop the game
		gameOn = false;
		pauseTimer = true;
		clearInterval(intervalId);

		// mark game as solved
		document.getElementById("game-difficulty").innerText = "Solved";
	}
}

// hint
function hintButtonClick() {
	if (gameOn) {
		// get list of empty cells and list of wrong cells
		var empty_cells_list = [];
		var wrong_cells_list = [];
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				var input = table.rows[i].cells[j].getElementsByTagName("input")[0];
				if (input.value == "" || input.value.length > 1 || input.value == "0") {
					empty_cells_list.push([i, j]);
				} else {
					if (input.value !== solution[i][j]) wrong_cells_list.push([i, j]);
				}
			}
		}

		// check if gird is solved if so stop the game
		if (empty_cells_list.length === 0 && wrong_cells_list.length === 0) {
			gameOn = false;
			pauseTimer = true;
			document.getElementById("game-difficulty").innerText = "Solved";
			clearInterval(intervalId);
			alert("Congrats, You solved it.");
		} else {
			// add one minute to the stopwatch as a cost for given hint
			timer += 60;

			// get random cell from empty or wrong list and put the currect value in it
			var input;
			if (
				(Math.random() < 0.5 && empty_cells_list.length > 0) ||
				wrong_cells_list.length === 0
			) {
				var index = Math.floor(Math.random() * empty_cells_list.length);
				input = table.rows[empty_cells_list[index][0]].cells[
					empty_cells_list[index][1]
				].getElementsByTagName("input")[0];
				input.oldvalue = input.value;
				input.value =
					solution[empty_cells_list[index][0]][empty_cells_list[index][1]];
				remaining[input.value - 1]--;
			} else {
				var index = Math.floor(Math.random() * wrong_cells_list.length);
				input = table.rows[wrong_cells_list[index][0]].cells[
					wrong_cells_list[index][1]
				].getElementsByTagName("input")[0];
				input.oldvalue = input.value;
				remaining[input.value - 1]++;
				input.value =
					solution[wrong_cells_list[index][0]][wrong_cells_list[index][1]];
				remaining[input.value - 1]--;
			}

			// update remaining numbers table
			updateRemainingTable();
		}

		// make updated cell blinking
		var count = 0;
		for (var i = 0; i < 6; i++) {
			setTimeout(function () {
				if (count % 2 == 0) input.classList.add("right-cell");
				else input.classList.remove("right-cell");
				count++;
			}, i * 750);
		}
	}
}

function showDialogClick(dialogId) {
	// to hide navigation bar if it opened
	hideHamburgerClick();

	var dialog = document.getElementById(dialogId);
	var dialogBox = document.getElementById(dialogId + "-box");
	dialogBox.focus();
	dialog.style.opacity = 0;
	dialogBox.style.marginTop = "-500px";
	dialog.style.display = "block";
	dialog.style.visibility = "visible";

	// to view and move the dialog to the correct position after it set visible
	setTimeout(function () {
		dialog.style.opacity = 1;
		dialogBox.style.marginTop = "64px";
	}, 200);
}

// show more option menu
function moreOptionButtonClick() {
	var moreOptionList = document.getElementById("more-option-list");

	// timeout to avoid hide menu immediately in window event
	setTimeout(function () {
		if (moreOptionList.style.visibility == "hidden") {
			moreOptionList.style.visibility = "visible";
			setTimeout(function () {
				moreOptionList.style.maxWidth = "160px";
				moreOptionList.style.minWidth = "160px";
				moreOptionList.style.maxHeight = "160px";
				moreOptionList.style.opacity = "1";
			}, 50);
		}
	}, 50);
}

function hideDialogButtonClick(dialogId) {
	var dialog = document.getElementById(dialogId);
	var dialogBox = document.getElementById(dialogId + "-box");
	dialog.style.opacity = 0;
	dialogBox.style.marginTop = "-500px";

	setTimeout(function () {
		dialog.style.visibility = "collapse";
		//dialog.style.display = "none";
	}, 500);
}

// hide hamburger menu when click outside
function hideHamburgerClick() {
	var div = document.getElementById("hamburger-menu");
	var menu = document.getElementById("nav-menu");
	menu.style.left = "-256px";

	setTimeout(function () {
		div.style.opacity = 0;
		//divstyle.display = "none";
		div.style.visibility = "collapse";
	}, 200);
}

// sudoku solver section

function sudokuSolverMenuClick() {
	// hide hamburger menu
	hideHamburgerClick();

	//stop current game if its running
	if (gameOn) {
		gameOn = false;
		clearInterval(intervalId);
	}

	solution = [];
	canSolved = true;
	isSolved = false;

	// generate empty grid
	var grid = [];
	for (var i = 0; i < 9; i++) {
		grid.push("");
		for (var j = 0; j < 9; j++) {
			grid[i] += "0";
		}
	}

	// view empty grid... allow user to edit all cells
	ViewPuzzle(grid);

	// update remaining table
	remaining = [9, 9, 9, 9, 9, 9, 9, 9, 9];
	updateRemainingTable();

	// show solve and check unique buttons
	// hide other buttons
	document.getElementById("moreoption-sec").style.display = "none";
	document.getElementById("pause-btn").style.display = "none";
	document.getElementById("check-btn").style.display = "none";
	document.getElementById("isunique-btn").style.display = "block";
	document.getElementById("solve-btn").style.display = "block";

	// change status card view
	// timer for time takes to solve grid
	// gameid show text "sudoku solver"
	// difficulty show if grid solved is unique
	document.getElementById("timer-label").innerText = "Solve time";
	document.getElementById("timer").innerText = "00:00";
	document.getElementById("game-difficulty-label").innerText = "Is unique";
	document.getElementById("game-difficulty").innerText = "Unknown";
	document.getElementById("game-number").innerText = "#Soduko_Solver";

	//focus first cell
	document
		.getElementById("puzzle-grid")
		.rows[0].cells[0].getElementsByTagName("input")[0]
		.focus();
}

function solveButtonClick() {
	if (gameOn) {
		gameOn = false;
		clearInterval(intervalId);
	}

	var result = solveSudoku(true);
	switch (result) {
		case 0:
			alert("SOLVED");
			break;
		case 1:
			alert("This grid is already solved");
			break;
		case 2:
			alert("This grid can't be solved because of an invalid input");
			break;
		case 3:
			alert("this grid has no solution");
			break;
	}
}

function isUniqueButtonClick() {
	// check if gird is already solved
	// if not try to solve it

	if (!isSolved) {
		if (canSolved) solveSudoku(false);
	}
	if (!isSolved) {
		alert("Can't check this grid because it is unsolvable!");
		return;
	}

	// solve it again but start from the end
	var columns = getColumns(puzzle);
	var blocks = getBlocks(puzzle);
	var solution2 = solveGrid(
		generatePossibleNumber(puzzle, columns, blocks),
		puzzle,
		false
	);

	// if tow solutions are equals then it is unique and vice versa
	var unique = true;
	for (var i = 0; i < solution.length; i++) {
		for (var j = 0; j < solution[i].length; j++) {
			if (solution[i][j] !== solution2[i][j]) {
				unique = false;
				break;
			}
			if (!unique) break;
		}
	}

	//display the result
	document.getElementById("game-difficulty").innerText = unique ? "Yes" : "No";
}
