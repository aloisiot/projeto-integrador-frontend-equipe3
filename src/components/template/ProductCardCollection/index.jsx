import { Col } from "react-bootstrap"
import ProductCard from "../ProductCard"

const ProductCardCollection = ({products, category, shufle, secondaryAction, secondaryActionText, checkIn, startDate, endDate}) => {
    let result = products

    if(category?.id) { // filtro por categoria
        result = products.filter(product => product.category?.id === category.id)
    }

    if(shufle) { // embaralhamento
        result = result
            .map(product => {
                return { product, randN: Math.ceil(Math.random() * 10) }
            })
            .sort((o1, o2) => o1.randN - o2.randN)
            .map(sortObj =>  sortObj.product)
    }

    return result.map(product => {
        return (
            <Col key={product.id}>
                <ProductCard
                    product={product}
                    checkIn = {checkIn}
                    startDate = {startDate}
                    endDate = {endDate}
                    secondaryAction={secondaryAction}
                    secondaryActionText={secondaryActionText}
                    className="mb-3"
                />
            </Col>
        )
    })
}

export default ProductCardCollection