import './styles.scss'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Col, Container, Row } from "react-bootstrap";
import Template from '../../components/template/Layout';
import CategoryCard from '../../components/template/CategoryCard';
import SearchBar from '../../components/template/SerchBar';
import Title from '../../components/tipografy/Title';
import ProductCard from '../../components/template/ProductCard';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectAllCategories } from '../../app/store/categoriesSlice';
import { fetchProducts, selectAllProducts } from '../../app/store/productsSlice';
import { selectCurrentCategoriy } from '../../app/store/currentCategorySlice';

export default function Home(){
    const dispatch = useDispatch();
    const categories = useSelector(selectAllCategories);
    const products = useSelector(selectAllProducts);
    const currentCategory = useSelector(selectCurrentCategoriy)
    
    useEffect(() => {
        if(! categories.length) {
            dispatch(fetchCategories())
        }
        if(! products.length) {
            dispatch(fetchProducts())
        }
    }, [dispatch, categories, products])

    function filteredProductsByCategory() {
        if(currentCategory.id !== undefined) {
            return products.filter(product => {
                return product.category?.id === currentCategory.id
            })            
        }
        return products
    }

    return(
        <Template>
            <div className="home-page-content">
                <SearchBar/>
                <Container className="py-4">
                    <Title variant="h2">Buscar por categoria</Title>
                    <section className="categories-container list-unstyled gap-4">
                        {categories?.map?.(category => {
                            return (
                                <div key={category.id}>
                                    <CategoryCard style={{width: "100%"}} category={category}/>
                                </div>
                            )
                        })}
                    </section>
                </Container>
                <section id="products-section" className='products-container py-4'>
                    <Container>
                    <Title variant="h2">Recomendações</Title>
                        <Row className='d-flex row-cols-md-1 row-cols-lg-2'>
                            {filteredProductsByCategory().map?.(product => {
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
