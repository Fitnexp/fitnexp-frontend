import { useNavigate } from 'react-router-dom';

function ErrorPage({ url }: { readonly url: string }) {
    const navigate = useNavigate();
    return (
        <section className="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
                <div className="mx-auto flex max-w-screen-sm flex-col gap-4 text-center">
                    <h1 className="dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl">
                        Oops...
                    </h1>
                    <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                        Something went wrong
                    </p>
                    <button
                        className="mx-auto w-fit rounded bg-slate-700 px-4 py-2 text-white"
                        onClick={() => navigate(url)}
                    >
                        Bring me back!
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ErrorPage;
