export default class Stops {
  constructor(stops) {
    this.stops = stops;
  }

  nextStop(time) {
    return this.stops.find(stop => stop > time);
  }
}
