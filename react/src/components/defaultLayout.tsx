import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/contextProvider";
import {useEffect, useRef} from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const {currentUser, token, notification, setUser, setToken} = useStateContext();

    if (!token) {
        return <Navigate to="/login"/>
    }

    const onLogout = (ev: any) => {
        ev.preventDefault();

        axiosClient.post('/logout').then(() => {
            setUser({});
            setToken('');
        })
    }

    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setUser(data);
        })
    }, [])

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Daashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {currentUser.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>

            {notification &&
                <div className="notification">
                    {notification}
                </div>
            }
        </div>
    )
}
