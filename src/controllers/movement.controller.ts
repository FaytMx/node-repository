import { Request, Response } from "express";
import { GET, POST, route } from "awilix-express";
import { MovementService } from "../services/movement.service";
import { BaseController } from "../common/controllers/base.controller";
import { MovementCreateDto } from "../dtos/movement.dto";

@route("/movements")
export class MovementController extends BaseController {
  constructor(private readonly movementService: MovementService) {
    super();
  }

  @GET()
  public async all(_req: Request, res: Response): Promise<void> {
    try {
      res.send(await this.movementService.all());
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route(":id")
  @GET()
  public async find(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const result = await this.movementService.find(id);

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
      await this.movementService.store({
        type: req.body.type,
        user_id: req.body.user_id,
        amount: req.body.amount,
      } as MovementCreateDto);
      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }
}
