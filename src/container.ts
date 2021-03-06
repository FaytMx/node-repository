import express = require("express");
import { createContainer, asClass } from "awilix";
import { scopePerRequest } from "awilix-express";
import { TestService } from "./services/test.service";
import { SubscriptionMySQLRepository } from "./services/repositories/impl/mysql/subscription.repository";
import { SubscriptionService } from "./services/subscription.service";
import { MovementMySQLRepository } from "./services/repositories/impl/mysql/movement.repository";
import { BalanceMysqlRepository } from "./services/repositories/impl/mysql/balance.repository";
import { MovementService } from "./services/movement.service";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (app: express.Application) => {
  const container = createContainer({
    injectionMode: "CLASSIC",
  });

  container.register({
    //repositories
    subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
    movementRepository: asClass(MovementMySQLRepository).scoped(),
    balanceRepository: asClass(BalanceMysqlRepository).scoped(),

    //services
    subscriptionService: asClass(SubscriptionService).scoped(),
    movementService: asClass(MovementService).scoped(),
    testService: asClass(TestService).scoped(),
  });

  app.use(scopePerRequest(container));
};
