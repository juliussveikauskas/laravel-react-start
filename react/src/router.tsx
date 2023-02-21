import {createBrowserRouter, Navigate} from "react-router-dom";

import Register from "./views/register"
import Users from "./views/users"
import Login from "./views/login";
import NotFound from "./views/notFound";
import DefaultLayout from "./components/defaultLayout";
import GuestLayout from "./components/guestLayout";
import Dashboard from "./views/dashboard";
import UserForm from "./views/user-form";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/users" />,
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/users/create',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/update/:id',
                element: <UserForm key="userUpdate"/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    },
])


export default router;
