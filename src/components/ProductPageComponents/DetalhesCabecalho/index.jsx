import { goBackArrow } from "../../icons";
import Link from "../../tipografy/Link";
import "./style.scss"



export default function DetalhesCabecalho({product}) {

    return (
        <div className="detalhesCabecalho">
            <div className="container d-flex justify-content-between">
                <div className="cabecalhoTexto">
                    <p>{product?.category?.qualification}</p>
                    <h4>{product?.name}</h4>
                </div>
                <Link to="/" className="d-flex align-items-center">
                    {goBackArrow}
                </Link>
            </div>
        </div>
    )
}