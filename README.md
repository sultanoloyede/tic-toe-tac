# Tic Tac Toe Game

This is a web based Tic Tac Toe game that uses HTML, CSS, Javascript for front end and PHP for server side. PostgreSQL is used for managing data. The game allows players to play a tic tac toe game and saves results to a PostgreSQL database.

## Features
- Play tic tac toe in the browser
- Display current player and status
- Save game results
- Responsive and interactive UI

### Setup
- Start php server (php -S localhost:8000)
- Double click tictactoe.html
- Play game to completion
- Paste following in terminal: psql -U csi -d tic_tac_toe
- Query following when prompted: SELECT * FROM game_results;
- You will see timestamps and result of games