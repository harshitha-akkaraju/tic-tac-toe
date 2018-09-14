<template>
    <div>
        <Scores v-bind:ai="aiPlayer" v-bind:human="humanPlayer"/>
        <div v-if="this.endGame">{{this.message()}}</div>
        <div class="grid">
            <div class="row">
                <Cell :value="board[0]" @updateBoard="updateBoard" :index="0" :isHuman="counter % 2 === 0" :ai="aiPlayer" :human="humanPlayer" :board="board" :endGame="endGame"/>
                <Cell :value="board[1]" @updateBoard="updateBoard" :index="1" :isHuman="counter % 2 === 0" :ai="aiPlayer" :human="humanPlayer" :board="board" :endGame="endGame"/>
                <Cell :value="board[2]" @updateBoard="updateBoard" :index="2" :isHuman="counter % 2 === 0" :ai="aiPlayer" :human="humanPlayer" :board="board" :endGame="endGame"/>
            </div>

            <div class="row">
                <Cell :value="board[3]" @updateBoard="updateBoard" :index="3" :isHuman="counter % 2 === 0" :ai="aiPlayer" :human="humanPlayer" :board="board" :endGame="endGame"/>
                <Cell :value="board[4]" @updateBoard="updateBoard" :index="4" :isHuman="counter % 2 === 0" :ai="aiPlayer" :human="humanPlayer" :board="board" :endGame="endGame"/>
                <Cell :value="board[5]" @updateBoard="updateBoard" :index="5" :isHuman="counter % 2 === 0" :ai="aiPlayer" :human="humanPlayer" :board="board" :endGame="endGame"/>
            </div>

            <div class="row">
                <Cell :value="board[6]" @updateBoard="updateBoard" :index="6" :isHuman="counter % 2 === 0" :ai="aiPlayer" :human="humanPlayer" :board="board" :endGame="endGame"/>
                <Cell :value="board[7]" @updateBoard="updateBoard" :index="7" :isHuman="counter % 2 === 0" :ai="aiPlayer" :human="humanPlayer" :board="board" :endGame="endGame"/>
                <Cell :value="board[8]" @updateBoard="updateBoard" :index="8" :isHuman="counter % 2 === 0" :ai="aiPlayer" :human="humanPlayer" :board="board" :endGame="endGame"/>
            </div>
        </div>
        <p class="note"><i class="fas fa-info-circle"></i> <em> hit refresh to restart the game</em></p>
    </div>
</template>

<script>
    import Cell from './Cell'
    import Scores from './Scores'
    import swal from 'sweetalert2/dist/sweetalert2.js'
    import 'sweetalert2/src/sweetalert2.scss'

		export default {
		name: 'Board',
        components: {
			Cell,
            Scores
        },
        props: [
            'ai',
            'human'
        ],
        data: function() {
          return {
            board: ["", "", "", "", "", "", "", "", ""],
            aiPlayer: this.ai,
            humanPlayer: this.human,
            counter: 0,
            endGame: false,
            winner: ""
          }
        },
        methods: {
			// method to get empty cells on the board
			getEmptyIndices(board) {
				let emptyIndices = [];
				board.forEach((cell, index) => {
                    if (cell === "") {
                    	emptyIndices.push(index);
                    }
                });
				// shuffle the empty indices
                let i = 0;
                let j = 0;
                let temp = null;
                for (i = emptyIndices.length - 1; i > 0; i -= 1) {
                    j = Math.floor(Math.random() * (i + 1));
                    temp = emptyIndices[i];
                    emptyIndices[i] = emptyIndices[j];
                    emptyIndices[j] = temp;
                }
				return emptyIndices;
            },
            updateBoard(cellIndex, player) {
                if (this.board[cellIndex] === "") {
                	this.$set(this.board, cellIndex, player);
                	this.counter++;
                	this.minimax(this.board);
                	this.checkGameStatus();
                }
            },
            isWinning(board, player) {
				return (
                    (board[0] === player && board[1] === player && board[2] === player) ||
                    (board[3] === player && board[4] === player && board[5] === player) ||
                    (board[6] === player && board[7] === player && board[8] === player) ||
                    (board[0] === player && board[3] === player && board[6] === player) ||
                    (board[1] === player && board[4] === player && board[7] === player) ||
                    (board[2] === player && board[5] === player && board[8] === player) ||
                    (board[0] === player && board[4] === player && board[8] === player) ||
                    (board[2] === player && board[4] === player && board[6] === player)
                );
            },
            minimax(board) {
                let move = this.maxValue(Object.assign([], board));
                this.$set(this.board, move.index, this.aiPlayer);
                this.counter++;
            },
            maxValue(board) {
				let emptyIndices = this.getEmptyIndices(board);
                if (this.isWinning(board, this.aiPlayer)) {
                	return {value: 100};
                } else if (this.isWinning(board, this.humanPlayer)) {
                  return {value: -100};
                } else if (emptyIndices.length === 0) {
                	return {value: 0};
                }
                let best = {
                    index: -1,
                    value: Number.NEGATIVE_INFINITY
                };
                emptyIndices.forEach(index => {
                	let tempBoard = Object.assign([], board);
                    tempBoard[index] = this.aiPlayer;
                    let minValueMove = this.minValue(tempBoard);
                    minValueMove.index = index;
                    if (minValueMove.value >= best.value) {
                        best.value = minValueMove.value;
                        best.index = minValueMove.index;
                    }
                });
                return best;
            },
            minValue(board) {
                let emptyIndices = this.getEmptyIndices(board);
                if (this.isWinning(board, this.aiPlayer)) {
                    return {value: 100};
                } else if (this.isWinning(board, this.humanPlayer)) {
                    return {value: -100};
                } else if (emptyIndices.length === 0) {
                    return {value: 0};
                }
                let best = {
                    index: -1,
                    value: Number.POSITIVE_INFINITY
                };
                emptyIndices.forEach(index => {
                    let tempBoard = Object.assign([], board);
                    tempBoard[index] = this.humanPlayer;
                    let maxValueMove = this.maxValue(tempBoard);
                    maxValueMove.index = index;
                    if (maxValueMove.value <= best.value) {
                        best.value = maxValueMove.value;
                        best.index = maxValueMove.index;
                    }
                });
                return best;
            },
            checkGameStatus() {
                if (this.isWinning(this.board, this.aiPlayer)) {
                    this.endGame = true;
                    this.winner = this.aiPlayer;
                } else if (this.isWinning(this.board, this.humanPlayer)) {
                	this.endGame = true;
                    this.winner = this.humanPlayer;
                } else if (this.counter === 10) {
                	this.endGame = true;
                	this.winner = "tie";
                }
                console.log(this.counter);
            },
            message() {
				let message = "";
				if (this.winner === this.aiPlayer) {
					message = this.winner === this.aiPlayer ? "😈 \n AI wins" : "";
                } else if (this.winner === this.humanPlayer) {
					message = "😎\n You win!";
                } else if (this.counter === 10 && this.endGame) {
                  message = "✌🏽 \n It's a tie";
                }
                swal({
                  title: message,
                  html: '<a style="color:#7cdbd5;text-decoration: none" href="https://github.com/harshitha-akkaraju/tic-tac-toe">view project on <i class="fab fa-github"></i></a>'
                });
            }
        }
	};
</script>

<style scoped>
    .row {
        display: flex;
        justify-content: center;
    }

    .grid {
        margin: 3% auto 3% auto
    }

    .note {
        color: #1d8a99
    }

</style>