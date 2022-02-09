import { sign } from "jsonwebtoken";

class GenerateToken {
  async execute(userId: string) {
    const token = sign({}, process.env.SECRET, {
      subject: userId,
      expiresIn: "1d",
    });

    return token;
  }
}

export { GenerateToken }
