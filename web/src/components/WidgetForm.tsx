export function WidgetForm() {
    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2em)] md:w-auto">
            <header>
                <span className="text-xl leading-6">Deixe seu FeedBack</span>
            </header >
            <p>Hello World!</p>
            <footer className="text-xs text-neutral-400">
                Feito com ♥︎ by <a target={"_blank"} href="https://github.com/isaacyukiotb" className="underline underline-offset-2">Isaac Yukio</a>
            </footer>
        </div>
    );
}