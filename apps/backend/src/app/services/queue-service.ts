import {
  addPlayer,
  deletePlayer,
  matchFound,
} from '@ultimate-tic-tac-toe/types';
import { nanoid } from 'nanoid';
import { SSECallback } from '../types/sseCallback';

export type queueCallbacks = {
  matchFound: matchFound;
  deletePlayer: deletePlayer;
  addPlayer: addPlayer;
};

export type QueueCallback = SSECallback<queueCallbacks>;

type QueueMember = {
  name: string;
  cb: QueueCallback;
  inQueueSince: number;
};

const queueMap = new Map<string, QueueMember>();

/**
 * Matchmaker
 */
setInterval(() => {
  const playeralligableForMatch = Array.from(queueMap.entries()).filter(
    ([_, value]) => {
      return Date.now() - value.inQueueSince > 5_000;
    }
  ); // only match players that have been in the queue for more than 5 seconds to simulate waiting period

  for (let i = 0; i < playeralligableForMatch.length - 1; i += 2) {
    const [firstPlayerId, firstPlayer] = playeralligableForMatch[i];
    const [secondPlayerId, secondPlayer] = playeralligableForMatch[i + 1];

    const matchId = nanoid();
    firstPlayer.cb('matchFound', { id: matchId, opponent: secondPlayer.name });
    secondPlayer.cb('matchFound', { id: matchId, opponent: firstPlayer.name });
    queueMap.delete(firstPlayerId);
    queueMap.delete(secondPlayerId);

    for (const otherPlayer of queueMap.values()) {
      otherPlayer.cb('deletePlayer', { id: firstPlayerId });
      otherPlayer.cb('deletePlayer', { id: secondPlayerId });
    }
  }
}, 1000);

function joinQueue(id: string, name: string, newDataCallback: QueueCallback) {
  for (const otherPlayer of queueMap.values()) {
    otherPlayer.cb('addPlayer', { name, id });
    newDataCallback(
      'addPlayer',
      { name: otherPlayer.name, id: nanoid() } // random id for other players, to not expose their real id
    );
  }

  queueMap.set(id, {
    name,
    cb: newDataCallback,
    inQueueSince: Date.now(),
  });
}

function leaveQueue(id: string) {
  if (queueMap.delete(id)) {
    for (const otherPlayer of queueMap.values()) {
      otherPlayer.cb('deletePlayer', { id });
    }
  }
}

export const QueueService = { joinQueue, leaveQueue };
