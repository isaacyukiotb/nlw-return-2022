import { useState } from "react";
import { CloseButton } from "./CloseButton";


import bugImageUrl from '../assets/bug.svg'
import ideaImageUrl from '../assets/idea.svg'
import thoughtImageUrl from '../assets/thought.svg'
import { FeedbackTypeStep } from "./WidgetForm/steps/FeedbackTypeStep";



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

export type feedBackType = keyof typeof feedbackTypes;

export function WidgetForm() {

    const [feedBackType, setFeedBackType] = useState<feedBackType | null>(null);


    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2em)] md:w-auto">

            <header>
                <span className="text-xl leading-6">Deixe seu FeedBack</span>
                <CloseButton />
            </header >
            {!feedBackType ?
                (
                   <FeedbackTypeStep onFeedbackTypeChanged={setFeedBackType}/>
                )
                :
                <p>Hello World!</p>
            }


            <footer className="text-xs text-neutral-400">
                Feito com ♥︎ by <a target={"_blank"} href="https://github.com/isaacyukiotb" className="underline underline-offset-2">Isaac Yukio</a>
            </footer>

        </div>
    );
}