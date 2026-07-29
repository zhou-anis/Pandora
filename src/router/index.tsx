import {createBrowserRouter} from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/loading/Index.tsx";

const LayOut = lazy(() => import('../views/layout'))
const Destination = lazy(() => import('../views/destination/Index.tsx'))
const DestinationDetail = lazy(() => import('../views/destination/Detail.tsx'))
const Home = lazy(() => import('../views/home/Index.tsx'))
const Hotel = lazy(() => import('../views/hotel/Index.tsx'))
const HotelDetail = lazy(() => import('../views/hotel/Detail.tsx'))
const Flight = lazy(() => import('../views/flight/Index.tsx'))
const Strategy = lazy(() => import('../views/strategy/Index.tsx'))
const StrategyDetail = lazy(() => import('../views/strategy/Detail.tsx'))
const SignUp = lazy(() => import('../views/register/UserSignUp.tsx'))
const SignIn = lazy(() => import('../views/register/UserSignIn.tsx'))
const Diary = lazy(() => import('../views/diary/Index.tsx'))
const UserProfile = lazy(() => import('../views/user/Profile.tsx'))
const CreatorCenter = lazy(() => import('../views/user/CreatorCenter.tsx'))




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
            },
            {
                path: '/destination/:id',
                element: (
                    <Suspense fallback={<Loading></Loading>}>
                        <DestinationDetail></DestinationDetail>
                    </Suspense>
                )
            },
            {
                path: '/hotel',
                element: (
                    <Suspense fallback={<Loading></Loading>}>
                        <Hotel></Hotel>
                    </Suspense>
                )
            },
            {
                path: '/flight',
                element: (
                    <Suspense fallback={<Loading></Loading>}>
                        <Flight></Flight>
                    </Suspense>
                )
            },
            {
                path: '/hotel/:id',
                element: (
                    <Suspense fallback={<Loading></Loading>}>
                        <HotelDetail></HotelDetail>
                    </Suspense>
                )
            },
            {
                path: '/strategy',
                element: (
                    <Suspense fallback={<Loading></Loading>}>
                        <Strategy></Strategy>
                    </Suspense>
                )
            },
            {
                path: '/strategy/:id',
                element: (
                    <Suspense fallback={<Loading></Loading>}>
                        <StrategyDetail></StrategyDetail>
                    </Suspense>
                )
            },
            {
                path: '/user/profile',
                element: (
                    <Suspense fallback={<Loading></Loading>}>
                        <UserProfile></UserProfile>
                    </Suspense>
                )
            },
            {
                path: '/user/creator',
                element: (
                    <Suspense fallback={<Loading></Loading>}>
                        <CreatorCenter></CreatorCenter>
                    </Suspense>
                )
            },
        ]
    },
    {
        path: '/diary',
        element: (
            <Suspense fallback={<Loading></Loading>}>
                <Diary></Diary>
            </Suspense>
        )
    },
    {
        path: "/signup",
        element: (<Suspense fallback={<Loading></Loading>}>
            <SignUp></SignUp>
        </Suspense>)
    },
    {
        path: "/signin",
        element: (<Suspense fallback={<Loading></Loading>}>
            <SignIn></SignIn>
        </Suspense>)
    },

]);


export default router;