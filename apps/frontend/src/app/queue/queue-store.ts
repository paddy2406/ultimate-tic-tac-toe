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
      eventSource = new EventSource(`/api/queue?id=${id}&name=${name}`);

      eventSource.addEventListener('addPlayer', (event) => {
        if (
          !this.playersInQueue.some((x) => x.id === JSON.parse(event.data).id)
        ) {
          this.playersInQueue.push(JSON.parse(event.data));
          console.log('add', event.data);
        }
      });

      eventSource.addEventListener('deletePlayer', (event) => {
        const id = JSON.parse(event.data).id;
        const index = this.playersInQueue.findIndex((x) => x.id === id);
        this.playersInQueue.splice(index, 1);
        console.log(this.playersInQueue);
        console.log('remove', event.data);
      });

      eventSource.addEventListener('matchFound', (event) => {
        const res = JSON.parse(event.data);
        this.matchId = res.id;
        this.oppenent = res.opponent;
        console.log('match found', event.data);
        eventSource?.close();
      });
    },
    async leaveQueue() {
      eventSource?.close();
      this.$reset();
    },
  },
});
