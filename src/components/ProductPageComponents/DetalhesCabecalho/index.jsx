/* eslint-disable no-restricted-globals */
import { goBackArrow } from "../../icons";
import Title from "../../tipografy/Title";
import "./style.scss"

export default function DetalhesCabecalho({product, singleTitle}) {
    const goBack = () => history.go(-1)

    return (
        <div className={`detalhesCabecalho d-flex align-items-center`}>
            <div className="container d-flex justify-content-between">
                <div className="cabecalhoTexto">
                    {typeof singleTitle === "string" ? (
                        <>
                            <Title variant={"h1"} className="no-margin white">
                                {singleTitle}
                            </Title>
                        </>
                    ) : (
                        <>
                            <p>{product?.category?.qualification}</p>
                            <Title variant={"h1"} className="white">
                                {product?.name}
                            </Title>
                        </>
                    )}
                </div>
                <button onClick={goBack} className="d-flex align-items-center goback-btn">
                    {goBackArrow}
                </button>
            </div>
        </div>
    )
}