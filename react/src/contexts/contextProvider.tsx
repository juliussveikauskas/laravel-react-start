import {createContext, useContext, useMemo, useState} from "react";
import {User} from "../entities/user";

interface ContextValue {
    currentUser: User;
    token: string | null;
    notification: string | null;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    setNotification: (note: string) => void;
}

const StateContext = createContext<ContextValue>({
    currentUser: {name: ''},
    token: '',
    notification: null,
    setUser: (user: User) => null,
    setToken: (token: string) => null,
    setNotification: (note: string) => null
})


// @ts-ignore
export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setNotification = (message:string) => {
        // @ts-ignore
        _setNotification(message);
        setTimeout(() => {
            _setNotification(null)
        }, 2000)
    }

    const setToken = (token: string) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const contextValue = useMemo(
        () => ({
            currentUser: user,
            token,
            setUser,
            setToken,
            notification,
            setNotification,
        }),
        [user, token, setUser, setToken, notification, setNotification],
    );

    return (
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext)
