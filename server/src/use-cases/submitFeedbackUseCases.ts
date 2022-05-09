import { type } from "os";
import { EmailAdapter } from "../adapters/emailAdapter";
import { FeedbackRepository } from "../repositories/feedbackRepositories";

interface SubmitFeedbackUseCaseRequest {
    type: string,
    comment: string,
    screenshot?: string
}

export class SubmitFeedbackUseCase {

    private FeedbackRepository;
    private EmailAdapter;

    constructor(
        FeedbackRepository: FeedbackRepository,
        EmailAdapter: EmailAdapter
        ) {
        this.FeedbackRepository = FeedbackRepository
        this.EmailAdapter = EmailAdapter;
    }

    async execute(request: SubmitFeedbackUseCaseRequest) {

        if(!request.type){
            throw new Error('Type is require.')
        }

        if(!request.comment){
            throw new Error('Comment is require.')
        }

        if(request.screenshot && !request.screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format.')
        }

        await this.FeedbackRepository.create(request);

        await this.EmailAdapter.SendMail({
            subject:'Novo Feedback',
            body:[
                `<div style= "font-family:sans-serif; font-size: 16px; color:#111";>`,
                `<p>Tipo do feedback: ${request.type}</p>`,
                `<p>Comentario: ${request.comment}</p>`,
                request.screenshot ? `<img src= "${request.screenshot}"/>`:``,
                `</div>`,
            ].join('\n')
        })

    }
}