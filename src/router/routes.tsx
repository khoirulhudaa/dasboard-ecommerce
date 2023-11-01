import { lazy } from 'react';
const UpdateProduct= lazy(() => import('../pages/Product/updateProduct'));
const Index = lazy(() => import('../pages/Index'));
const Products = lazy(() => import('../pages/Product/productList'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const Profile = lazy(() => import('../pages/Users/profile'));
const SalesHistory = lazy(() => import('../pages/Product/salesHistory'));
const ForgotPassword = lazy(() => import('../pages/Authentication/forgotPassword'))
const SuccessSendEmail = lazy(() => import('../pages/notification/successSendEmail'))
const ResetPassword = lazy(() => import('../pages//Authentication/resetPassword'))

const routes = [
    {
        path: '/',
        element: <Index />,
    },
    {
        path: '/products',
        element: <Products />,
    },
    {
        path: '/history',
        element: <SalesHistory />,
    },
    {
        path: '/users/user-account-settings',
        element: <AccountSetting />,
    },
    {
        path: '/product/:product_id',
        element: <UpdateProduct />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/auth/signin',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/signup',
        element: <RegisterBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/forgot-password',
        element: <ForgotPassword />,
        layout: 'blank'
    },
    {
        path: '/auth/succes/sendEmailMessage',
        element: <SuccessSendEmail />,
        layout: 'blank'
    },
    {
        path: '/auth/reset-password/:token',
        element: <ResetPassword />,
        layout: 'blank'
    }
];

export { routes };
