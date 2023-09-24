import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client'

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { peristor } from './store/store';

const Loading = () => {
    return (
        <div className='fixed left-0 top-0 w-screen h-screen bg-white text-blac flex items-center justify-center text-[16px] font-normal z-[9999999999999999]'>
            Loading....
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense>
            <Provider store={store}>
                <PersistGate loading={null} persistor={peristor}>
                    <Suspense fallback={<Loading />}>
                        <RouterProvider router={router} />
                    </Suspense>
                </PersistGate>
            </Provider>
        </Suspense>
    </React.StrictMode>
);

