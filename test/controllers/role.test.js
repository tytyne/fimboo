import mocha from "mocha";
import chai, { expect } from "chai";
import chaiHttp from 'chai-http';
import server from "../../src/index";
import statusCode from "../../src/utils/statusCode";
import customMessage from "../../src/utils/customMessage";
import errorMessage from "../../src/utils/errorMessage"
import mockData from "../data/user.mock"


chai.use(chaiHttp);
chai.should();
let token1;
let token2;
const{user1,userTest}=mockData
const { created, ok, conflict,serverError,badRequest,notFound,unAuthorized} = statusCode;
const { signedup,accountVerified,resend,userVerification,loggedin} = customMessage;
const{emailAssociate,thisAccountVerified,emailOrUsernameNotFound,accountNotVerified,emailOrPasswordNotFound,accountNotActivated,duplicateEmail}=errorMessage

const employee= {
    email: "employee@example.com",
    password: "tytyne12345",
  };
const admin = {
  email: 'admin@example.com',
  password: 'tytyne1234',
};
const permission = 'get_roles';

let adminToken = '';
let employeeToken = '';
let id = '';


describe('Roles/', () => {
  it('It should not allow unauthenticated  user  to access roles operations ', (done) => {
    chai.request(server)
      .get('/api/v1/roles')
      .end((err, response) => {
        response.should.have.status(401);
        done();
      });
  });
  it('login employee', (done) => {
    chai.request(server)
      .post('/api/v1/user/login')
      .send(employee)
      .end((err,res)=>{
        const {token,message} = res.body;
        employeeToken=token;
        expect(res.status).to.equal(ok);
        expect(message);
        // expect(message).to.equal("You signed up successfully");
        expect(token).to.a("string");
        done();
      });
  });
  it('It should not allow  user rather than superAdmin or other authorized user  to access roles opperations', (done) => {
    chai.request(server)
      .get('/api/v1/roles')
      .set('authorization', employeeToken)
      .set('permission_name', permission)
      .end((err, response) => {
        response.should.have.status(401);
        done();
      });
  });
  it('login admin', (done) => {
    chai.request(server)
      .post('/api/v1/user/login')
      .send(admin)
      .end((err,res)=>{
        const {token,message} = res.body;
        adminToken=token;
        expect(res.status).to.equal(ok);
        expect(message);
        // expect(message).to.equal("You signed up successfully");
        expect(token).to.a("string");
        done();
      });
  });
  it('It should  allow   superAdmin  to access roles', (done) => {
    chai.request(server)
      .get('/api/v1/roles')
      .set('authorization', adminToken)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it('It should not allow  user rather than superAdmin or other authorized user  to access roles operations', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .set('authorization', employeeToken)
      .set('permission_name', permission)
      .end((err, response) => {
        response.should.have.status(401);
        done();
      });
  });
  it('It should  allow   superAdmin  to save new roles', (done) => {
    chai.request(server)
      .post("/api/v1/roles/save")
      .send({ name: "Givehug",description:"giving hug" })
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data)
        id = res.body.data.id;
        done();
      });
  });
  it('It should  not allow  superAdmin  to save another role if name arleady exists', (done) => {
    chai.request(server)
      .post("/api/v1/roles/save")
      .send({ name: "Givehug",description:"giving more hugs" })
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('It should  allow   superAdmin  to get role by id', (done) => {
    chai.request(server)
      .get(`/api/v1/roles/findById/${id}`)
      .set('authorization', adminToken)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it('It should  allow   superAdmin  to update role by id', (done) => {
    chai.request(server)
      .put(`/api/v1/roles/update/${id}`)
      .send({description:"Giving kisses" })
      .set('authorization', adminToken)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it('It should  allow   superAdmin  to delete role by id', (done) => {
    chai.request(server)
      .delete(`/api/v1/roles/delete/${id}`)
      .set('authorization', adminToken)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
