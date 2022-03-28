import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findCurrentProduct, selectCurrentProduct } from "../../app/store/currentProductSlice";
import DetalhesCabecalho from "../../components/ProductPageComponents/DetalhesCabecalho";
import InformacoesCampo from "../../components/ProductPageComponents/InformacoesCampo";
import Button from "../../components/template/Button";
import Template from "../../components/template/Layout";
import { StarIcon, LocaleSmall } from "../../components/icons";
import './style.scss'


export default function ConfirmacaoReserva() {

    const dispatch = useDispatch();
    const product = useSelector(selectCurrentProduct)
    const { idReserva } = useParams()

    useEffect(() => {
        dispatch(findCurrentProduct(idReserva))
    }, [dispatch, idReserva])



    return (
        <Template>
            <DetalhesCabecalho product={product} />
            <div className="confirmacao-main-holder">
                <Container>
                    <h4>Complete seus dados</h4>
                    <div className="confirmacao-conteudo">
                        <div>

                        </div>
                        <div>
                            <h4 className="p-3">Detalhe da reserva</h4>
                            <div className="detalhes-confirmacao-box">
                                <div>
                                    <img src={product?.images?.[0].url} alt={product?.images?.title}></img>
                                </div>
                                <div className="confirmacao-info">
                                    <p>{product?.category?.qualification}</p>
                                    <h4>{product?.name}</h4>
                                    <span>{StarIcon}</span>
                                    <span>{StarIcon}</span>
                                    <span>{StarIcon}</span>
                                    <span>{StarIcon}</span>
                                    <span>{StarIcon}</span>
                                    <div className="confirmacao-localizacao">
                                        {LocaleSmall}
                                        <p>{product?.city?.name}, {product?.city?.country}</p>
                                    </div>
                                    <div className="confirmacao-box-separator mt-3">

                                    </div>
                                    <div className="check-date mt-3 py-1">
                                        <p>Check in</p> <p>Escolha uma data</p>
                                    </div>
                                    <div className="check-date mt-1 py-1">
                                        <p>Check out</p> <p>Escolha uma data</p>
                                    </div>
                                    <div className="mt-5">
                                        <Button className="btn-confirmacao">Confirmar reserva</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <InformacoesCampo containerClass={"my-5"}></InformacoesCampo>
        </Template>
    )
}