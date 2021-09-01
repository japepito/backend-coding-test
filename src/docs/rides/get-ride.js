module.exports = {
  get: {
    tags: ['Rides'],
    description: 'Get a ride',
    operationId: 'getRide',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/RideId',
        },
        required: true,
        description: 'A single ride id',
      },
    ],
    responses: {
      200: {
        description: 'Ride obtained successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Ride',
            },
          },
        },
      },
    },
  },
};
