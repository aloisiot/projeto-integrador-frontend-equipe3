import './styles.scss'
import Title from "../../tipografy/Title";
import Button from "../Button";
import { Locale, StarIcon } from '../../icons';
import Link from '../../tipografy/Link';
import { useNavigate } from 'react-router-dom';

export default function ProductCard ({product, className, secondaryAction, secondaryActionText}) {
    const navigate = useNavigate();
    
    const navigateToProductPage = () => {
        navigate(`/reserva/${product.id}`)
        window.scrollTo(0, 0)
    }

    return (
        <div className={`d-flex shadow rounded-3 component-product-card ${className}`}>
            <div className="img-container rounded-3 overflow-hidden">
                <img
                    src={product.images[0].url}
                    alt="hotel"
                />
            </div>
            <div className={`
                product-description p-2 h-full flex-grow-1
                d-flex flex-column justify-content-between
            `}>
                <div className="d-flex">
                    <div className='flex-grow-1'>
                        {new Array(5).fill(StarIcon).map((star, i) =>
                            <span key={i} className='stars'>{star}</span>
                        )}
                        <Title variant="h5">{product?.name}</Title>
                    </div>
                    <div className="score d-flex flex-column align-items-end">
                        <span className='num px-2 fw-bold rounded-3'>8</span>
                        <span className='text pt-1 fw-bold'>Muito bom</span>
                    </div>
                </div>
                <div className='locale pb-2 d-flex gap-1'>
                    <div>{Locale} {product.city?.name} - <Link to="/">Veja no mapa</Link></div>
                </div>
                <div>
                    <p className='description'>{product?.description}</p>
                    <div className="buttons d-flex gap-2">
                        <Button
                            className="flex-grow-1"
                            full={secondaryAction === undefined}
                            onClick={navigateToProductPage}
                            >Veja mais
                        </Button>
                        {(secondaryAction && secondaryActionText) && (
                            <Button
                                variant="secondary"
                                className="flex-grow-1"
                                onClick={() => secondaryAction(product.id)}
                            >{secondaryActionText}
                            </Button>
                        )}
                    </div>
                </div>
            </div>    
        </div>
    )
}