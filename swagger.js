const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',  // Versión de la especificación OpenAPI
        info: {
            title: 'API de Ejemplo',  // Título de la API
            version: '1.0.0',  // Versión
            description: 'Una API de ejemplo para demostrar Swagger en Node.js',  // Descripción
        },
    },
    apis: ['./routes/*.js'], // Rutas de los archivos donde se encuentra la documentación JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
