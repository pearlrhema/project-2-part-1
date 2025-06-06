// const swaggerAutogen = require('swagger-autogen')();

// const doc = {
//   info: {
//     title: 'Items API',
//     description: 'API for managing items',
//   },
//   host: 'localhost:3000',
//   schemes: ['http', 'https'],
// };

// const outputFile = './swagger.json';
// const endpointsFiles = ['./routes/index.js']

// swaggerAutogen(outputFile, endpointsFiles, doc);

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Items & Utensils API',
    description: 'API for managing food items and utensils',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  tags: [
    { name: 'items', description: 'Endpoints for food items' },
    { name: 'utensils', description: 'Endpoints for utensils' }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
