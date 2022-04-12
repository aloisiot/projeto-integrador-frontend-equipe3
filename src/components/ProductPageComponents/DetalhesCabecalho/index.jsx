import { goBackArrow } from "../../icons";
import Link from "../../tipografy/Link";
import "./style.scss"



export default function DetalhesCabecalho({product,singleTitle}) {

    

    return (
        <div className="detalhesCabecalho d-flex align-items-center">
            <div className="container d-flex justify-content-between">
                <div className="cabecalhoTexto">
                    { !(typeof singleTitle === "string") && (
                        <>
                            <p>{product?.category?.qualification}</p>
                            <h4>{product?.name}</h4>
                        </>
                    )}
                    { typeof singleTitle === "string" && (
                        <>
                            <h4 className="no-margin">{singleTitle}</h4>
                        </>
                    )}
                </div>
                <Link to="/" className="d-flex align-items-center">
                    {goBackArrow}
                </Link>
            </div>
        </div>
    )
}