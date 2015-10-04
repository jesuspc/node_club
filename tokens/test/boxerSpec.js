var assert = require('assert');

var subject = require('../boxer')();

describe('Boxer', function() {
  describe('#box', function() {
    it('returns an empty object when no dependencies', function(){
      assert.deepEqual(subject.box(), {});
    });

    it('returns a box of dependencies when dependencies', function() {
      var box;

      subject.set('a1', function(){ return 'a1'; });
      subject.set('a2.b1', function(){ return 'a2.b1'; });
      subject.set('a3.b2.c1', function(){ return 'a3.b2.c1'; });
      subject.set('a3.b2.c2', function(){ return 'a3.b2.c2'; });

      box = subject.box();

      assert.deepEqual(box.a1(), 'a1');
      assert.deepEqual(box.a2.b1(), 'a2.b1');
      assert.deepEqual(box.a3.b2.c1(), 'a3.b2.c1');
      assert.deepEqual(box.a3.b2.c2(), 'a3.b2.c2');
    });
  });
});
