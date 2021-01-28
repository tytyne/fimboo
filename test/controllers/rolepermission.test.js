import mocha from 'mocha';
import chai, { expect } from "chai";
import chaiHttp from 'chai-http';
import server from "../../src/index";

chai.should();
chai.use(chaiHttp);

const employee= {
    email: "employee@example.com",
    password: "tytyne12345",
  };
const admin = {
  email: 'admin@example.com',
  password: 'tytyne1234',
};
const permission = 'get_rolepermission';

let adminToken = '';
let employeeToken = '';
let id = '';

describe('Rolepermissions/', () => {
  it('It should not allow unauthenticated  user  to access rolepermissions', (done) => {
    chai.request(server)
      .get('/api/v1/rolesPermissions')
      .end((err, response) => {
        response.should.have.status(401);
        done();
      });
  });
  it('login employee', (done) => {
    chai.request(server)
      .post('/api/v1/user/login')
      .send(employee)
      .end((err, res) => {
        const {token,message} = res.body;
        employeeToken=token;
        expect(res.status).to.equal(200);
        expect(message);
        expect(token).to.a("string");
        done();
      });
  });
  it('It should not allow  user rather than superAdmin or other authorized user  to access rolepermissions', (done) => {
    chai.request(server)
      .get('/api/v1/rolesPermissions')
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
        const {token,message} = res.body;
        adminToken=token;
        expect(res.status).to.equal(200);
        expect(message);
      
        expect(token).to.a("string");
        done();
      });
  });
  it('It should  allow   superAdmin  to access rolepermissions', (done) => {
    chai.request(server)
      .get('/api/v1/rolesPermissions')
      .set('authorization', adminToken)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it('It should  allow   superAdmin  to create new rolepermissions', (done) => {
    chai.request(server)
      .post('/api/v1/rolesPermissions/save')
      .send({
        role_id: '100',
        permission_id: '100',
      })
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data)
        id = res.body.data.id;
        done();
      });
  });
//   it('It should  allow   superAdmin  to update rolepermission by id', (done) => {
//     chai.request(server)
//       .put(`/api/v1/rolesPermissions/update/${id}`)
//       .send({
//         role_id: '100',
//         permission_id: '100',
//       })
//       .set('authorization', adminToken)
//       .end((err, response) => {
//         response.should.have.status(200);
//         done();
//       });
//   });
  it('It should  allow   superAdmin  to delete rolepermission by id', (done) => {
    chai.request(server)
      .delete(`/api/v1/rolesPermissions/delete/${id}`)
      .set('authorization', adminToken)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
