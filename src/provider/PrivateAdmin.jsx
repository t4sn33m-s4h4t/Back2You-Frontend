import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const PrivateAdmin = ({ children }) => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    
    const { data: currentUser } = useQuery({
        queryKey: ['currentUser', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
        },
    });

    const location = useLocation();

    if (currentUser && currentUser.role === 'admin') {
        return children;
    }

    if (loading) {
        return <div className="flex justify-center items-center"><span className="loading loading-spinner loading-lg text-info min-h-screen"></span></div>;
    }

    return (
        <div>
            return <Navigate state={location.pathname} to='/'></Navigate>
        </div>
    );
};

export default PrivateAdmin;