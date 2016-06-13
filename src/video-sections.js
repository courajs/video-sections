xtag.register('video-sections', {
  lifecycle: {
    created() {
      this._onPlay = this.onPlay.bind(this);
      this._onPause = this.onPause.bind(this);

      this.video = document.createElement('video');
      this.video.controls = true;
      this.video.muted = true;
      this.appendChild(this.video);

      this.registerListeners();
    }
  },
  accessors: {
    src: {
      attribute: {},
      get() {
        return this.video.src;
      },
      set(src) {
        this.video.src = src;
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
      console.log("playing");
    },
    onPause() {
      console.log("paused");
    }
  }
});
