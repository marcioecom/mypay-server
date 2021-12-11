import crypto from "crypto"
import { resolve } from "path"
import dayjs from "dayjs"
import { sign } from "jsonwebtoken"
import { prisma } from "../../infra/database/prisma"
import { mailConfig } from "../../infra/mail/client"
import { SendMail } from "../sendMail/SendMail"

class RequestResetPassword {
  async execute(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) throw new Error("User not exists")

    const token = sign({
      email: user.email,
      id: user.id
    }, process.env.SECRET, {
      expiresIn: "15m"
    })

    const variables = {
      name: user.name,
      userId: user.id,
      token,
      link: process.env.APP_URL
    };

    const templatePath = resolve(__dirname, '..', '..', 'views', 'mails', 'resetPassword.hbs')

    const mailClient = new SendMail(mailConfig)

    mailClient.execute({
      to: user.email,
      subject: "Password Reset Request",
      variables,
      path: templatePath
    })

    return 'Email sent'
  }
}

export { RequestResetPassword }
