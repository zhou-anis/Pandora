import httpInstance from "../utils/request.ts";
import type IResponse from "../store/reducers/general_response_type";



/**
* 获取轮播图的信息api
*/

export interface ISwiper {
    title: string;
    cover_img: string;
}


const getSwiper = async () => {
    const res = await httpInstance.get<IResponse<ISwiper[]>>('/swiper');
    return res.data;
}


export default getSwiper;







