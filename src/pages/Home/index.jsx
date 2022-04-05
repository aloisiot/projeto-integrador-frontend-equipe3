import './styles.scss'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Col, Container, Row } from "react-bootstrap";
import Template from '../../components/template/Layout';
import SearchBar from '../../components/template/SerchBar';
import Title from '../../components/tipografy/Title';
import ProductCard from '../../components/template/ProductCard';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectAllCategories } from '../../app/store/slices/categoriesSlice';
import { fetchProducts, selectAllProducts } from '../../app/store/slices/productsSlice';
import CategoriesColection from '../../components/template/CategoryCardColection';

export default function Home(){
    const dispatch = useDispatch();
    const categories = useSelector(selectAllCategories);
    const products = useSelector(selectAllProducts);
    
    useEffect(() => {
        if(! categories.length) {
            dispatch(fetchCategories())
        }
        if(! products.length) {
            dispatch(fetchProducts())
        }
    }, [dispatch, categories, products])

    function shuffleProducts() {
        if(products) {
            return products.map(product => {
                return {
                    sortId: Math.random(),
                    product
                }
            }).sort((o1, o2) => o1.sortId - o2.sortId)
            .map(object => object.product)
        }
        return null
    }

    return(
        <Template>
            <div className="home-page-content">
                <SearchBar/>
                <Container className="py-4">
                    <Title variant="h2">Buscar por categoria</Title>
                    {categories.length ? (
                        <CategoriesColection className="pt-4"/>
                    ) : ""}
                </Container>
                <section className='products-container py-4 light-gray-bg'>
                    <Container>
                    <Title variant="h2">Recomendações</Title>
                        <Row className='d-flex row-cols-md-1 row-cols-lg-2'>
                            {shuffleProducts().map?.(product => {
                                return (
                                    <Col key={product.id}>
                                        <ProductCard product={product} className="mb-3"/>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Container>
                </section>
            </div>
        </Template>
    )
}
