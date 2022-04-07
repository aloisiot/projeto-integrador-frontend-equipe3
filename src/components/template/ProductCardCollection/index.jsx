import { Col } from "react-bootstrap"
import ProductCard from "../ProductCard"

const ProductCardCollection = ({products, category, shufle}) => {
    let result = products

    if(category) { // filtro por categoria
        result = products.filter(product => product.category?.id === category.id)
    }

    if(shufle) { // embaralhamento
        result = result
            .map(product => [product, Math.ceil(Math.random() * 10)])
            .sort((o1, o2) => o1[1] - o2[1])
            .map(sortObj =>  sortObj[0])
    }

    return result.map(product => {
        return (
            <Col key={product.id}>
                <ProductCard product={product} className="mb-3"/>
            </Col>
        )
    })
}

export default ProductCardCollection