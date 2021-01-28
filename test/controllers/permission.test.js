import mocha from 'mocha';
import chai, { expect } from "chai";
import chaiHttp from 'chai-http';
import server from "../../src/index";
import statusCode from "../../src/utils/statusCode";
import customMessage from "../../src/utils/customMessage";
import errorMessage from "../../src/utils/errorMessage"


chai.use(chaiHttp);
chai.should();

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

describe('Permissions/', () => {
  it('It should not allow unauthenticated  user  to access permissions operations ', (done) => {
    chai.request(server)
      .get('/api/v1/permissions')
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
  it('It should not allow  user rather than superAdmin or other authorized user  to access permissions opperations', (done) => {
    chai.request(server)
      .get('/api/v1/permissions')
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
  it('It should  allow   superAdmin  to save new permissions', (done) => {
    chai.request(server)
      .post('/api/v1/permissions/save')
      .send({ permissionName: "testperm",name:"test permission" })
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data)
        id = res.body.data.id;
        done();
      });
  });
  it('It should  allow   superAdmin  to get permissions', (done) => {
    chai.request(server)
      .get('/api/v1/permissions')
      .set('authorization', adminToken)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it('It should  allow   superAdmin  to get permissions by id', (done) => {
    chai.request(server)
      .get(`/api/v1/permissions/findById/${id}`)
      .set('authorization', adminToken)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it('It should  allow   superAdmin  to update permissions by id', (done) => {
    chai.request(server)
      .patch(`/api/v1/permissions/update/${id}`)
      .send({ name:"test perm 2" })
      .set('authorization', adminToken)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it('It should  allow   superAdmin  to delete permissions by id', (done) => {
    chai.request(server)
      .delete(`/api/v1/permissions/delete/${id}`)
      .set('authorization', adminToken)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
