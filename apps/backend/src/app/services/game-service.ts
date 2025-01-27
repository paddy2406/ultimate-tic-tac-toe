const TURN_DURATION = 20_000;

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

/**
 * Matchmaker
 */
setInterval(() => {
  for (const [key, value] of gameMap) {
    if (Date.now() - value.lastTurn > TURN_DURATION) {
      value.currentField = -1;
      value.currentPlayer =
        value.currentPlayer === value.players[0].id
          ? value.players[1].id
          : value.players[0].id;
      value.lastTurn = Date.now();
      value.players.forEach((player) => {
        player.cb(
          'turnTimeout',
          JSON.stringify({
            turn: value.currentPlayer,
            turnDuration: TURN_DURATION,
            nextField: value.currentField,
          })
        );
      });
    }
  }
}, 1000);

export function joinGame(
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
    throw new Error('Game already full');
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
        opponent: player.id === game.players[0].id ? 'player2' : 'player1', // TODO: get the actual name of the player
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

function disconnect(gameId: string, playerId: string) {
  //TODO: cancel Game
}

export const GameService = { joinGame, disconnect };
