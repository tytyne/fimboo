process.env.NODE_ENV = 'test';

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/index.js";

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

it('double done', function(done) {
    // Calling `done()` twice is an error
    setImmediate(done);
  });