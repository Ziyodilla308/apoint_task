import { useAuth } from '../auth/useAuth';

const Navbar = () => {
    const { logout, user } = useAuth();

    return (
        <nav className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
            <h1 className="text-lg font-semibold">APoint</h1>
            <div className="flex items-center gap-4">
                <span>{user?.username}</span>
                <button
                    onClick={logout}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
