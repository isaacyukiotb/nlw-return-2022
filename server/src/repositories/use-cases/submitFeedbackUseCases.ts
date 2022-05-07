import { EmailAdapter } from "../../adapters/emailAdapter";
import { FeedbackRepository } from "../feedbackRepositories";

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
        await this.FeedbackRepository.create(request);

        await this.EmailAdapter.SendMail({
            subject:'Novo Feedback',
            body:[
                `<div style= "font-family:sans-serif; font-size: 16px; color:#111";>`,
                `<p>Tipo do feedback: ${request.type}</p>`,
                `<p>Comentario: ${request.comment}</p>`,
                `</div>`,
            ].join('\n')
        })

    }
}