import { Container } from "react-bootstrap";
import Input from "../../components/form/Input";
import DetalhesCabecalho from "../../components/ProductPageComponents/DetalhesCabecalho";
import Template from "../../components/template/Layout";
import './style.scss'




export default function CriacaoReserva(){


    return(
        <Template>
            <DetalhesCabecalho singleTitle={"Administração"}/>
                <div className="criacao-reserva-content">
                    <Container>
                        <h4>Criar propriedade</h4>
                        <section className="criacao-form redondo p-4">
                            <form>
                                <div className="criacao-form-input">
                                    <label for="criacao-nome">Nome</label>
                                    <input className="redondo" type="text" id="criacao-nome"></input>
                                </div>
                                <div className="criacao-form-input">
                                    <label>Categoria</label>
                                    
                                </div>
                            </form>
                        </section>
                    </Container>
                </div>
        </Template>
    )
}