import {createBrowserRouter} from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/loading/Index.tsx";

const LayOut = lazy(() => import('../views/layout'))
const Destination = lazy(() => import('../views/destination/Index.tsx'))
const Home = lazy(() => import('../views/home/Index.tsx'))



const router = createBrowserRouter([
    {
        path: "/",
        element: (<Suspense fallback={<Loading></Loading>}>
            <LayOut></LayOut>
        </Suspense>),
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={<Loading></Loading>}>
                        <Home></Home>
                    </Suspense>
                )
            },
            {
                path: '/destination',
                element: (
                    <Suspense fallback={<Loading></Loading>}>
                        <Destination></Destination>
                    </Suspense>
                )
            }
        ]
    },

]);


export default router;