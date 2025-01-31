import { UserService } from './user-service';

const TURN_DURATION = 2_000;

enum FieldState {
  Empty,
  Player1,
  Player2,
  Tied,
}

type Player = {
  id: string;
  cb: (event: string, data: string) => void;
};

type Game = {
  players: [Player, Player?];
  board: number[][];
  currentField: number;
  currentPlayer: string;
  lastTurn: number;
};

const gameMap = new Map<string, Game>();

setInterval(() => {
  for (const game of gameMap.values()) {
    if (Date.now() - game.lastTurn > TURN_DURATION) {
      game.currentField = -1;
      game.currentPlayer = otherPlayer(game.players, game.currentPlayer);
      game.lastTurn = Date.now();
      game.players.forEach((player) => {
        player.cb(
          'turnTimeout',
          JSON.stringify({
            turn: game.currentPlayer,
            turnDuration: TURN_DURATION,
            nextField: game.currentField,
          })
        );
      });
    }
  }
}, 1000);

function joinGame(
  gameId: string,
  playerId: string,
  newDataCallback: (event: string, data: string) => void
) {
  if (!gameMap.has(gameId)) {
    initGame(gameId, playerId, newDataCallback);
    return;
  }
  const game = gameMap.get(gameId);
  if (game.players[1]) {
    //throw new Error('Game already full');
    return;
  }

  game.players[1] = {
    id: playerId,
    cb: newDataCallback,
  };

  game.lastTurn = Date.now();

  game.players.forEach((player) => {
    player.cb(
      'gameStarted',
      JSON.stringify({
        opponent: UserService.getUser(otherPlayer(game.players, player.id))
          .name,
        turn: game.players[0].id,
        turnDuration: TURN_DURATION,
      })
    );
  });
}

function initGame(
  gameId: string,
  playerId: string,
  newDataCallback: (event: string, data: string) => void
) {
  gameMap.set(gameId, {
    players: [
      {
        id: playerId,
        cb: newDataCallback,
      },
      undefined,
    ],
    board: [
      Array(9).fill(0),
      Array(9).fill(0),
      Array(9).fill(0),
      Array(9).fill(0),
      Array(9).fill(0),
      Array(9).fill(0),
      Array(9).fill(0),
      Array(9).fill(0),
      Array(9).fill(0),
    ],
    currentField: -1,
    currentPlayer: playerId,
    lastTurn: 0,
  });
}

function move(gameId: string, playerId: string, field: number, square: number) {
  const game = gameMap.get(gameId);
  if (game.currentPlayer !== playerId) {
    //throw new Error('Not your turn');
    return;
  }
  if (game.currentField !== -1 && game.currentField !== field) {
    //throw new Error('Invalid move');
    console.log(
      'invalid move. current field:' +
        game.currentField +
        ':  targeted field:' +
        field
    );
    return;
  }
  if (game.board[field][square] !== 0) {
    //throw new Error('Invalid move');
    return;
  }

  game.board[field][square] = playerId === game.players[0].id ? 1 : 2;
  game.currentField =
    checkSingleField(game.board[square]) === FieldState.Empty ? square : -1;
  const outcome = checkWin(game.board);

  game.currentPlayer = otherPlayer(game.players, playerId);
  game.lastTurn = Date.now();

  game.players.forEach((player) => {
    player.cb(
      'move',
      JSON.stringify({
        field,
        square,
        currentField: game.currentField,
        turn: game.currentPlayer,
        turnDuration: TURN_DURATION,
      })
    );
  });

  if (outcome !== FieldState.Empty) {
    setTimeout(() => {
      game.players.forEach((player) => {
        player.cb(
          'matchOver',
          JSON.stringify({
            winner:
              outcome === FieldState.Tied
                ? 'none'
                : game.players[outcome - 1].id,
          })
        );
      });
      gameMap.delete(gameId);
    }, 2000);
  }
}

function otherPlayer(players: [Player, Player?], playerId: string) {
  return players[0].id === playerId ? players[1].id : players[0].id;
}

function checkWin(board: number[][]): FieldState {
  const boardWithEachFieldCalculated = board.map((row) =>
    checkSingleField(row)
  );
  return checkSingleField(boardWithEachFieldCalculated);
}

function checkSingleField(field: FieldState[]): FieldState {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winCombinations) {
    if (
      field[a] === field[b] &&
      field[b] === field[c] &&
      field[a] !== FieldState.Empty &&
      field[a] !== FieldState.Tied
    ) {
      return field[a];
    }
  }
  console.log('ping');
  if (field.some((x) => x === FieldState.Empty)) {
    return FieldState.Empty;
  }
  return FieldState.Tied;
}

function disconnect(gameId: string) {
  console.log('disconnect');
  const game = gameMap.get(gameId);
  if (!game) {
    //throw new Error('Game not found');
    return;
  }

  game.players.forEach((player) => {
    player.cb('opponentDisconnect', '');
  });

  gameMap.delete(gameId);
}

export const GameService = { joinGame, disconnect, move };
