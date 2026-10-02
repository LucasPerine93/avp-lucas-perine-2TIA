import express from "express";
import "dotenv/config.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./src/config/swagger.js";
import pilotosRoutes from "./src/routes/pilotosRoutes.js";

const app = express();
const port = 9393;

const link = `http://localhost:${port}`;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/pilotos", pilotosRoutes);

app.listen(port, () => {
  console.log(`Servidor online em ${link}`);
});