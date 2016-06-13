'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stops = function () {
  function Stops(stops) {
    _classCallCheck(this, Stops);

    this.stops = stops;
  }

  _createClass(Stops, [{
    key: 'nextStop',
    value: function nextStop(time) {
      return this.stops.find(function (stop) {
        return stop > time;
      });
    }
  }]);

  return Stops;
}();

if (typeof xtag === 'undefined') {
  throw new Error('<video-sections> depends on x-tag. Make sure you\'ve included the x-tag-core script before video-sections.js');
}

xtag.register('video-sections', {
  lifecycle: {
    created: function created() {
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
      set: function set(sections) {
        var times = sections.split(',').map(function (x) {
          return parseInt(x);
        });
        this.stops = new Stops(times);
        this.setNextStop();
      }
    }
  },
  methods: {
    registerListeners: function registerListeners() {
      this.video.addEventListener('play', this._onPlay);
      this.video.addEventListener('pause', this._onPause);
    },
    clearListeners: function clearListeners() {
      this.video.removeEventListener('play', this._onPlay);
      this.video.removeEventListener('pause', this._onPause);
    },
    onPlay: function onPlay() {
      this.setNextStop();
      console.log("playing");
    },
    onPause: function onPause() {
      this.clearTimer();
      console.log("paused");
    },
    clearTimer: function clearTimer() {
      if (this._timer) {
        clearTimeout(this._timer);
      }
    },
    setNextStop: function setNextStop() {
      var next = this.stops.nextStop(this.video.currentTime);
      this.stopAt(next);
    },
    stopAt: function stopAt(time) {
      var _this = this;

      this.clearTimer();
      var currentTime = this.video.currentTime;
      if (currentTime < time) {
        this._timer = setTimeout(function () {
          _this.video.pause();
          _this.video.currentTime = time;
        }, (time - currentTime) * 1000);
      }
    }
  }
});
