'use client'

import { useAuth } from "@/services/authContext";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { loggedInState } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token')

        if (!token) {
            router.push("/login");
        }
    }, [router]);

    return <>{children}</>;
};

export default ProtectedRoute;