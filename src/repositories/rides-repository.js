const { db } = require('./index');

module.exports = {
  createRide(params) {
    const insertQuery =
      'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)';

    const selectQuery = 'SELECT * FROM Rides WHERE rideID = $id';

    return new Promise((resolve, reject) => {
      db.run(insertQuery, params, function (err) {
        if (err) {
          return reject(err);
        }

        db.all(selectQuery, { $id: this.lastID }, function (err, rows) {
          if (err) {
            reject(err);
          }
          resolve(rows);
        });
      });
    });
  },

  getAllRide(params) {
    const { limit, page } = params;

    const selectQuery = `SELECT * FROM Rides LIMIT(${limit}) OFFSET(${
      limit * (page - 1)
    })`;

    return new Promise((resolve, reject) => {
      db.all(selectQuery, function (err, rows) {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  },

  getRideById(params) {
    const { id } = params;

    const selectQuery = `SELECT * FROM Rides WHERE rideID = ${id}`;

    return new Promise((resolve, reject) => {
      db.all(selectQuery, function (err, rows) {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  },
};
