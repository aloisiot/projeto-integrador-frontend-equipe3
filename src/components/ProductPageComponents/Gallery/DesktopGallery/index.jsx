import { useSelector } from "react-redux"
import { selectCurrentProduct } from "../../../../app/store/currentProductSlice"
import Button from "../../../template/Button"
import "./style.scss"



export default function DesktopGallery({ modalFunction }) {

    const product = useSelector(selectCurrentProduct)

    return (
        <div className="container-fluid">
            <div className="container galeriaImagens">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col imagemPrimaria">
                            <img className="rounded" src={product?.images?.[0].url} alt={product?.images?.[0].title}></img>
                        </div>
                        <div className="col imagensSecondarias">
                            <div className="row row-cols-2 grid-img-secondarias overflow-hidden">
                                {product?.images?.slice(1, 5).map((img, index, arr) => {

                                    return (
                                        <div key={img.id} className={`${arr.lenght - 1 === index ? "ultimaImagem" : ""} ${arr.length / 2 <= index ? "mt-3" : ""}`}>
                                            <img className="rounded" src={img.url} alt={img.title}></img>

                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                        <Button className="large" onClick={modalFunction}>Acessar galeria</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}