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
          id: {
            type: 'number',
            description: 'Ride identification number',
            example: 1,
          },
          startLatitude: {
            type: 'number',
            description: 'Start latitude',
            example: 41.40338,
          },
          startLongitude: {
            type: 'number',
            description: 'Start longitude',
            example: 2.17403,
          },
          endLatitude: {
            type: 'number',
            description: 'End latitude',
            example: 41.40338,
          },
          endLongitude: {
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
            description: 'Driver\'s Vehicle',
            example: 'Van',
          },
          createdAt: {
            type: 'string',
            description: 'Created date',
          },
          updatedAt: {
            type: 'string',
            description: 'Updated date',
          },
        },
      },
      RideInput: {
        type: 'object',
        properties: {
          startLatitude: {
            type: 'number',
            description: 'Start latitude',
            example: 41.40338,
          },
          startLongitude: {
            type: 'number',
            description: 'Start longitude',
            example: 2.17403,
          },
          endLatitude: {
            type: 'number',
            description: 'End latitude',
            example: 41.40338,
          },
          endLongitude: {
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
            description: 'Driver\'s Vehicle',
            example: 'Van',
          },
        },
      },
    },
  },
};
