import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination} from 'swiper';
import './style.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { selectCurrentProduct } from '../../../../app/store/slices/currentProductSlice';
import { useSelector } from 'react-redux';


export default function MobileGallery(){

    const product = useSelector(selectCurrentProduct)


    return(
        <div>
            <div className="container mobile-swiper-container">
                <Swiper
                modules={[Pagination]}
                pagination={{type: 'fraction'}}
                >
                    {product?.images?.map?.((img)=>{
                        return(
                        <SwiperSlide key ={`slide-${img.id}`} >
                            <img className="mobile-swipe-img" src={img.url} alt={img.title}></img>
                        </SwiperSlide>
                        )
                    })}
    
                </Swiper>
            </div>
        </div>
    )
}