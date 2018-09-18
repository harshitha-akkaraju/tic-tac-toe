## Implementation Details

I used the _Minimax Algorithm_ to implement the computer's play in this game. This document details the __purpose__ and 
__run time__ of the functions essential to implement the AI game logic. 

##### `getEmptyIndices(board)`
* board: array of strings that represents the state of the game

Iterates over the board to find empty indices; runs in __O(N)__ time and uses __constant space__.

##### `isWinning(board, player)`
* board: array of strings that represents the state of the game
* player: string; either "X" or "O"

Determines if the player is winning. Runs in __O(1)__ time and uses __constant space__.

##### `minimax(board)`
Computes the optimal move that the computer can make given the current state of the game. Runs in __O(b^m)__ time where 
`b` represents the number of possible moves and `m` is the maximum depth of the tree and uses constant space. 


### Minimax Algorithm
The minimax algorithm lets us compute the optimal moves the computer can make assuming that the other player is also 
making optimal moves. This results in two helper functions, maximizer and the minimizer. 

The maximizer is tasked with finding the most optimal move for the computer. Whereas the 
minimizer function works to minimize that utility for maximizer. The maximizer invokes the minimizer with a move on the 
board and the minimizer also makes a move and invokes the maximizer. This recursive invocation continues until the we reach
a terminal state on the board.

When these recursive calls unwind to the first invocation of the maximizer function, it results in a move that results 
the maximum utility to the computer. In my implementation, I let the human player make the first move and invoke the
minimax function to get the computer's move.
