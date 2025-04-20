import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F4F7FC]">
            <div className="text-center">
                <h1 className="text-8xl font-bold text-emerald-500 animate-bounce">404</h1>
                <p className="mt-4 text-3xl font-semibold text-[#333333]">Страница не найдена</p>
                <p className="mt-2 text-lg text-[#555555]">Извините, но мы не можем найти запрашиваемую страницу.</p>

                <Link 
                    href="/sign-in" 
                    className="mt-6 inline-block px-8 text-white py-4 text-lg font-semibold  bg-emerald-500 rounded hover:bg-emerald-600 transition duration-300 transform hover:scale-105"
                >
                    Вернуться на страницу входа
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
