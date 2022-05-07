import express from "express";
import nodemailer from 'nodemailer'
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailerMailAdapter";
import { PrismaFeedbackRepository } from "./repositories/prisma/prismaFeedbackRepositories";
import { SubmitFeedbackUseCase } from "./repositories/use-cases/submitFeedbackUseCases";


export const routes = express.Router();




routes.post('/feedbacks', async (req, res) => {

    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const prismaFeedbackRepositories = new PrismaFeedbackRepository();
    
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbackRepositories,
        nodemailerMailAdapter
    );

    submitFeedbackUseCase.execute({
        type: req.body.type,
        comment: req.body.comment,
        screenshot: req.body.screenshot
    })

    res.status(201).send();

    /*
        
    
    */


})