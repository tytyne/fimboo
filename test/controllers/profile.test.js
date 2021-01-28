import mocha from 'mocha';
import chai, { expect } from "chai";
import chaiHttp from 'chai-http';
import server from "../../src/index";
import statusCode from "../../src/utils/statusCode";
import customMessage from "../../src/utils/customMessage";
import errorMessage from "../../src/utils/errorMessage"



chai.use(chaiHttp);
chai.should();

const { created, ok, conflict, serverError, badRequest, notFound, unAuthorized } = statusCode;
const { signedup, accountVerified, resend, userVerification, loggedin } = customMessage;
const { emailAssociate, thisAccountVerified, emailOrUsernameNotFound, accountNotVerified, emailOrPasswordNotFound, accountNotActivated, duplicateEmail } = errorMessage

const employee = {
  email: "employee@example.com",
  password: "tytyne12345",
};
const admin = {
  email: 'admin@example.com',
  password: 'tytyne1234',
};

const permission = 'get_all_profiles';
let stateTrue= 'true'
let stateFalse=false
let adminToken = '';
let employeeToken = '';
let token1 = '';
let id = '';
const updatedInfo = {
  firstname: "ella",
  lastname:"ines",
  birthdate: "12/22/2019",
  gender: "male",
  preferredLanguage: "English",
  location: "Kigali Rwanda"

};

describe('user profile/', () => {
  it('It should not allow unauthenticated  user  to edit the profile ', (done) => {
    chai.request(server)
      .get('/api/v1/user/profile/me')
      .end((err, response) => {
        response.should.have.status(403);
        done();
      });
  });
  it('login employee', (done) => {
    chai.request(server)
      .post('/api/v1/user/login')
      .send(employee)
      .end((err, res) => {
        const { token, message } = res.body;
        employeeToken = token;
        token1 = token
        expect(res.status).to.equal(ok);
        expect(message);
        // expect(message).to.equal("You signed up successfully");
        expect(token).to.a("string");
        done();
      });
  });
  it('It should get my profile ', (done) => {
    chai.request(server)
      .get('/api/v1/user/profile/me')
      .set("Authorization", `Bearer ${token1}`)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it('It should not allow  user rather than superAdmin to view all profiles', (done) => {
    chai.request(server)
      .get('/api/v1/user/profile/all')
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
      .end((err, res) => {
        const { token, message, data } = res.body;
        adminToken = token;
        id = data.id
        expect(res.status).to.equal(ok);
        expect(message);
        // expect(message).to.equal("You signed up successfully");
        expect(token).to.a("string");
        done();
      });
  });
  it('It should  allow   a user to edit his/her profile', (done) => {
    chai.request(server)
      .patch('/api/v1/user/update/profile')
      .field('firstname', updatedInfo.firstname)
      .field('lastname', updatedInfo.lastname)
      .field('birthdate', updatedInfo.birthdate)
      .field('gender', updatedInfo.gender)
      .field('preferredLanguage', updatedInfo.preferredLanguage)
      .set("Authorization", `Bearer ${token1}`)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  // it('user should be able to update his/her profile with a profile photo and cover photo', async () => {
  //   const result = await chai
  //     .request(server)
  //     .put('/api/v1/user/update/profile')
  //     .field('firstname', updatedInfo.firstname)
  //     .field('lastname', updatedInfo.lastname)
  //     .field('birthdate', updatedInfo.birthdate)
  //     .field('gender', updatedInfo.gender)
  //     .field('preferredLanguage', updatedInfo.preferredLanguage)
  //     .field('location', updatedInfo.location)
  //     .set("Authorization", `Bearer ${token1}`)
  //   result.should.have.status(200);
    
  // });


  it('It should  allow   superAdmin  to get all profiles', (done) => {
    chai.request(server)
      .get('/api/v1/user/profile/all')
      .set('authorization', adminToken)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it('It should  allow   superAdmin  to get profile by id', (done) => {
    chai.request(server)
      .get(`/api/v1/user/view/profile/${id}`)
      .set('authorization', adminToken)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('It should not allow  user rather than superAdmin to view profile by id', (done) => {
    chai.request(server)
      .get(`/api/v1/user/view/profile/${id}`)
      .set('authorization', employeeToken)
      .end((err, response) => {
        response.should.have.status(401);
        done();
      });
  });
  it('It should change password ', (done) => {
    chai.request(server)
      .post('/api/v1/user/change_password')
      .set("Authorization", `Bearer ${token1}`)
      .send({ oldPassword: "tytyne12345", newPassword: "blacklist123", confirmPassword: "blacklist123" })
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it('It should not change password if old password is incorrect ', (done) => {
    chai.request(server)
      .post('/api/v1/user/change_password')
      .set("Authorization", `Bearer ${token1}`)
      .send({ oldPassword: "tytyne1234", newPassword: "blacklist123", confirmPassword: "blacklist12" })
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });
  it('It should not change password due to password length ', (done) => {
    chai.request(server)
      .post('/api/v1/user/change_password')
      .set("Authorization", `Bearer ${token1}`)
      .send({ oldPassword: "tytyne12345", newPassword: "blacklist123", confirmPassword: "blacklist12" })
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });

  it('user should be able to set if whether user wants his/her profile to be remembered on his next travel equest initiation', (done) => {
    chai.request(server)
      .post(`/api/v1/user/profile/rememberMe/${stateTrue}`)
      .set("Authorization", `Bearer ${token1}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property('message', 'your profile will be remembered on your next request initiation');
        done();
      });
  })


  it('user should be able to set whether they do not want their profile  to be remembered on their next request', (done) => {
    chai.request(server)
      .post(`/api/v1/user/profile/rememberMe/${stateFalse}`)
      .set("Authorization", `Bearer ${token1}`)
      .send()
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property('message', 'your profile will not be remembered on your next request initiation');
        done();
      });
  });


})
