const swaggerAutogen = require('swagger-autogen')();
const doc = {
      info: {
        version: "1.0.0",
        title: "API Documentation",
        description: "Detailed API Information",
        contact: {
          name: "Francoise"
        },
    },
        host: "ebuwork.herokuapp.com",
        schemes: ['https'],
    };

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/routeServer.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)
