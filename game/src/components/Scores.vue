<template>
    <div>
        <h1 class="heading">Tic Tac Toe</h1>
        <div class="bar">
            <p>You: <span class="human">{{human}}</span></p>
            <p>AI:  <span class="ai">{{ai}}</span></p>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'Scores',
        props: [
            'ai',
            'human'
        ]
	};
</script>

<style scoped>
    .heading {
        width: 50%;
        margin: auto;
    }

    .bar {
        font-size: 1.5em;
        width: 50%;
        margin: 2% auto 0% auto;
        display: flex;
        justify-content: space-evenly;
    }

    .ai {
        font-size: 1.2em;
        font-weight: bold;
        margin-left: 0.5vw;
        color: #046865;
    }

    .human {
        font-size: 1.2em;
        font-weight: bold;
        margin-left: 0.5vw;
        color: #E15554;
    }
</style>