import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import UserForm from 'views/pages/userForm';
// import UserForm from 'views/pages/userForm';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const AuthForgotPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword3')));
const Verifyotp = Loadable(lazy(() => import('views/pages/authentication/authentication3/verifyotp')));
const Resetpassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/resetpassword')));
const UpdatePassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/UpdatePassword')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <AuthLogin3 />
        },
        {
            path: '/register',
            element: <AuthRegister3 />
        },
        {
            path: '/forgotpassword',
            element: <AuthForgotPassword3 />
        },
        {
            path: '/verifyotp',
            element: <Verifyotp />
        },
        {
            path: '/resetpassword',
            element: <Resetpassword />
        },
        {
            path: '/updatepassword',
            element: <UpdatePassword />
        },
        {
            path: '/userform/:id',
            element: <UserForm />
        }
    ]
};

export default AuthenticationRoutes;
