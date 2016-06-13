xtag.register('video-sections', {
  lifecycle: {
    created() {
      this.video = document.createElement('video');
      this.video.controls = true;
      this.video.muted = true;
      this.appendChild(this.video);
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
  }
});
