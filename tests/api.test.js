'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

describe('API tests', () => {
  let mockErrorResponse = {
    error_code: '',
    message: '',
  };

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
    after((done) => {
      db.serialize((err) => {
        if (err) return done(err);

        buildSchemas(db);
        done();
      });
    });

    it('should create ride and returns created data with 200 status code', (done) => {
      const mockReqBody = {
        start_lat: 41.40338,
        start_long: 2.17403,
        end_lat: 41.40338,
        end_long: 2.17403,
        rider_name: 'Mock Rider',
        driver_name: 'John Doe',
        driver_vehicle: 'Mock Vehicle',
      };

      let mockResponse = {
        startLat: 41.40338,
        startLong: 2.17403,
        endLat: 41.40338,
        endLong: 2.17403,
        riderName: 'Mock Rider',
        driverName: 'John Doe',
        driverVehicle: 'Mock Vehicle',
      };

      request(app)
        .post('/rides')
        .send(mockReqBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          mockResponse = Object.assign(mockResponse, res.body[0]);
        })
        .expect(200, [mockResponse], done);
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
        .expect((res) => {
          mockErrorResponse = Object.assign(mockErrorResponse, res.body);
        })
        .expect(200, mockErrorResponse, done);
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
        .expect((res) => {
          mockErrorResponse = Object.assign(mockErrorResponse, res.body);
        })
        .expect(200, mockErrorResponse, done);
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
        .expect((res) => {
          mockErrorResponse = Object.assign(mockErrorResponse, res.body);
        })
        .expect(200, mockErrorResponse, done);
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
        .expect((res) => {
          mockErrorResponse = Object.assign(mockErrorResponse, res.body);
        })
        .expect(200, mockErrorResponse, done);
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
        .expect((res) => {
          mockErrorResponse = Object.assign(mockErrorResponse, res.body);
        })
        .expect(200, mockErrorResponse, done);
    });

    it('should return internal server error', (done) => {
      const dropSchema = 'DROP TABLE IF EXISTS Rides';
      db.run(dropSchema, () => {});

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
        .expect((res) => {
          mockErrorResponse = Object.assign(mockErrorResponse, res.body);
        })
        .expect(200, mockErrorResponse, done);
    });
  });

  describe('GET /rides', () => {
    before((done) => {
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

      db.serialize(() => {
        db.all(query, values, (err) => {
          if (err) {
            return done(err);
          }
          done();
        });
      });
    });

    after((done) => {
      db.serialize((err) => {
        if (err) return done(err);

        buildSchemas(db);
        done();
      });
    });

    it('should return a paginate object of list of rides', (done) => {
      let mockDataResponse = {
        startLat: 41.40338,
        startLong: 2.17403,
        endLat: 41.40338,
        endLong: 2.17403,
        riderName: 'Mock Rider',
        driverName: 'John Doe',
        driverVehicle: 'Mock Vehicle',
      };

      const mockQueryParams = {
        limit: 1,
        page: 1,
      };

      request(app)
        .get('/rides')
        .query(mockQueryParams)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          mockDataResponse = Object.assign(mockDataResponse, res.body.data[0]);
        })
        .expect(
          200,
          {
            data: [mockDataResponse],
            totalCount: 1,
            limit: mockQueryParams.limit,
            page: mockQueryParams.page,
          },
          done
        );
    });

    it('should return error of not found rides', (done) => {
      const deleteQuery = 'DELETE FROM Rides';

      db.all(deleteQuery, () => {});

      request(app)
        .get('/rides')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          mockErrorResponse = Object.assign(mockErrorResponse, res.body);
        })
        .expect(200, mockErrorResponse, done);
    });

    it('should return internal server error', (done) => {
      const dropSchema = 'DROP TABLE IF EXISTS Rides';
      db.run(dropSchema, () => {});

      request(app)
        .get('/rides')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          mockErrorResponse = Object.assign(mockErrorResponse, res.body);
        })
        .expect(200, mockErrorResponse, done);
    });
  });

  describe('GET /ride', () => {
    let lastInsertedID = [];

    before((done) => {
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

      db.serialize(() => {
        db.run(
          query,
          values,
          function (err) {
            if (err) return done(err);
          },
          function () {
            lastInsertedID.push(this.lastID);
            done();
          }
        );
      });
    });

    it('should return a single entity of ride', (done) => {
      let mockDataResponse = {
        startLat: 41.40338,
        startLong: 2.17403,
        endLat: 41.40338,
        endLong: 2.17403,
        riderName: 'Mock Rider',
        driverName: 'John Doe',
        driverVehicle: 'Mock Vehicle',
      };

      request(app)
        .get(`/rides/${lastInsertedID[0]}`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          mockDataResponse = Object.assign(mockDataResponse, res.body[0]);
        })
        .expect(200, [mockDataResponse], done);
    });

    it('should return error of not found ride', (done) => {
      const deleteQuery = 'DELETE FROM Rides';

      db.all(deleteQuery, () => {});

      request(app)
        .get('/rides/1')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          mockErrorResponse = Object.assign(mockErrorResponse, res.body);
        })
        .expect(200, mockErrorResponse, done);
    });

    it('should return internal server error', (done) => {
      const dropSchema = 'DROP TABLE IF EXISTS Rides';
      db.run(dropSchema, () => {});

      request(app)
        .get('/rides/1')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          mockErrorResponse = Object.assign(mockErrorResponse, res.body);
        })
        .expect(200, mockErrorResponse, done);
    });
  });
});
