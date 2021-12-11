import fs from "fs"
import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import handlebars from "handlebars";
import mailConfig from "../../infra/mail/client";

interface IMailParams {
  to: string;
  from?: string;
  subject: string;
  variables: object;
  path: string;
}

class SendMail {
  private client: Transporter
  constructor() {
    const transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass
      }
    } as unknown as SMTPTransport.Options)
    this.client = transporter
  }

  async execute({
    to,
    from = "no-reply@app.com",
    subject,
    variables,
    path
  }: IMailParams) {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const mailTemplateParse = handlebars.compile(templateFileContent)

    const html = mailTemplateParse(variables);

    this.client.sendMail({
      to,
      from,
      subject,
      html
    })
  }
}

export { SendMail }
