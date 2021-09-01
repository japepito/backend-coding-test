module.exports = {
  get: {
    tags: ['Rides'],
    description: 'Get rides',
    operationId: 'getRides',
    parameters: [],
    responses: {
      200: {
        description: 'Rides obtained successfully',
        content: {
          'application/json': {
            schema: {
              allOf: [
                {
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        $ref: '#/components/schemas/Ride',
                      },
                    },
                  },
                },
                {
                  properties: {
                    totalCount: {
                      type: 'number',
                    },
                    page: {
                      type: 'number',
                    },
                    limit: {
                      type: 'number',
                    },
                  },
                },
              ],
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
