<template>
  <div id="app">
    <Welcome v-if="!selected"
             :human="human"
             @update="uponSelection"/>
    <Board v-if="selected" :ai="ai" :human="human"/>
    <div id="footer">
        <p>Built by <a href="https://harshitha-akkaraju.github.io" class="link">Harshitha Akkaraju</a></p>
        <a href="https://github.com/harshitha-akkaraju/tic-tac-toe" class="link">View on Github</a>
    </div>
  </div>
</template>

<script>

import Welcome from './components/Welcome'
import Board from './components/Board'
export default {
  name: 'app',
  components: {
  	Welcome,
    Board
  },
  data: function() {
  	return {
  		selected: false,
        human: "",
        ai: ""
    }
  },
  methods: {
  	uponSelection(human) {
  		this.human = human === "O" ? "O" : "X";
  		this.ai = human === "O" ? "X" : "O";
  		this.selected = true;
    }
  }
}
</script>

<style>

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 60px;
    background-color: #7cdbd5;
    width: 100vw;
    height: 100vh;
    margin: auto;
}

html, body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height: 100%;
    margin: 0;
    padding: 0;
}

#footer {
    color: #046865;
    font-size: 1.1em;
    font-weight: lighter;
    position: fixed;
    left:0px;
    bottom:0px;
    width:100%;
    height: 15%;
    padding-bottom: 3%;
}

.link {
    color: #046865;
    text-decoration: none;
}

.link:hover {
    color: #fcfff7
}
</style>
