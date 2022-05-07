import  express  from "express";
import { prisma } from "./prisma";
import nodemailer from 'nodemailer'


export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "895f1a84718250",
      pass: "e0240c935d96b4"
    }
  });


routes.post('/feedbacks', async (req,res) =>{
    
    const feedback = await prisma.feedback.create({
        data:{
            type:req.body.type,
            comment:req.body.comment,
            screenshot:req.body.screenshot
        }
    })

    await transport.sendMail({
        from:"Equipe Feedback<feedback@gmail.com>",
        to:"Isaac Yukio <isaacyukio@gmail.com>",
        subject:"Novo Feedback",
        html:[
            `<div style= "font-family:sans-serif; font-size: 16px; color:#111";>`,
            `<p>Tipo do feedback: ${req.body.type}</p>`,
            `<p>Comentario: ${req.body.comment}</p>`,
            `</div>`,
        ].join('\n')
    })

        res.status(201).json({data:feedback})

})