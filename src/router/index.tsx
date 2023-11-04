import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import NotFound from '../components/Layouts/NotFound';
import { routes } from './routes';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>,
    };
});

// Ketika tidak ada route yang sesuai
finalRoutes.push({
    path: '*',
    element: <NotFound />, 
});

const router = createBrowserRouter(finalRoutes);

export default router;
