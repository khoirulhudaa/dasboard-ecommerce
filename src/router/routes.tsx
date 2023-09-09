import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const Products = lazy(() => import('../pages/Product/productList'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
    },
    {
        path: '/products',
        element: <Products />,
    },
    {
        path: '/users/user-account-settings',
        element: <AccountSetting />,
    },
    {
        path: '/auth/boxed-signin',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-signup',
        element: <RegisterBoxed />,
        layout: 'blank',
    }
];

export { routes };
