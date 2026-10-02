import swaggerJsdoc from "swagger-jsdoc";
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema de pilotos da MotoGP",
      version: "1.0.0",
      description: "Sistema de pilotos da MotoGP, com autenticação via token Bearer",
    },
    servers: [
      {
        url: "http://localhost:9393",
        description: "Servidor local"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description: "Informe o token no formato: Bearer TOKEN",
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
export default swaggerDocs;