import { createRoot } from 'react-dom/client'
import "./index.css"
import 'swiper/swiper.css'
import { RouterProvider } from "react-router-dom"
import router from "./router";
import UserInfoStore from './store/index.ts'
import {Provider} from "react-redux";



createRoot(document.getElementById('root')!).render(
    <Provider store={UserInfoStore}>
        <RouterProvider router={router}>
        </RouterProvider>
    </Provider>
)
