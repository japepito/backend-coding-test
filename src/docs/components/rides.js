module.exports = {
  components: {
    schemas: {
      RideId: {
        type: 'number',
        description: 'An id of a ride',
        example: 1,
      },
      Ride: {
        type: 'object',
        properties: {
          rideID: {
            type: 'number',
            description: 'Ride identification number',
            example: 1,
          },
          startLat: {
            type: 'number',
            description: 'Start latitude',
            example: 41.40338,
          },
          startLong: {
            type: 'number',
            description: 'Start longitude',
            example: 2.17403,
          },
          endLat: {
            type: 'number',
            description: 'End latitude',
            example: 41.40338,
          },
          endLong: {
            type: 'number',
            description: 'End longitude',
            example: 2.17403,
          },
          riderName: {
            type: 'string',
            description: 'Rider name',
            example: 'John Doe',
          },
          driverName: {
            type: 'string',
            description: 'Driver name',
            example: 'John Doe',
          },
          driverVehicle: {
            type: 'string',
            description: 'Drivers Vehicle',
            example: 'Van',
          },
          created: {
            type: 'string',
            description: 'Created date',
          },
        },
      },
      RideInput: {
        type: 'object',
        properties: {
          start_lat: {
            type: 'number',
            description: 'Start latitude',
            example: 41.40338,
          },
          start_long: {
            type: 'number',
            description: 'Start longitude',
            example: 2.17403,
          },
          end_lat: {
            type: 'number',
            description: 'End latitude',
            example: 41.40338,
          },
          end_long: {
            type: 'number',
            description: 'End longitude',
            example: 2.17403,
          },
          rider_name: {
            type: 'string',
            description: 'Rider name',
            example: 'John Doe',
          },
          driver_name: {
            type: 'string',
            description: 'Driver name',
            example: 'John Doe',
          },
          driver_vehicle: {
            type: 'string',
            description: 'Drivers Vehicle',
            example: 'Van',
          },
        },
      },
    },
  },
};
