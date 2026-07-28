
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Tasks", path: "/tasks" },
  { name: "Categories", path: "/categories" },
  { name: "Profile", path: "/profile" },
];

export default function Navbar() {
  return (
    <nav className="bg-blue-950 shadow-md border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-4">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-white">
            TaskFlow
            </h1>

            {/* Navigation */}
            <div className="flex flex-col md:flex-row gap-2">
            {navItems.map((item) => (
                <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                        ? "bg-blue-600 text-white shadow"
                        : "text-white hover:bg-blue-100 hover:text-blue-600"
                    }`
                }
                >
                {item.name}
                </NavLink>
            ))}
            </div>
        </div>
    </nav>
  );
}