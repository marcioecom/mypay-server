import { Request, Response } from "express";
import { ShowProfileInfo } from "./ShowProfileInfo";

class ShowProfileInfoController {
  async handle(req: Request, res: Response) {
    const { userId } = req;

    const showProfileInfo = new ShowProfileInfo();

    try {
      const profileInfo = await showProfileInfo.execute(userId);

      return res.json(profileInfo)
    } catch (err: any) {
      return res.json({
        error: true,
        message: err.message
      })
    }
  }
}

export { ShowProfileInfoController }
