import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";
import server from "../../src/index";
import userMock from "../data/user.mock";
import statusCode from "../../src/utils/statusCode";
import customMessage from "../../src/utils/customMessage";

dotenv.config();

chai.use(chaiHttp);
chai.should();
let token1;
let token2;
const { created, ok, conflict,badRequest} = statusCode;
const{ signedup,duplicateEmail,accountVerified,resend, thisAccountVerified} = customMessage;
const { user1, user2, user3, user4 ,user7} = userMock;

describe("User Test", () => {
  it("Should create a user", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/signup")
      .send(user1)
      .end((err,res)=>{
        const {token,message} = res.body;
        token1=token;
        expect(res.status).to.equal(created);
        expect(message);
        expect(message).to.equal("You signed up successfully");
        expect(token).to.a("string");
        done();
      });
  }).timeout(6000);

  it("should be able to confirm a user",done=>{
    chai.request(server).post(`/api/v1/user/confirmation/${token1}`).send()
    .end((err,res)=>{
      const {message} = res.body;
      expect(res.status).to.equal(ok);
      expect(message);
      expect(message).to.equal(accountVerified);
      done();
    });
  });

  it("should be able to resend confirmation email",done=>{
    chai.request(server).post(`/api/v1/user/resend`)
    .send({email: "dusaflora1@example.com"}) 
    .end((err,res)=>{
      const {message, token } = res.body;
      expect(res.status).to.equal(ok);
      expect(message);
      expect(message).to.equal(resend);
      expect(token).to.a("string");
      done();
    });
  });
    it("should not be able to resend confirmation email when do not exist",done=>{
      chai.request(server).post(`/api/v1/user/resend`)
      .send({email: "user1@example.com"}) 
      .end((err,res)=>{
        const {  error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        expect(error).to.equal("we are unable to find a user with that email!");

        done();
      });
  });

  it("should not be able to resend confirmation email",done=>{
    chai.request(server).post(`/api/v1/user/resend`)
    .send({email: "fofo3@example.com"}) 
    .end((err,res)=>{
      const {  error } = res.body;
      expect(res.status).to.equal(badRequest);
      expect(error);
      expect(error).to.equal("This account has  already been verified.Please log In");

      done();
    });
});

  it("Should not create a user with an Existing Email", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/signup")
      .send(user1)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(conflict);
        expect(error);
        expect(error).to.equal(duplicateEmail);
        done();
      });
  });


});
