import fs from "fs"
import { Transporter } from "nodemailer";
import handlebars from "handlebars";

interface IMailParams {
  to: string;
  from?: string;
  subject: string;
  variables: object;
  path: string;
}

class SendMail {
  constructor(private client: Transporter) { }

  async execute({ to, from = "no-reply@app.com", subject, variables, path }: IMailParams) {
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
