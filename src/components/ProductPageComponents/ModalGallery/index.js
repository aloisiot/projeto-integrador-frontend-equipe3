import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { XiconOrange } from "../../icons";
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.scss'
import { useSelector } from "react-redux";
import { selectCurrentProduct } from "../../../app/store/currentProductSlice";


export default function ModalGallery({modalStatus, modalFunction }) {


    const product = useSelector(selectCurrentProduct)


    return (
        <div className={`modal-bkg ${modalStatus ? "modal-visible" : ""}`}>
            <Container className="modal-main">
            <div className="close-btn">
                        <button onClick={modalFunction}>{XiconOrange}</button>
            </div>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        spaceBetween={1}
                        pagination={{ type: 'fraction' }}
                    >
                    {product?.images?.map((img) => {
                        return (
                        <SwiperSlide key={`slide-${img.id}`}>
                            <div className="img-modal-holder">
                                <img className="rounded" src={img.url} alt={img.title}></img>
                            </div>
                        </SwiperSlide>
                            )
                        })}
                    </Swiper>
            </Container>
        </div>
    )
}