import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Layout } from '@/Layout';
import { Article } from '@/pages/Article';
import { Home } from '@/pages/Home';
import { Hotel } from '@/pages/Hotel';
import { ImportRoom } from '@/pages/ImportRoom';
import { Invites } from '@/pages/Invites';
import { Me } from '@/pages/Me';
import { News } from '@/pages/News';
import { NotFound } from '@/pages/NotFound';
import { Register } from '@/pages/Register';
import './app.css';

// dark or light as the system is, following it when it changes; the design swaps its colours on data-theme
const dark = matchMedia('(prefers-color-scheme: dark)');
const applyTheme = () => { document.documentElement.dataset.theme = dark.matches ? 'dark' : 'light'; };
applyTheme();
dark.addEventListener('change', applyTheme);

const queries = new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } } });

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'register', element: <Register /> },
            { path: 'me', element: <Me /> },
            { path: 'news', element: <News /> },
            { path: 'news/:id', element: <Article /> },
            { path: 'hotel', element: <Hotel /> },
            { path: 'staff/invites', element: <Invites /> },
            { path: 'staff/rooms/import', element: <ImportRoom /> },
            { path: '*', element: <NotFound /> },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queries}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>,
);
