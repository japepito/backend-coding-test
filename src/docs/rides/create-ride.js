module.exports = {
  post: {
    tags: ['Rides'],
    description: 'Create ride',
    operationId: 'createRide',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/RideInput',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Ride created successfully',
      },
      500: {
        description: 'Internal server error',
      },
    },
  },
};
