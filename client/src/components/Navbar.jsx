import { Link } from "react-router-dom";

export default function Navbar() {

    return (

        <nav className="flex gap-4 p-4 border-b">

            <Link to="/dashboard">
                Dashboard
            </Link>

            <Link to="/tasks">
                Tasks
            </Link>

            <Link to="/categories">
                Categories
            </Link>

            <Link to="/profile">
                Profile
            </Link>

        </nav>

    );

}