const fuck = require('../..');
// setup should from chai
const { expect } = require('chai');

describe('module property accessing', () => {
  it('should return itself if property access', done => {
    const initial = fuck();
    expect(initial).to.equal(initial.hello);

    done();
  });
  // minimal program:
  it('should be able to run minimal function `fuck().you` and return null', done => {
    // console.log("FUCK.you", fuck().you)
    expect(fuck().you).to.not.be.a('null'); // when the program ended it just returns 0, so you can't use it further
    // should return empty object:
    const empty = fuck().you;
    expect(Object.keys(empty).length).to.equal(0);
    done();
  });

  it('should be able to do some basic assignment', done => {
    const res = fuck({ x: 5, y: 10 }).assign.z.add.num(5).num(10).stfu.you;
    expect(res).to.be.an('object');
    expect(res.z).to.equal(15);

    done();
  });

  it('should be able to handle numbers', done => {
    const res = fuck({ x: 5, y: 10 }) // initialize a fuck
      .assign.z // start expression routine and store it into z
      .num(5).stfu // ‘stfu’ stands for ‘Shut the fuck up’ and it stops the last routine
      .you;

    expect(res).to.be.an('object');
    expect(res.z).to.not.be.a('null');
    expect(res.z).to.equal(5);
    done();
  });

  it('should be able to do multiple assignments', done => {
    const res = fuck({ x: 5, y: 10 }) // initialize a fuck
      .assign.z.num(5).stfu
      .assign.xyz.num(15).stfu
      .you;

    expect(res).to.be.an('object');
    expect(res.xyz).to.not.be.a('null');
    expect(res.xyz).to.equal(15);
    done();
  });

  it('should be able to do scope lookup', done => {
    const res = fuck() // initialize a fuck
      .assign.x.num(5).stfu
      .assign.z.x.stfu
      .you;

    expect(res).to.be.an('object');
    expect(res.z).to.not.be.a('null');
    expect(res.z).to.not.be.a('undefined');
    expect(res.z).to.equal(5);
    done();
  });

  it('should be able to do scope lookup from predefined context', done => {
    const res = fuck({ x: 5 }) // initialize a fuck
      .assign.z.x.stfu
      .you;

    expect(res).to.be.an('object');
    expect(res.z).to.equal(5);
    done();
  });

  it('should be able to do all arithmetic operations', done => {
    const initialX = 5;
    const res = fuck({ x: initialX }) // initialize a fuck
      .assign.a.add.x.x.stfu
      .assign.b.sub.a.x.stfu
      .assign.c.mult.a.b.stfu
      .assign.d.div.c.x.stfu
      .assign.e.mod.c.x.stfu
      .you;

    expect(res).to.be.an('object');
    expect(res.x).to.equal(initialX);
    expect(res.a).to.equal(initialX + initialX);
    expect(res.b).to.equal(res.a - initialX);
    expect(res.c).to.equal(res.b * res.a);
    expect(res.d).to.equal(res.c / initialX);
    expect(res.e).to.equal(res.c % initialX);
    done();
  });
});
