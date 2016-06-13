import Stops from './stops';

xtag.register('video-sections', {
  lifecycle: {
    created() {
      this._onPlay = this.onPlay.bind(this);
      this._onPause = this.onPause.bind(this);

      this.xtag.video = this.video = document.createElement('video');
      this.video.controls = true;
      this.appendChild(this.video);

      this.registerListeners();
    }
  },
  accessors: {
    src: {
      attribute: {
        property: 'video'
      }
    },
    sections: {
      attribute: {},
      set(sections) {
        let times = sections.split(',').map(x=>parseInt(x))
        this.stops = new Stops(times);
        this.setNextStop();
      }
    }
  },
  methods: {
    registerListeners() {
      this.video.addEventListener('play', this._onPlay);
      this.video.addEventListener('pause', this._onPause);
    },
    clearListeners() {
      this.video.removeEventListener('play', this._onPlay);
      this.video.removeEventListener('pause', this._onPause);
    },
    onPlay() {
      this.setNextStop();
      console.log("playing");
    },
    onPause() {
      this.clearTimer();
      console.log("paused");
    },
    clearTimer() {
      if (this._timer) {
        clearTimeout(this._timer);
      }
    },
    setNextStop() {
      let next = this.stops.nextStop(this.video.currentTime);
      this.stopAt(next);
    },
    stopAt(time) {
      this.clearTimer();
      let currentTime = this.video.currentTime;
      if (currentTime < time) {
        this._timer = setTimeout(() => {
          this.video.pause();
          this.video.currentTime = time;
        }, (time - currentTime) * 1000);
      }
    }
  }
});
