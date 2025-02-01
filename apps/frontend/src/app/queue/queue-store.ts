import {
  addPlayer,
  deletePlayer,
  matchFound,
} from '@ultimate-tic-tac-toe/types';
import { defineStore } from 'pinia';

interface Player {
  id: string;
  name: string;
}

let eventSource: EventSource | undefined;

export const useQueueStore = defineStore('queuestore', {
  state: () => ({
    playersInQueue: [] as Player[],
    matchId: '',
    oppenent: '',
  }),
  actions: {
    async joinQueue(id: string, name: string) {
      eventSource = new EventSource(`/queue?id=${id}&name=${name}`);

      eventSource.addEventListener('addPlayer', (event) => {
        const res = JSON.parse(event.data) as addPlayer;
        if (!this.playersInQueue.some((x) => x.id === res.id)) {
          this.playersInQueue.push(res);
        }
      });

      eventSource.addEventListener('deletePlayer', (event) => {
        const res = JSON.parse(event.data) as deletePlayer;
        const index = this.playersInQueue.findIndex((x) => x.id === res.id);
        this.playersInQueue.splice(index, 1);
      });

      eventSource.addEventListener('matchFound', (event) => {
        const res = JSON.parse(event.data) as matchFound;
        this.matchId = res.id;
        this.oppenent = res.opponent;
        eventSource?.close();
      });
    },
    async leaveQueue() {
      eventSource?.close();
      this.$reset();
    },
  },
});
