import { assert } from 'chai';
import Stops from '../lib/stops';

describe('Stops', function() {
  describe('#nextStop(time)', function () {
    it('returns null when there are no stops after `time`', function () {
      var stops = new Stops([1, 2, 3]);

      assert.equal(stops.nextStop(4), null);
    });

    it('returns the next stop time', function() {
      var stops = new Stops([1, 2, 3]);

      assert.equal(stops.nextStop(1.5), 2);
    });

    it('returns the next stop when given exactly a stop', function() {
      var stops = new Stops([1, 2, 3]);

      assert.equal(stops.nextStop(1), 2);
    });
  });
});
