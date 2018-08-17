class Board {
	constructor() {
		this.board = [null, null, null, null, null, null, null, null, null];
	}

	
	setState(board) {
		this.board = board;
	}

	/**
	 * returns the current state of the game
	 *
	 * @returns {Board}
	 */
	getState() {
		let state = new Board();
		state.setState(Object.assign([], this.board));
		return state;
	}

	/**
	 * updates the board at the given index for the given player
	 *
	 * @param move
	 * @param player
	 */
	play(move, player) {
		this.board[move] = player;
	}

	/**
	 * determines whether the given player has won the game
	 * @param player
	 * @returns {boolean|*}
	 */
	isWinning(player) {
		return (this.board[0] === player && this.board[1] === player && this.board[2]) ||
				(this.board[3] === player && this.board[4] === player && this.board[5]) ||
				(this.board[6] === player && this.board[7] === player && this.board[8]) ||
				(this.board[0] === player && this.board[3] === player && this.board[6]) ||
				(this.board[1] === player && this.board[4] === player && this.board[7]) ||
				(this.board[2] === player && this.board[5] === player && this.board[8]) ||
				(this.board[0] === player && this.board[4] === player && this.board[8]) ||
				(this.board[2] === player && this.board[4] === player && this.board[6])
	}

	/**
	 * get empty indices in the board
	 * @returns {Array}
	 */
	getEmptyIndices() {
		let result = [];
		for (let i = 0; i < this.board.length; i++) {
			if (this.board[i] === null) {
				result.push(i);
			}
		}
		return result;
	}
}

/**
 * @return {number}
 */
function MinMax(board, player) {
	let emptyIndices = board.getEmptyIndices();
	// TODO: replace these
	let human = "O";
	let ai = "X";
	// base case: has reached a terminal state
	if (emptyIndices.length === 0) {
		return 0;
	} else if (board.isWinning(human)) {
		return -10;
	} else if (board.isWinning(ai)) {
		return 10;
	}
	// otherwise: recurse
	let moves = [];
	for (let i = 0; i < emptyIndices; i++) {
		let move = {};
		// hold on to the previous value
		move["index"] = board[emptyIndices[i]];
		board[emptyIndices[i]] = player;
		let result;
		if (player === ai) {
			result = MinMax(board, human);
		} else {
			result = MinMax(board, ai);
		}
		move["score"] = result.score;
		// reset the board
		board[emptyIndices[i]] = move.index;
		// record the move
		moves.push(move);
	}
	let optimalMove = getOptimalMove(moves, player);
	return moves[optimalMove];
}

function getOptimalMove(moves, player) {
	let bestMove;
	let score;
	if (player === 'ai') {
		score = Number.MIN_VALUE;
		moves.forEach((move, i) => {
			if (move.score > score) {
				bestMove = i;
				score = move.score;
			}
		});
	} else {
		score = Number.MAX_VALUE;
		moves.forEach((move, i) => {
			if (move.score < score) {
				bestMove = i;
				move.score = score;
			}
		});
	}
	return bestMove;
}

module.exports = {
	Board,
	MinMax,
};