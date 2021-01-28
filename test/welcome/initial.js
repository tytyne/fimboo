import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

it('double done', function(done) {
    // Calling `done()` twice is an error
    setImmediate(done);
  });


describe("Welcome to endPoints Testing", () => {
  it("Should return a message confirming api connection", (done) => {
    chai
      .request(server)
      .get("/api")
      .end((err, res) => {
        if (err) done(err);
        const { message } = res.body;
        expect(res.status).to.equal(200);
        expect(message);
        expect(message).to.equal("Well Connected api");
        done();
      });
  });
});
