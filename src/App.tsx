import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.tsx";
import Dashboard from "./pages/dashboard/Dashboard";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <>
                            <Navbar />
                            <Dashboard />
                        </>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default App;
