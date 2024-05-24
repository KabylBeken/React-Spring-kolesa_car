import Header from './header';
import NotFound404 from './Error';
import ProductSpring from './Product';
import CreateJava from './Create';
import LoginForm from './login';
import RegisterForm from './Register';
import Prod from './Prod';
import Edit from './Update';
import CreateCat from './CreateCat';
import Category from './Category';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Header />,
        errorElement: <NotFound404 />,
        children: [
            {
                path: '/prod',
                element: <Prod />,
            },
            {
                path: '/addproduct',
                element: <CreateJava />
            },
            {
                path: '/product',
                element: <ProductSpring />
            },
            {
                path: '/category',
                element: <Category />
            }
        ]
    },
    {
        path: '/login',
        element: <LoginForm />
    },
    {
        path: '/register',
        element: <RegisterForm />
    },
    {
        path: '/CreateCat',
        element: <CreateCat />
    },
    {
        path: '/update/:prodId',
        element: <Edit />
    }
]);

export default function App() {
    return <RouterProvider router={router} />;
}
