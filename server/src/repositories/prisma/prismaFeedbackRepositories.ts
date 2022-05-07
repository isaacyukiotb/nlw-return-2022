import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../feedbackRepositories";


export class PrismaFeedbackRepository implements FeedbackRepository {
    async create(data: FeedbackCreateData) { 

        await prisma.feedback.create({

        data: {
            type:data.type,
            comment:data.comment,
            screenshot:data.screenshot,
        }

        });
    }
    
}