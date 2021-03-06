process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP_ENV = process.env.NODE_ENV || "development";

import * as dotenv from "dotenv";

dotenv.config({
  path: `${__dirname}/../config/${process.env.APP_ENV}.env`,
});

import express = require("express");
import { loadControllers } from "awilix-express";
import loadContainer from "./container";

const app: express.Application = express();

app.use(express.json());

loadContainer(app);

app.use(loadControllers("controllers/*.ts", { cwd: __dirname }));

export { app };
