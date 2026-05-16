const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lottery API',
      version: '1.0.0',
      description: 'API for Lottery Management System',
      contact: {
        name: 'API Support',
        email: 'support@lottery.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Lottery: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'ABC1234567' },
            username: { type: 'string', example: 'john_doe' },
            price: { type: 'number', example: 100 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        LotteryInput: {
          type: 'object',
          required: ['username', 'price'],
          properties: {
            username: { type: 'string', example: 'john_doe' },
            price: { type: 'number', example: 100, minimum: 1, maximum: 10000 },
          },
        },
        BulkSellInput: {
          type: 'object',
          required: ['username', 'price', 'quantity'],
          properties: {
            username: { type: 'string', example: 'john_doe' },
            price: { type: 'number', example: 100, minimum: 1, maximum: 10000 },
            quantity: { type: 'number', example: 10, minimum: 1, maximum: 100 },
          },
        },
        DrawInput: {
          type: 'object',
          required: ['count'],
          properties: {
            count: { type: 'number', example: 5, minimum: 1, maximum: 100 },
          },
        },
        Statistics: {
          type: 'object',
          properties: {
            totalLotteries: { type: 'number' },
            totalSales: { type: 'number' },
            totalWinners: { type: 'number' },
            averagePrice: { type: 'number' },
            priceDistribution: { type: 'object' },
            userDistribution: { type: 'object' },
            dateDistribution: { type: 'object' },
          },
        },
        Report: {
          type: 'object',
          properties: {
            period: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            totalSales: { type: 'number' },
            totalLotteries: { type: 'number' },
            totalWinners: { type: 'number' },
            averagePrice: { type: 'number' },
            topUsers: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  count: { type: 'number' },
                  totalPrice: { type: 'number' },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './app.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec };