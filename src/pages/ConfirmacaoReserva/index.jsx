import { Container } from "react-bootstrap";
import DetalhesCabecalho from "../../components/ProductPageComponents/DetalhesCabecalho";
import Template from "../../components/template/Layout";
import './style.scss'


export default function ConfirmacaoReserva() {

    return (
        <Template>
            <DetalhesCabecalho />
            <div className="confirmacao-main-holder">
                <Container>
                    <h4>Complete seus dados</h4>
                    <div className="confirmacao-conteudo">
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>
                </Container>
            </div>
        </Template>
    )
}