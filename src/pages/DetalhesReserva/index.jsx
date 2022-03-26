import Template from "../../components/template/Layout";
import DesktopGallery from "../../components/ProductPageComponents/Gallery/DesktopGallery";
import MobileGallery from "../../components/ProductPageComponents/Gallery/MobileGallery";
import ModalGallery from "../../components/ProductPageComponents/ModalGallery";
import MapVisualizer from "../../components/ProductPageComponents/MapVisualizer";
import DetalhesCabecalho from "../../components/ProductPageComponents/DetalhesCabecalho";
import DateVisualizer from "../../components/ProductPageComponents/DateVisualizer";
import { useEffect, useState } from "react";
import { findCurrentProduct, selectCurrentProduct } from '../../app/store/currentProductSlice'
import {
     Locale, StarIcon, emptyStar, heartIcon, shareIcon, tvIcon, wiFiIcon,
    kitchenIcon, noSmoke, noParty, shareIconMobile, heartIconMobile, acIcon, petsIcon, creditCard
} from "../../components/icons";
import "./style.scss"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Link from "../../components/tipografy/Link";


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

    const dispatch = useDispatch();
    const arrayTest = [StarIcon, StarIcon, StarIcon, emptyStar, emptyStar]
    const [modalAtivo, setModalAtivo] = useState(false)
    const [galeriaAtual, setGaleriaAtual] = useState(getGaleriaAtual())
    const { idReserva } = useParams()
    const product = useSelector(selectCurrentProduct)

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
                <DetalhesCabecalho/>
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
                                        {

                                            arrayTest.map((star, i) =>
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
                        <button>{window.innerWidth < 520 ? heartIconMobile : heartIcon}</button>
                    </div>
                </div>
                {galeriaAtual === "desktop" ? <DesktopGallery modalFunction={() => { setModalAtivo(true) }} /> : <MobileGallery />}
                <div className="detalhesUltimoContainer">
                    <div className="container descricaoCampo">
                        <div>
                            <h3 className="py-3">Hospede-se em {product?.name}</h3>
                        </div>
                        <div>
                            <p className="py-3">
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
                        <div className="detalhes-main-holder">
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
                    <DateVisualizer />
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
                    <div className="container infoCampo">
                        <div>
                            <h3 className="tituloSecundario">Informações adicionais</h3>
                        </div>
                        <div className="separador-box">
                            <div className="separador"></div>
                        </div>
                        <div className="detalhes-main-holder py-3">
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
                                <div className="col info-div">
                                    <h5>Normas da reserva</h5>
                                    <p>lorem lorem</p>
                                    <p>lorem lorem</p>
                                    <p>lorem lorem</p>
                                </div>
                                <div className="col info-div">
                                    <h5>Saúde e segurança</h5>
                                    <p>lorem lorem</p>
                                </div>
                                <div className="col info-div">
                                    <h5>Cancelamento</h5>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam aliquam aspernatur vel commodi placeat consectetur ducimus laborum, nemo eos reiciendis eaque odit voluptates dicta modi eligendi illo, nesciunt, laudantium provident?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}