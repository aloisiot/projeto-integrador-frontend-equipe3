import './style.scss'

export default function InformacoesCampo(props) {


    return (
        <div className={`container infoCampo ${props.containerClass ? props.containerClass : ""}`}>
            <div>
                <h3 className="tituloSecundario">Informações adicionais</h3>
            </div>
            <div className="separador-box">
                <div className="separador"></div>
            </div>
            <div className="detalhes-main-holder py-3 mt-3">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
                    <div className="col info-div">
                        <h5>Normas da reserva</h5>
                        <p>Check out as 10:00</p>
                        <p>Sem festas</p>
                        <p>Proibido fumar</p>
                    </div>
                    <div className="col info-div">
                        <h5>Saúde e segurança</h5>
                        <p>Detector de fumaça</p>
                        <p>Alarme e camêras de segurança</p>

                    </div>
                    <div className="col info-div">
                        <h5>Cancelamento</h5>
                        <p>Adicione as datas da viagem para obter detalhes de cancelamento para a estadia</p>
                    </div>
                </div>
            </div>
        </div>
    )
}