//importar express
import express from 'express';
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import { apiValidator } from "./core/middlewares/schema-validator.middleware";
import { createTResult } from './core/mappers/tresult.mappers';
import userRoute from './routes/user.route';
import gameRoute from './routes/game.route';
import deviceRoute from './routes/device.route';

// Crear una nueva instancia de express
const app = express();

// Definir el puerto
const PORT = 3000;

app.use([express.json(),  helmet(), cors()])

app.use(
  "/swagger",
  swaggerUi.serve,
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const swaggerDocument = YAML.load("./swagger.yaml");
    const swaggerUiHandler = swaggerUi.setup(swaggerDocument);
    swaggerUiHandler(req, res, next);
  }
);
app.use(apiValidator());

app.use("/users", userRoute);
app.use("/games", gameRoute);
app.use("/devices", deviceRoute);

// Crear una ruta
app.get('/', (req, res) => {
  res.send('Hola mundo!');
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res
      .status(err.status || 500)
      .json(createTResult<any>(null, [err.message, err.errors]));
  }
);

// Iniciar el servidor
app.listen(PORT, () => {
   console.log(`Servidor en el puerto: ${PORT}`);
});
