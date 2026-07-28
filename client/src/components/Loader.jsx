export default function Loader({
    text = "Loading...",
    fullScreen = false,
}) {
    return (
        <div
            className={`flex flex-col items-center justify-center gap-4 ${
                fullScreen
                    ? "min-h-screen"
                    : "py-16"
            }`}
        >
            <div className="relative h-14 w-14">

                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>

                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>

            </div>

            <p className="text-gray-500 font-medium animate-pulse">
                {text}
            </p>
        </div>
    );
}