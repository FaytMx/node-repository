import { Request, Response } from "express";
import { DELETE, GET, POST, PUT, route } from "awilix-express";
import { SubscriptionService } from "../services/subscription.service";
import {
  SubscriptionCreateDto,
  SubscriptionUpdateDto,
} from "../dtos/subscription.dto";
import { BaseController } from "../common/controllers/base.controller";

@route("/subscriptions")
export class SubscriptionController extends BaseController {
  constructor(private readonly subscriptionService: SubscriptionService) {
    super();
  }

  @GET()
  public async all(_req: Request, res: Response): Promise<void> {
    try {
      res.send(await this.subscriptionService.all());
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route(":id")
  @GET()
  public async find(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const result = await this.subscriptionService.find(id);

      if (result) {
        res.send(result);
      } else {
        res.status(404);
        res.send();
      }
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @POST()
  public async store(req: Request, res: Response): Promise<void> {
    try {
      await this.subscriptionService.store({
        user_id: req.body.user_id,
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron,
      } as SubscriptionCreateDto);
      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route(":id")
  @PUT()
  public async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    try {
      await this.subscriptionService.update(id, {
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron,
      } as SubscriptionUpdateDto);
      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route(":id")
  @DELETE()
  public async remove(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    try {
      await this.subscriptionService.remove(id);
      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }
}
