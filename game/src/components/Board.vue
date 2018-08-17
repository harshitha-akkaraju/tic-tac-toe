<template>
    <div>
        <Scores v-bind:ai="aiPlayer" v-bind:human="humanPlayer"/>

        <div class="grid">
            <div class="row">
                <Cell :value="board[0]" @updateBoard="updateBoard" :index="0" :isHuman="counter % 2 == 0" :ai="aiPlayer" :human="humanPlayer"/>
                <Cell :value="board[1]" @updateBoard="updateBoard" :index="1" :isHuman="counter % 2 == 0" :ai="aiPlayer" :human="humanPlayer"/>
                <Cell :value="board[2]" @updateBoard="updateBoard" :index="2" :isHuman="counter % 2 == 0" :ai="aiPlayer" :human="humanPlayer"/>
            </div>

            <div class="row">
                <Cell :value="board[3]" @updateBoard="updateBoard" :index="3" :isHuman="counter % 2 == 0" :ai="aiPlayer" :human="humanPlayer"/>
                <Cell :value="board[4]" @updateBoard="updateBoard" :index="4" :isHuman="counter % 2 == 0" :ai="aiPlayer" :human="humanPlayer"/>
                <Cell :value="board[5]" @updateBoard="updateBoard" :index="5" :isHuman="counter % 2 == 0" :ai="aiPlayer" :human="humanPlayer"/>
            </div>

            <div class="row">
                <Cell :value="board[6]" @updateBoard="updateBoard" :index="6" :isHuman="counter % 2 == 0" :ai="aiPlayer" :human="humanPlayer"/>
                <Cell :value="board[7]" @updateBoard="updateBoard" :index="7" :isHuman="counter % 2 == 0" :ai="aiPlayer" :human="humanPlayer"/>
                <Cell :value="board[8]" @updateBoard="updateBoard" :index="8" :isHuman="counter % 2 == 0" :ai="aiPlayer" :human="humanPlayer"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Cell from './Cell'
    import Scores from './Scores'
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
            counter: 0
          }
        },
        methods: {
			// method to get empty cells on the board
			getEmptyIndices() {
				let emptyIndices = [];
				this.board.forEach((cell, index) => {
                    if (cell === "") {
                    	emptyIndices.push(index);
                    }
                });
				return emptyIndices;
            },
            updateBoard(cellIndex, player) {
                if (this.board[cellIndex] === "") {
                	this.$set(this.board, cellIndex, player);
                	this.counter++;
                }
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
</style>