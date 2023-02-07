import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });
  // describe('GET /users', () => {
  // it('should return empty array', (done) => {
  // valid user detail
  it('validuserdetailwillreturnstatuscode', (done) => {
    const user = {
      "firstname": "Neeraj",
      "lastname": "Yadav",
      "email": "neeraj@gmail.com",
      "password": "Shashank@123"
    }
    request(app)
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
  // invlid first name
  it('invaliduserdetailwillreturnstatuscode', (done) => {
    const user = {
      "firstname": "Naj",
      "lastname": "Yadav",
      "email": "neeraj@gmail.com",
      "password": "Shashank@123"
    }
    request(app)
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        // expect(res.body.data).to.be.an('object');
        done();
      });
  });
  // invlid password
  it('invaliduserPasswordwillreturnstatuscode', (done) => {
    const user = {
      "firstname": "Neeraj",
      "lastname": "Yadav",
      "email": "neeraj@gmail.com",
      "password": "Shashank"
    }
    request(app)
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        // expect(res.body.data).to.be.an('object');
        done();
      });
  });
  // login user
  var token;
  it('Validloginwillreturnstatuscode', (done) => {
    const user = {
      "email": "neeraj@gmail.com",
      "password": "Shashank@123"
    }
    request(app)
      .post('/api/v1/users/login')
      .send(user)
      .end((err, res) => {
        token = res.body.data;
        expect(res.statusCode).to.be.equal(202);
        // expect(res.body.data).to.be.an('object');
        done();
      });
  });

  // invalid email
  it('inValidloginwillreturnstatuscode', (done) => {
    const user = {
      "email": "neer@gmail.com",
      "password": "Shashank@123"
    }
    request(app)
      .post('/api/v1/users/login')
      .send(user)
      .end((err, res) => {
        token = res.body.data;
        expect(res.statusCode).to.be.equal(500);
        // expect(res.body.data).to.be.an('object');
        done();
      });
  });
  // invalid password
  it('Invalid password', (done) => {
    const user = {
      "email": "neeraj@gmail.com",
      "password": "Shasha@123"
    }
    request(app)
      .post('/api/v1/users/login')
      .send(user)
      .end((err, res) => {
        token = res.body.data;
        expect(res.statusCode).to.be.equal(500);
        // expect(res.body.data).to.be.an('object');
        done();
      });
  });

  // Create note
  var id;
  it('Creating Note', (done) => {
    const user = {
      "title": "Shashank",
      "description": "ShashanklShashanklShashanklShashanklShashankl"
    }
    request(app)
      .post('/api/v1/note')
      .set('authorization', `Bearer ${token}`)
      .send(user)
      .end((err, res) => {
        id = res.body.data.id;
        expect(res.statusCode).to.be.equal(202);
        // expect(res.body.data).to.be.an('object');
        done();
      });
  });
});
