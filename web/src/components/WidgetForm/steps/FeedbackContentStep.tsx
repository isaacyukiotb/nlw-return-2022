import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";
import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { CloseButton } from "../../CloseButton";
import { FeedbackType, feedbackTypes } from "../Index";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent:() => void;
}


export function FeedbackContentStep(props: FeedbackContentStepProps) {

    const [comment, setComment] = useState('');
    const [screenshot, setScreenshot] = useState<string | null>(null)

    const feedbackTypeInfo = feedbackTypes[props.feedbackType];


    function handleSubmitFeedback(event:FormEvent){

        event.preventDefault();
        
        console.log({
            submit:{
                comentario:comment,
                foto:screenshot
            }
        })

        props.onFeedbackSent();
    }

    return (
        <>

            <header>

                <button onClick={props.onFeedbackRestartRequested} type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
                    <ArrowLeft weight="bold" className="w-5 h-5" />
                </button>

                <span className=" text-xl marker:leading-6 flex items-center gap-2 ">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className='w-6 h-6' />
                    {feedbackTypeInfo.title}
                </span>

                <CloseButton />

            </header >

            <form className="my-4 w-full " onSubmit={handleSubmitFeedback}>
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={(event) => setComment(event.target.value)}
                />

                <footer className="flex gap-2 mt-2">

                    <ScreenshotButton
                        onScreenshotTook={setScreenshot}
                        screenshot={screenshot}
                    />

                    <button
                        type="submit"
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                        disabled={comment.length === 0} 
                    >
                        Enviar
                    </button>
                </footer>
            </form>

        </>
    )
}