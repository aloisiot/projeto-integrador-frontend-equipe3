import axios from 'axios';
import Template from "../../components/template/Layout";
import DesktopGallery from "../../components/ProductPageComponents/Gallery/DesktopGallery";
import MobileGallery from "../../components/ProductPageComponents/Gallery/MobileGallery";
import ModalGallery from "../../components/ProductPageComponents/ModalGallery";
import MapVisualizer from "../../components/ProductPageComponents/MapVisualizer";
import DetalhesCabecalho from "../../components/ProductPageComponents/DetalhesCabecalho";
import InformacoesCampo from "../../components/ProductPageComponents/InformacoesCampo";
import DateVisualizer from "../../components/ProductPageComponents/DateVisualizer";
import { useEffect, useState } from "react";
import { findCurrentProduct, selectCurrentProduct } from '../../app/store/slices/currentProductSlice'
import {
    Locale, StarIcon, emptyStar, heartIcon, shareIcon, tvIcon, wiFiIcon,
    kitchenIcon, noSmoke, noParty, shareIconMobile, acIcon, petsIcon, creditCard, fullFillHeartIcon
} from "../../components/icons";
import "./style.scss"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useAuth from '../../app/auth/useAuth';
import Swal from 'sweetalert2';

const iconCaracteristicas = {
    "icon-wifi": wiFiIcon,
    "icon-tv": tvIcon,
    "icon-cozinha": kitchenIcon,
    "icon-naoFume": noSmoke,
    "icon-semFesta": noParty,
    "icon-arCondicionado": acIcon,
    "icon-pets": petsIcon,
    "icon-credito": creditCard
}

function getGaleriaAtual() {
    return window.innerWidth >= 1024 ? "desktop" : "mobile"
}

export default function DetalhesReserva() {
    const { getUserId, getToken } = useAuth()
    const dispatch = useDispatch();
    const arrayTest = [StarIcon, StarIcon, StarIcon, emptyStar, emptyStar]
    const [modalAtivo, setModalAtivo] = useState(false)
    const [galeriaAtual, setGaleriaAtual] = useState(getGaleriaAtual())
    const { idReserva } = useParams()
    const product = useSelector(selectCurrentProduct)
    const [productIsFavorite, setProductIsFavorite] = useState(false)

    const currentProductIsFavorite = async (productId, requestConfig) =>  {
        const resp = await axios.get(`${process.env.REACT_APP_LINK_API}/clients/product-is-favorite/${productId}`, requestConfig)
        if(resp.status === 200){
            setProductIsFavorite(resp.data || false)
        }
    }

    useEffect(() => {
        if(product && getUserId()) {
            const config = {
                headers: {
                    Authorization: getToken()
                }
            }
            currentProductIsFavorite(product?.id, config)
        }
    }, [product, getToken, getUserId])

    const updateFavorite = async () => {
        const userId = getUserId()
        const token = getToken()
        if(userId && token) {
            const config = {
                headers: {
                    Authorization: token
                }
            }
            const body = {
                clientId: userId,
                productId: product?.id
            }
            await axios
                    .put(`${process.env.REACT_APP_LINK_API}/clients/favorite-products`, body, config)
                    .then(() => findCurrentProduct(idReserva))

            currentProductIsFavorite(product?.id, config)
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Você não está autenticado'
            })
        }
    }

    useEffect(() => {
        dispatch(findCurrentProduct(idReserva))
    }, [dispatch, idReserva])

    window.addEventListener("resize", () => {
        setGaleriaAtual(getGaleriaAtual)
    })

    return (
        <Template>
            <div className="component-paginaDetalhes">
                <ModalGallery modalStatus={modalAtivo} modalFunction={() => { setModalAtivo(false) }} />
                <DetalhesCabecalho product={product}/>
                <div className="detalhesSegundoCabecalho">
                    <div className="container d-flex justify-content-between align-items-center">
                        <div className="local-infobox">
                            {Locale}
                            <div>
                                <p>{product?.city?.name},</p>
                                <p>{product?.city?.country}</p>
                            </div>
                        </div>
                        <div className="avaliacoes-infobox">
                            <div className="avalicaoes-info align-items-center">
                                <div className="d-flex flex-column align-items-center">
                                    <p>Bom</p>
                                    <div className="div-estrelas">
                                        {arrayTest.map((star, i) =>
                                            <span key={i} className='stars'>{star}</span>
                                        )}
                                    </div>
                                </div>
                                <span className='num-avaliacao '>8</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container iconesContainer">
                        <button>{window.innerWidth < 520 ? shareIconMobile : shareIcon}</button>
                        <button onClick={() => updateFavorite()}>
                            {productIsFavorite ? fullFillHeartIcon : heartIcon}
                        </button>
                    </div>
                </div>
                {galeriaAtual === "desktop" ? <DesktopGallery modalFunction={() => { setModalAtivo(true) }} /> : <MobileGallery />}
                <div className="detalhesUltimoContainer">
                    <div className="container descricaoCampo">
                        <div>
                            <h3 className="py-3">Hospede-se em {product?.name}</h3>
                        </div>
                        <div>
                            <p>
                                {product?.description}
                            </p>
                        </div>
                    </div>
                    <div className="container opcoesCampo">
                        <div>
                            <h3 className="py-3 tituloSecundario">Características da reserva</h3>
                        </div>
                        <div className="separador-box">
                            <div className="separador"></div>
                        </div>
                        <div className="detalhes-main-holder mt-3">
                            <div className="row row-cols-2 row-cols-lg-4 opcoesBox">
                                {product?.characteristics?.map((cat,index,arr) => {
                                    return(
                                        <div  key={cat.id} className={`col d-flex gap-3 opcao-div ${index > 3 && arr.length > 4 ? "mt-lg-3" : ""}`}>
                                            {iconCaracteristicas[cat.icon]}
                                            <p>{cat.name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <DateVisualizer reservaIndex={product.id} calendarioTitle={"Datas disponíveis"} temSeparador={true} />
                    <div className="container mapaCampo">
                        <div>
                            <h3 className="tituloSecundario">Localização</h3>
                        </div>
                        <div className="separador-box">
                            <div className="separador"></div>
                        </div>
                        <div>

                        </div>
                        <div className="localizao-texto py-3">
                            <p>{product?.city?.name}, {product?.city?.country}</p>
                            <p>Bairro lagoa azul, Rua Tabajara</p>
                        </div>
                        {product?.latitude && product?.longitude &&
                            <MapVisualizer latitude={product?.latitude} longitude={product?.longitude} />
                        }
                    </div>
                    <InformacoesCampo></InformacoesCampo>
                </div>
            </div>
        </Template>
    )
}
