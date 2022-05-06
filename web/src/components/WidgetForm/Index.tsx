import { useState } from "react";

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'

import { FeedbackContentStep } from "./steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./steps/FeedbackSuccessStep";
import { FeedbackTypeStep } from "./steps/FeedbackTypeStep";



export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lâmpada'
        }
    },
    THOUGHT: {
        title: 'Outros',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de um balão de ideia'
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {

    const [feedBackType, setFeedBackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleFeedbackRestart() {
        setFeedbackSent(false);
        setFeedBackType(null);
    }


    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2em)] md:w-auto">

            {feedbackSent ? (
                <FeedbackSuccessStep 
                onFeedbackRestartRequested={handleFeedbackRestart}
                />
            ) : (
                <>
                    {!feedBackType ?
                        (
                            <FeedbackTypeStep onFeedbackTypeChanged={setFeedBackType} />
                        )
                        :
                        <FeedbackContentStep
                            onFeedbackRestartRequested={handleFeedbackRestart}
                            feedbackType={feedBackType}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    }
                </>
            )
            }



            <footer className="text-xs text-neutral-400">
                Feito com ♥︎ by <a target={"_blank"} href="https://github.com/isaacyukiotb" className="underline underline-offset-2">Isaac Yukio</a>
            </footer>

        </div>
    );
}