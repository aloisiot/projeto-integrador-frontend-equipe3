import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findCurrentProduct, selectCurrentProduct } from "../../app/store/currentProductSlice";
import DetalhesCabecalho from "../../components/ProductPageComponents/DetalhesCabecalho";
import InformacoesCampo from "../../components/ProductPageComponents/InformacoesCampo";
import Button from "../../components/template/Button";
import Template from "../../components/template/Layout";
import DateVisualizerPure from "../../components/template/DateVisualizerPure";
import { StarIcon, LocaleSmall, clockIcon, downArrow } from "../../components/icons";
import formatarData from "../../utilitarios/formatarData";
import './style.scss'


function hourPush(){
    let array = []
    for(var i = 1; i < 25; i++){
        array.push(i+":00")
    }
    return array
}

export default function ConfirmacaoReserva() {

    const dispatch = useDispatch();
    const product = useSelector(selectCurrentProduct);
    const { idReserva } = useParams();
    const [currentDateRange, setCurrentDateRange] = useState(null);
    const [dropdownToggle, setDropdownToggle] = useState(false);
    const [horarioSelecionado, setHorarioSelecionado] = useState(null);
    const hourArray = hourPush();
   


    useEffect(() => {
        dispatch(findCurrentProduct(idReserva))
    }, [dispatch, idReserva])

    function horarioHandler(horarioValue){
        setHorarioSelecionado(horarioValue)
        setDropdownToggle(!dropdownToggle)
    }

    const hourLi = hourArray.map((horario,index)=>{
        return (
            <li key={index} onClick={()=>{horarioHandler(horario)}}>{horario}</li>
        )
    })

    return (
        <Template>
            <DetalhesCabecalho product={product} />
            <div className="confirmacao-main-holder">
                <Container>
                    <h4>Complete seus dados</h4>
                    <div className="confirmacao-conteudo">

                        <div className="left">
                            <div className="form-dados p-1">
                                <div className="column-1 d-flex">
                                    <label>Nome <br></br><input type="text" name="name" /></label>
                                    <label>Sobrenome <br></br><input type="text" name="lastName" /></label>
                                </div>
                                <div className="column-2 d-flex">
                                    <label>Email <br></br><input type="email" name="email" /></label>
                                    <label>Cidade <br></br><input type="text" name="city" /></label>
                                </div>
                            </div>
                            <div>
                                <div className="confirmacao-calendario mt-4">
                                    <h4>Selecione sua data de reserva</h4>
                                    <DateVisualizerPure onchange={item => setCurrentDateRange([item.selection])} range={currentDateRange} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <h4>Seu horário de chegada</h4>
                                <div className="horario-conteudo p-3 redondo margin-top-padrao">
                                    <div className="d-flex align-items-center">
                                        {clockIcon} <p className="px-2 mt-1">Sua reserva estará pronta entre 8:00 e 12:00</p>
                                    </div>
                                    <p className="mt-2">Indique a hora de chegada</p>
                                    <div className="seletor-horario mt-1 p-1 d-flex  align-items-center" onClick={()=>{setDropdownToggle(!dropdownToggle)}}>
                                        <p  className={`seletor-display px-1 ${horarioSelecionado != null ? "" : "white-hidden"}`}>{horarioSelecionado != null ? horarioSelecionado : "selecione um horário"}</p>
                                        {downArrow}
                                     
                                    </div>
                                        {dropdownToggle && 
                                           <ul className="list-unstyled lista-horario">
                                               {hourLi}
                                            </ul>
                                        }
                                </div>
                            </div>

                        </div>

                        <div className="redondo">
                            <h4 className="p-3">Detalhe da reserva</h4>
                            <div className="detalhes-confirmacao-box">
                                <div>
                                    <img src={product?.images?.[0].url} alt={product?.images?.title}></img>
                                </div>
                                <div className="confirmacao-info mt-4">
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
                                    <div className="confirmacao-box-separator mt-4">

                                    </div>
                                    <div className="check-date mt-3 py-1">
                                        <p>Check in</p> <p>{currentDateRange != null ? formatarData(currentDateRange[0].startDate) : "___/___/___"}</p>
                                    </div>
                                    <div className="check-date mt-1 py-1">
                                        <p>Check out</p> <p>{currentDateRange != null ? formatarData(currentDateRange[0].endDate) : "___/___/___"}</p>
                                    </div>
                                    <div className="check-date mt-1 py-1">
                                        <p>Hora de chegada</p> <p>{horarioSelecionado != null ? horarioSelecionado : "Escolha uma hora"}</p>
                                    </div>
                                    <div className="mt-5 mb-2">
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