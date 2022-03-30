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
    )
}