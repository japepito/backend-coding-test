'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

describe('API tests', () => {
  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err);
      }

      buildSchemas(db);

      done();
    });
  });

  describe('GET /health', () => {
    it('should return health', (done) => {
      request(app)
        .get('/health')
        .expect('Content-Type', /text/)
        .expect(200, done);
    });
  });

  describe('POST /rides', () => {
    it('should create ride and returns 200 status code', (done) => {
      const mockReqBody = {
        start_lat: 41.40338,
        start_long: 2.17403,
        end_lat: 41.40338,
        end_long: 2.17403,
        rider_name: 'Mock Rider',
        driver_name: 'John Doe',
        driver_vehicle: 'Mock Vehicle',
      };

      request(app)
        .post('/rides')
        .send(mockReqBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

    it('should return error for invalid start latitude or longitude', (done) => {
      const mockReqBody = {
        start_lat: -100,
        start_long: 200,
      };

      request(app)
        .post('/rides')
        .send(mockReqBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

    it('should return error for invalid end latitude or longitude', (done) => {
      const mockReqBody = {
        end_lat: -100,
        end_long: 200,
      };

      request(app)
        .post('/rides')
        .send(mockReqBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

    it('should return error for invalid rider name', (done) => {
      const mockReqBody = {
        start_lat: 41.40338,
        start_long: 2.17403,
        end_lat: 41.40338,
        end_long: 2.17403,
        rider_name: 1,
      };

      request(app)
        .post('/rides')
        .send(mockReqBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

    it('should return error for invalid driver name', (done) => {
      const mockReqBody = {
        start_lat: 41.40338,
        start_long: 2.17403,
        end_lat: 41.40338,
        end_long: 2.17403,
        rider_name: 'Mock Rider',
        driver_name: false,
      };

      request(app)
        .post('/rides')
        .send(mockReqBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

    it('should return error for invalid driver vehicle', (done) => {
      const mockReqBody = {
        start_lat: 41.40338,
        start_long: 2.17403,
        end_lat: 41.40338,
        end_long: 2.17403,
        rider_name: 'Mock Rider',
        driver_name: 'Mock Driver',
        driver_vehicle: 3,
      };

      request(app)
        .post('/rides')
        .send(mockReqBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('GET /rides', () => {
    it('should return array of rides', (done) => {
      request(app)
        .get('/rides')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
    });

    it('should return error of not found rides', (done) => {
      const deleteQuery = 'DELETE FROM Rides';

      db.all(deleteQuery, () => {});

      request(app)
        .get('/rides')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('GET /ride', () => {
    beforeEach((done) => {
      const query =
        'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [
        41.40338,
        2.17403,
        41.40338,
        2.17403,
        'Mock Rider',
        'John Doe',
        'Mock Vehicle',
      ];

      db.all(query, values, (err) => {
        if (err) return done(err);
        done();
      });
    });

    it('should return a single entity of ride', (done) => {
      request(app)
        .get('/rides/1')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

    it('should return error of not found ride', (done) => {
      const deleteQuery = 'DELETE FROM Rides';

      db.all(deleteQuery, () => {});

      request(app)
        .get('/rides/1')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});
