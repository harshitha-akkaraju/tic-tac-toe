<template>
    <div class="cell" v-on:click="updateBoard(index, human)">
        <p v-bind:class="{text: true, human: isHuman}">{{value}}</p>
    </div>
</template>

<script>
	export default {
		name: 'Cell',
        props: [
            'value',
            'index',
            'isHuman',
            'ai',
            'human'
        ],
        methods: {
			updateBoard(index, player) {
				if (this.isHuman) {
					this.$emit('updateBoard', index, player);
                }
            }
        }
	};
</script>

<style scoped>
    .cell {
        width: 12vh;
        height: 12vh;
        display: flex;
        justify-content: center;
        border: 0.01em solid #fff;
    }

    .text {
        align-self: center;
        font-size: 2em;
        font-weight: bold;
    }

    .human {
        color: #E15554;
    }

    .ai {
        color: #046865;
    }

</style>