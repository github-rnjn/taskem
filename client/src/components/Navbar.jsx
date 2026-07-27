import { useSelector } from "react-redux";

export default function Navbar() {

    const user = useSelector(
        state => state.auth.user
    );

    return (

        <nav className="border-b bg-white">

            <div className="mx-auto flex h-16 items-center justify-between px-6">

                <h1 className="text-2xl font-bold">

                    Taskem

                </h1>

                <div className="font-medium">

                    {user?.name}

                </div>

            </div>

        </nav>

    );

}