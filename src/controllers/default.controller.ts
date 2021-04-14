import { Request, Response } from "express";
import { GET, route } from "awilix-express";
import { TestService } from "../services/test.service";

@route("/")
export class DefaultController {
  constructor(private readonly testService: TestService) {}

  @GET()
  public index(_req: Request, res: Response): void {
    res.send("Running...");
  }
}
