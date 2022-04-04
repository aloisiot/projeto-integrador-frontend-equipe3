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
import { dateFormatPtBt, formatDateForTransfer } from "../../utilitarios/dateFormat";
import './style.scss'
import useAuth from "../../app/auth/useAuth";
import { useNavigate } from "react-router-dom";
import jsCookie from "js-cookie";
import { userCookieName } from "../../app/auth/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import disableDate from "../../utilitarios/dateBetween";

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
    const [horarioSelecionado, setHorarioSelecionado] = useState(null)
    const hourArray = hourPush();
    const {getUserDetails,authenticated, getTocken} = useAuth()
    const userDetails = getUserDetails();
    const navigate = useNavigate();
    const initialReserva = {
        product:{
            id: +idReserva
        },
        client:{
            id : userDetails?.id
        }
    }
    const [reserva, setReserva] = useState(initialReserva)
  

    useEffect(() => {
        dispatch(findCurrentProduct(idReserva))
    }, [dispatch, idReserva])

    function horarioHandler(horaChegada){
        setHorarioSelecionado(horaChegada)
        setReserva({
            ...reserva,
            startTime : horaChegada.split(":")[0].length < 2 ? "0"+horaChegada+":00" : horaChegada+":00"
        })
        setDropdownToggle(!dropdownToggle)
    }

    useEffect(()=>{
      const cookie = jsCookie.get(userCookieName)
      if(!cookie){
        Swal.fire({
            icon: 'info',
            title: 'Faça login para continuar'
        })
            .then(()=> navigate('/login'))
      }
    },[navigate,authenticated])
    
    async function reservaHandler(){
        const config = {
            headers: {
                Authorization: getTocken()
            }
        }
        await axios.post(`${process.env.REACT_APP_LINK_API}/bookings`,reserva,config)
        .then((resp => {
            console.log("status: ", resp.status)
            if (resp.status === 201){
                Swal.fire({
                    icon: 'success',
                    title: 'Reserva concluida!'
                })
            }
        }))
        .catch(({response})=> {
            if(response.status === 422){
                Swal.fire({
                    icon: 'error',
                    title: response.data.error
                })
            }
        })
    }

    function telefoneHandler(telefone){
        setReserva({
            ...reserva,
            telefone
        })
    }

    function calendarioHandler(datas){
        setCurrentDateRange(datas)
        console.log(datas[0])
        console.log(datas[0].startDate)
        console.log(datas[0].endDate)

        setReserva({
            ...reserva,
            startDate : formatDateForTransfer(datas[0].startDate),
            endDate : formatDateForTransfer(datas[0].endDate)
        })
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
                                    <label>Nome<br></br><input type="text" name="name" defaultValue={authenticated ? userDetails.name  : ""}/></label>
                                    <label>Sobrenome <br></br><input type="text" name="lastName" defaultValue={authenticated ? userDetails.lastname  : ""} /></label>
                                </div>
                                <div className="column-2 d-flex">
                                    <label>Email<br></br><input type="email" name="email" defaultValue={authenticated ? userDetails.email  : ""}/></label>
                                    <label>Telefone<br></br><input type="text" name="telefone" onChange={(e)=>{telefoneHandler(e.target.value)}} /></label>
                                </div>
                            </div>
                            <div>
                                <div className="confirmacao-calendario mt-4">
                                    <h4>Selecione sua data de reserva</h4>
                                    <DateVisualizerPure onchange={item => calendarioHandler([item.datasSelecao])} range={currentDateRange} disabledDay={disableDate(product.disabledDates)}/>
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
                                        <p className="seletor-display px-1">{horarioSelecionado || "selecione um horário"}</p>
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
                                        <p>Check in</p> <p>{currentDateRange != null ? dateFormatPtBt(currentDateRange[0].startDate) : "___/___/___"}</p>
                                    </div>
                                    <div className="check-date mt-1 py-1">
                                        <p>Check out</p> <p>{currentDateRange != null ? dateFormatPtBt(currentDateRange[0].endDate) : "___/___/___"}</p>
                                    </div>
                                    <div className="check-date mt-1 py-1">
                                        <p>Hora de chegada</p> <p>{horarioSelecionado ? horarioSelecionado : "Escolha uma hora"}</p>
                                    </div>
                                    <div className="mt-5 mb-2">
                                        <Button onClick={()=>{reservaHandler()}} className="btn-confirmacao">Confirmar reserva</Button>
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