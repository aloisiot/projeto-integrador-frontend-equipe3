import './styles.scss'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Container, Row } from "react-bootstrap";
import Template from '../../components/template/Layout';
import SearchBar from '../../components/template/SerchBar';
import Title from '../../components/tipografy/Title';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectAllCategories } from '../../app/store/slices/categoriesSlice';
import { fetchProducts, selectAllProducts } from '../../app/store/slices/productsSlice';
import CategoriesColection from '../../components/template/CategoryCardColection';
import ProductCardCollection from '../../components/template/ProductCardCollection';
import { cleanParams, selectSearchParams } from '../../app/store/slices/searchParamsSlice';

export default function Home(){
    const dispatch = useDispatch();
    const categories = useSelector(selectAllCategories);
    const products = useSelector(selectAllProducts);
    const searchParams = useSelector(selectSearchParams)
    
    if(Object.keys(searchParams).length) {
        dispatch(cleanParams())
        dispatch(fetchProducts())
    }
    
    useEffect(() => {
        if(! categories.length) {
            dispatch(fetchCategories())
        }
        if(! products.length) {
            dispatch(fetchProducts())
        }
    }, [dispatch, categories, products])

    return(
        <Template>
            <div className="home-page-content flex-col-items-stretch">
                <SearchBar/>
                <Container className="py-4">
                    <Title variant="h2">Buscar por categoria</Title>
                    {categories.length ? (
                        <CategoriesColection categories={categories}/>
                    ) : ""}
                </Container>
                <section className='products-container py-4 light-gray-bg flex-grow-1'>
                    <Container>
                    <Title variant="h2">Recomendações</Title>
                        <Row className='d-flex row-cols-md-1 row-cols-lg-2'>
                            <ProductCardCollection products={products} shufle={true} />
                        </Row>
                    </Container>
                </section>
            </div>
        </Template>
    )
}
