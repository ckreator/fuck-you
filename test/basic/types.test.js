const fuck = require('../..');
// setup should from chai
const { expect } = require('chai');

describe('literal functions', () => {
  it('should be able to create numbers', done => {
    const res = fuck().assign.z.num(10).stfu.you;
    expect(res).to.be.an('object');
    expect(res.z).to.equal(10);

    done();
  });

  it('should be able to create strings', done => {
    const res = fuck().assign.z.str('hello').stfu.you;
    expect(res).to.be.an('object');
    expect(res.z).to.equal('hello');

    done();
  });

  it('should be able to create objects', done => {
    const orig = { a: 5, b: 'whad' };
    const res = fuck().assign.z.obj(orig).stfu.you;
    expect(res).to.be.an('object');
    expect(res.z).to.deep.equal(orig);

    done();
  });

  it('should be able to create arrays', done => {
    const orig = [1, true, 'three'];
    const res = fuck().assign.z.obj(orig).stfu.you;
    expect(res).to.be.an('object');
    expect(res.z).to.deep.equal(orig);

    done();
  });
  it('should be able to create booleans', done => {
    const orig = true;
    const res = fuck().assign.z.bool(true).stfu.you;
    expect(res).to.be.an('object');
    expect(res.z).to.equal(orig);

    done();
  });
});
