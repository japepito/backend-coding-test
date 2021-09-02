const START_LAT_LONG_ERROR = {
  error_code: 'VALIDATION_ERROR',
  message:
    'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
};
const END_LAT_LONG_ERROR = {
  error_code: 'VALIDATION_ERROR',
  message:
    'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
};
const RIDER_NAME_ERROR = {
  error_code: 'VALIDATION_ERROR',
  message: 'Rider name must be a non empty string',
};
const DRIVER_NAME_ERROR = {
  error_code: 'VALIDATION_ERROR',
  message: 'Driver name must be a non empty string',
};
const DRIVER_VEHICLE_ERROR = {
  error_code: 'VALIDATION_ERROR',
  message: 'Driver vehicle must be a non empty string',
};
const VALIDATION_ERROR_CODE = 'VALIDATION_ERROR';

module.exports = {
  VALIDATION_ERROR_CODE,
  START_LAT_LONG_ERROR,
  END_LAT_LONG_ERROR,
  RIDER_NAME_ERROR,
  DRIVER_NAME_ERROR,
  DRIVER_VEHICLE_ERROR,
};
