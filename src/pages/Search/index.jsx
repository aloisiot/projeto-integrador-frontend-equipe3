import { Col, Container, Row } from "react-bootstrap";
import Template from "../../components/template/Layout";
import SearchBar from "../../components/template/SerchBar";
import { selectSearchParams, setCityId, setDateRange } from "../../app/store/searchParamsSlice"
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentCategoriy, setCurrentCategory } from '../../app/store/currentCategorySlice';
import Chip from "../../components/template/Chip";
import Title from '../../components/tipografy/Title';
import { selectAllCities } from "../../app/store/citiesSlice"
import { fetchCategories, selectAllCategories } from '../../app/store/categoriesSlice';
import { useEffect } from 'react';
import CategoriesColection from '../../components/template/CategoryCardColection';
import { fetchProducts, fetchProductsByCity, fetchProductsByCityAndDateRange, fetchProductsByDateRange, selectAllProducts } from '../../app/store/productsSlice';
import ProductCard from '../../components/template/ProductCard';
import { useCallback } from "react";

export default function SearchPage() {
    const dispatch = useDispatch()
    const { dateRange, cityId } = useSelector(selectSearchParams)
    const currentCategory = useSelector(selectCurrentCategoriy)
    const cities = useSelector(selectAllCities);
    const categories = useSelector(selectAllCategories);
    const products = useSelector(selectAllProducts);
    
    useEffect(() => {
        if(! categories.length) {
            dispatch(fetchCategories())
        }
    }, [dispatch, categories])

    function filteredProductsByCategory() {
        if(currentCategory.id !== undefined) {
            return products.filter(product => {
                return product.category?.id === currentCategory.id
            })            
        }
        return products
    }

    const loadSources = useCallback(() =>{
        const startDate = dateRange?.startDate
        const endDate = dateRange?.endDate
        console.log(cityId)
        if(cityId && startDate && endDate) {
            console.log("cityId && startDate && endDate")
            dispatch(fetchProductsByCityAndDateRange({
                cityId: cityId,
                startDate,
                endDate
            }))
        } else if(cityId){
            console.log("cityId")
            dispatch(fetchProductsByCity(cityId))
        } else if(startDate && endDate) {
            console.log("startDate && endDate")
            dispatch(fetchProductsByDateRange({
                startDate,
                endDate
            }))
        } else {
            dispatch(fetchProducts())
        }
    }, [dateRange, cityId, dispatch])

    useEffect(() => {
        loadSources()
    }, [dateRange, cityId, loadSources])

    return (
        <Template>
            <div onLoad={loadSources} className="search-page-content">
                <SearchBar/>
                <div className="pt-4">{/*Espaçamento*/}</div>
                <Container>
                    {categories.length && !currentCategory?.id ? (
                        <CategoriesColection className="pb-4"/>
                    ) : ""}
                </Container>
                <Container className='pb-4 d-flex flex-wrap align-items-center gap-3'>
                    {(cityId || dateRange?.startDate || currentCategory?.id) ? (
                        <Title variant="h2">Filtros:</Title>
                    ) : ""}
                    {currentCategory?.id && (
                        <Chip
                            closeAction={() => dispatch(setCurrentCategory({}))}
                            label="Categoria"
                            text={`${currentCategory.qualification}`}
                            on
                        />
                    )}
                    {cityId ? (
                        cityId && (
                            <Chip
                                closeAction={() => dispatch(setCityId(0))}
                                label="Cidade"
                                text={`${cities?.find(city =>  city.id === cityId).name}`}
                            />
                        )
                    ): ""}
                    {dateRange?.startDate && (
                        <>
                            <Chip
                                closeAction={() => dispatch(setDateRange({}))}
                                label="Chech in"
                                text={dateRange.startDate.split("-").reverse().join("/")}
                            />
                            <Chip
                                closeAction={() => dispatch(setDateRange({}))}
                                label="Chech out"
                                text={dateRange.endDate.split("-").reverse().join("/")}
                            />
                        </>
                    )}
                </Container>
                <section id="search-result" className='products-container py-4 light-gray-bg'>
                    <Container>
                    <Title variant="h2">Resultados</Title>
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
