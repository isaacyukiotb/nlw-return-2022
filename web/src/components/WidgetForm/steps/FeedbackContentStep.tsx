import { ArrowLeft } from "phosphor-react";
import { CloseButton } from "../../CloseButton";
import { FeedbackType, feedbackTypes } from "../Index";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
}

export function FeedbackContentStep(props: FeedbackContentStepProps) {

    const feedbackTypeInfo = feedbackTypes[props.feedbackType];

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

            <form className="my-4 w-full ">
                <textarea 
                className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                placeholder="Conte com detalhes o que está acontecendo..."
                />
            </form>
            
        </>
    )
}