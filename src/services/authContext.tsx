"use client"
import { _getMe } from "@/services/services";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";


export interface LoggedInState {
    token?: string;
    isLoggedIn: boolean;
    user?: any
}

export interface ILoggedInContextType {
    loggedInState: LoggedInState;
    setLoggedInState: Dispatch<SetStateAction<LoggedInState>>;
    logout: () => void
}

export const LoggedInContext = createContext<ILoggedInContextType>(
    {} as ILoggedInContextType
)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const [loggedInState, setLoggedInState] = useState<LoggedInState>({
        isLoggedIn: false,
        token: '',
        user: {}
    })
    useEffect(() => {
        const token = Cookies.get('token')
        if (token && (!loggedInState.isLoggedIn || !loggedInState.user)) {
            try {
                const decodedToken = jwtDecode(token) ?? {};
                setLoggedInState({ isLoggedIn: true, token, user: decodedToken });
            } catch (error) {
                console.error("Invalid token:", error);
                Cookies.remove("token");
            }
        }

    }, [loggedInState.isLoggedIn, loggedInState.token])
    const logout = () => {
        Cookies.remove('token');
        setLoggedInState({ isLoggedIn: false, token: "", user: {} });
        router.push("/login");
    };
    const value: ILoggedInContextType = {
        loggedInState,
        setLoggedInState,
        logout
    }
    return (
        <LoggedInContext.Provider value={value}>
            {children}
        </LoggedInContext.Provider>
    )

}

export const useAuth = () => useContext(LoggedInContext);