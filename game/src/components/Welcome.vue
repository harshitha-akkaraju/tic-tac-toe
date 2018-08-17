<template>
    <div>
        <h1>Tic Tac Toe</h1>
        <p class="instruction"><i>Pick Your Choice</i></p>
        <div class="choices">
            <p class="choice" v-on:click="handleSelection('O')">O</p>
            <p class="choice" v-on:click="handleSelection('X')">X</p>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'Welcome',
        props: [
            'selected',
            'human'
        ],
        methods: {
			handleSelection(choice) {
              this.$emit('update', choice);
            }
        }
	};
</script>

<style scoped>
    .choices {
        display: flex;
        justify-content: center;
        cursor: pointer;
    }

    .choice {
        margin: 2%;
        font-size: 2.5em;
        font-weight: bold;
        color: #fff
    }

    .choice:hover {
        color: #E15554;
    }

    .instruction {
        font-size: 1.3em;
        font-weight: lighter;
        margin: 5% auto 0% auto;
    }
</style>