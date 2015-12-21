import { TIMER_MODE, TIMES_PER_DAY, INTERVAL } from './config';

export default class Timer {

  constructor(fn) {
    if (!TIMER_MODE || !fn) {
      throw new Error('TIMER_MODE or function not supplied.');
    }
    this.fn = fn;
    if (TIMER_MODE === 'random') {
      this.randomTimer();
    } else if (TIMER_MODE === 'fixed') {
      this.fixedTimer();
    } else {
      throw new Error('You must supply a valid TIMER_MODE in config.js');
    }
  }

  randomTimer() {
    console.log(`DRAKEBOT: Starting random timer. `);
    const randomTimes = this.getRandomTimes();
    randomTimes.forEach(time => {
      const timeFromNow = time.getTime() - Date.now();
      console.log(`DRAKEBOT: drake will speak at: `, time);
      setTimeout(() => {
        this.fn();
        randomTimes.shift();
        if (!randomTimes.length) {
          this.randomTimer();
        }
      }, timeFromNow);
    });
  }

  fixedTimer() {
    const intvl = INTERVAL * 1000 || 1000 * 60 * 60;
    console.log(`DRAKEBOT: Starting fixed timer. Speaking every ${intvl / 1000} seconds.`);
    setInterval(this.fn.bind(this), intvl);
  }

  getRandomTimes() {
    const date = Date.now();
    const dayInMS = 1000 * 60 * 60 * 24;
    const times = [];
    for (let x = 0; x < TIMES_PER_DAY; x++) {
      const rando = Math.floor(Math.random() * (dayInMS + 1));
      times.push(new Date(date + rando));
    }
    return times.sort((a, b) => a - b);
  }
}
