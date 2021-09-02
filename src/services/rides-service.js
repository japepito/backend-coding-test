const ridesRepository = require('../repositories/rides-repository');
const { createRideValidation } = require('../utilities/validation-service');
const { NOT_FOUND_ERROR } = require('../constants/errors-constants');

module.exports = {
  async createRide(params) {
    const startLatitude = Number(params.start_lat) || undefined;
    const startLongitude = Number(params.start_long) || undefined;
    const endLatitude = Number(params.end_lat) || undefined;
    const endLongitude = Number(params.end_long) || undefined;
    const riderName = params.rider_name || '';
    const driverName = params.driver_name || '';
    const driverVehicle = params.driver_vehicle || '';

    const createValidation = createRideValidation({
      startLatitude,
      startLongitude,
      endLatitude,
      endLongitude,
      riderName,
      driverName,
      driverVehicle,
    });

    if (createValidation) {
      throw createValidation;
    }

    const queryValues = [
      startLatitude,
      startLongitude,
      endLatitude,
      endLongitude,
      riderName,
      driverName,
      driverVehicle,
    ];

    return ridesRepository.createRide(queryValues);
  },

  async getAllRide(params) {
    const { limit, page } = params;
    const defaultParams = {
      limit: Number(limit),
      page: Number(page),
    };

    const result = await ridesRepository.getAllRide(defaultParams);

    if (result.length === 0) {
      throw NOT_FOUND_ERROR;
    }

    return result;
  },

  async getRideById(id) {
    const defaultParams = {
      id: Number(id),
    };

    const result = await ridesRepository.getRideById(defaultParams);

    if (result.length === 0) {
      throw NOT_FOUND_ERROR;
    }

    return result;
  },
};
