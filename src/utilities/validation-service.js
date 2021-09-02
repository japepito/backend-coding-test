const {
  START_LAT_LONG_ERROR,
  END_LAT_LONG_ERROR,
  RIDER_NAME_ERROR,
  DRIVER_NAME_ERROR,
  DRIVER_VEHICLE_ERROR,
} = require('../constants/validation-errors-constants');

module.exports = {
  createRideValidation(params) {
    const {
      startLatitude,
      startLongitude,
      endLatitude,
      endLongitude,
      riderName,
      driverName,
      driverVehicle,
    } = params;

    if (
      startLatitude < -90 ||
      startLatitude > 90 ||
      startLongitude < -180 ||
      startLongitude > 180
    ) {
      return START_LAT_LONG_ERROR;
    }

    if (
      endLatitude < -90 ||
      endLatitude > 90 ||
      endLongitude < -180 ||
      endLongitude > 180
    ) {
      return END_LAT_LONG_ERROR;
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
      return RIDER_NAME_ERROR;
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
      return DRIVER_NAME_ERROR;
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
      return DRIVER_VEHICLE_ERROR;
    }
  },
};
