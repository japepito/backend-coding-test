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
      200: {
        description: 'Ride created successfully',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                $ref: '#/components/schemas/Ride',
              },
            },
          },
        },
      },
      500: {
        description: 'Internal server error',
      },
    },
  },
};
