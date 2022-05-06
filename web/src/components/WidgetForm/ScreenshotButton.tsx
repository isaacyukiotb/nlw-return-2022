import html2canvas from "html2canvas";
import { backgroundPosition } from "html2canvas/dist/types/css/property-descriptors/background-position";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
    screenshot: string | null;
    onScreenshotTook: (image: string | null) => void;
}

export function ScreenshotButton(props: ScreenshotButtonProps) {

    const [isTakeScreenshot, setIsTakeScreenshot] = useState(false)

    async function handleTakeScreenshot() {

        setIsTakeScreenshot(true);

        const canvas = await html2canvas(document.querySelector('html')!);
        const base64image = canvas.toDataURL('image/png');

        props.onScreenshotTook(base64image);

        setIsTakeScreenshot(false);
    }

    if (props.screenshot) {
        return (
            <button
                type="button"
                className="p-1 w-10 h-10 rounded-md border-transparent flex items-end justify-end text-zinc-400 hover:text-zinc-100 transition-colors"
                onClick={() => props.onScreenshotTook(null)}
                style={{
                    backgroundImage:`URL(${props.screenshot})`,
                }} 
            >
                <Trash />

            </button>
        )
    }

    return (

        <button
            type="button"
            onClick={handleTakeScreenshot}
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
        >
            {isTakeScreenshot ? <Loading /> : <Camera className="text-zinc-100 w-6 h-6" />}
        </button>



    )
}