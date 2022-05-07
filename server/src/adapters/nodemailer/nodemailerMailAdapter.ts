import { EmailAdapter, SendMailData } from "../emailAdapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "895f1a84718250",
        pass: "e0240c935d96b4"
    }
});

export class NodemailerMailAdapter implements EmailAdapter{
    async SendMail(data: SendMailData){
        await transport.sendMail({
            from:"Equipe Feedback<feedback@gmail.com>",
            to:"Isaac Yukio <isaacyukio@gmail.com>",
            subject:data.subject,
            html:data.body
        })
    }
}