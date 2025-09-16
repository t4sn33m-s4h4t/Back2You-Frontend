import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (user && user.email) {
        return children;
    }

    if (loading) {
        return <div className="flex justify-center items-center"><span className="loading loading-spinner loading-lg text-info min-h-screen"></span></div>;
    }

    return (
        <div>
            return <Navigate state={location.pathname} to='/auth/login'></Navigate>
        </div>
    );
};

export default PrivateRoute;