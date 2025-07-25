import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import type { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};
