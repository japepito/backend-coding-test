module.exports = {
  get: {
    tags: ['Rides'],
    description: 'Get rides',
    operationId: 'getRides',
    parameters: [
      {
        name: 'limit',
        in: 'query',
        schema: {
          type: 'number',
          description: 'Allowed number of returned rides',
          example: 10,
        },
      },
      {
        name: 'page',
        in: 'query',
        schema: {
          type: 'number',
          description: 'Current page',
          example: 1,
        },
      },
    ],
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
