import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";
import server from "../../src/index";
import statusCode from "../../src/utils/statusCode";
import customMessage from "../../src/utils/customMessage";
import errorMessage from "../../src/utils/errorMessage"
import mockData from "../data/user.mock"

dotenv.config();

chai.use(chaiHttp);
chai.should();
let token1;
let token2;
const{user1,userTest}=mockData
const { created, ok, conflict,serverError,badRequest,notFound,unAuthorized} = statusCode;
const { signedup,accountVerified,resend,userVerification,loggedin} = customMessage;
const{emailAssociate,thisAccountVerified,emailOrUsernameNotFound,accountNotVerified,emailOrPasswordNotFound,accountNotActivated,duplicateEmail}=errorMessage

const employee1 = {
  email: "employee@example.com",
  password: "tytyne12345",
};
const employee = {
    email: "employee@example.com",
    password: "tytyne12345",
  };
// const user1={
//   firstname: "Duncan",
//   lastname: "warrior",
//   email: "klf89416@cuoly.com",
//   password: "Password1!",
//   username: "warrior2"
// };

const employee2 = {
  email: "trial@example.com",
  password: "tytyne12345",
};

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
  });

  it("should be able to confirm a user",done=>{
    chai.request(server).get(`/api/v1/user/confirmation/${token1}`).send()
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
    .send({email:"trial@example.com"}) 
    .end((err,res)=>{
      const {message, token } = res.body;
      expect(res.status).to.equal(ok);
      expect(message);
      expect(message).to.equal(resend);
      expect(token).to.a("string");
      done();
    });
  });
  it("should not resend confirmation email if user is already verified",done=>{
    chai.request(server).post(`/api/v1/user/resend`)
    .send({email:"trial@example.com"}) 
    .end((err,res)=>{
      const {message, token } = res.body;
      expect(res.status).to.equal(ok);
      expect(message);
      expect(message).to.equal(resend);
      expect(token).to.a("string");
      done();
    });
  });

  it("should not to confirm a user if token is wrong",done=>{
    chai.request(server).get(`/api/v1/user/confirmation/${token2}`).send()
    .end((err,res)=>{
      const {error} = res.body;
      expect(res.status).to.equal(serverError);
      expect(error);
      done();
    });
  });

    it("should not be able to resend confirmation email when do not exist",done=>{
      chai.request(server).post(`/api/v1/user/resend`)
      .send({email:  "orny@example.com"}) 
      .end((err,res)=>{
        const {  error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        done();
      });
  });
  it("should not be able to resend confirmation email is already verified",done=>{
    chai.request(server).post(`/api/v1/user/resend`)
    .send({email:  "employee@example.com"}) 
    .end((err,res)=>{
      const {  error } = res.body;
      expect(res.status).to.equal(badRequest);
      expect(error).to.equal(thisAccountVerified)
      expect(error);
      done();
    });
});

  it("Should fail if email is not verified in the database", (done) => {
    chai.request(server)
      .post("/api/v1/user/login")
      .send(employee2)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(unAuthorized);
        expect(error);
        expect(error).to.equal("Your account has not been verified");
        done();
      });  
  });
  it('login a user', (done) => {
    chai.request(server)
      .post('/api/v1/user/login')
      .send(employee)
      .end((err, res) => {
          console.log(res)
        const { token, message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        // expect(message).to.equal("You signed up successfully");
        expect(token).to.a("string");
        done();
      });
  });

  it("Should not succeed if password is missing", (done) => {
    chai.request(server)
      .post("/api/v1/user/login")
      .send({ email: "evalopb@gmail.com" })
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        done();
  });
});
  it("Should not succeed if email is missing", (done) => {
    chai.request(server)
      .post("/api/v1/user/login")
      .send({ password: "M03000jdh" })
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        done();
  });
});
it("Should not create a user if he exists", (done) => {
  chai
    .request(server)
    .post("/api/v1/user/signup")
    .send(user1)
    .end((err,res)=>{
      const { error } = res.body;
        expect(res.status).to.equal(conflict);
        expect(error);
        expect(error).to.equal(duplicateEmail);
        done();
    });
});
it("Shouldn't signup user if email is an integer due to validation error", (done) => {
  chai
    .request(server)
    .post("/api/v1/user/signup")
    .send(userTest)
    .end((err, res) => {
      const { message } = res.body;
      expect(res.status).to.equal(badRequest);
      expect(message);
      expect(message).to.equal("This is not a valid email address format");
      done();
    });
});

});
