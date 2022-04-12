import './styles.scss'
import { Container, Row } from "react-bootstrap";
import Template from "../../components/template/Layout";
import SearchBar from "../../components/template/SerchBar";
import { useDispatch, useSelector } from "react-redux";
import Chip from "../../components/template/Chip";
import Title from '../../components/tipografy/Title';
import { selectAllCities } from "../../app/store/slices/citiesSlice"
import { useEffect } from 'react';
import CategoriesColection from '../../components/template/CategoryCardColection';
import { useCallback } from "react";
import { fetchProducts, fetchProductsByCity, fetchProductsByCityAndDateRange, fetchProductsByDateRange, selectAllProducts } from '../../app/store/slices/productsSlice';
import { selectSearchParams, setCityId, setDateRange } from '../../app/store/slices/searchParamsSlice';
import { selectCurrentCategoriy, setCurrentCategory } from '../../app/store/slices/currentCategorySlice';
import { fetchCategories, selectAllCategories } from '../../app/store/slices/categoriesSlice';
import ProductCardCollection from '../../components/template/ProductCardCollection';

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

    const loadSources = useCallback(() =>{
        // Busca os dados na API com base nos argumentos de busca presentes no store
        const startDate = dateRange?.startDate
        const endDate = dateRange?.endDate
        if(cityId && startDate && endDate) {
            dispatch(fetchProductsByCityAndDateRange({
                cityId: cityId,
                startDate,
                endDate
            }))
        } else if(cityId){
            dispatch(fetchProductsByCity(cityId))
        } else if(startDate && endDate) {
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
            <div className="search-page-content flex-col-items-stretch">
                <SearchBar/>
                <div className="pt-4">{/*Espaçamento*/}</div>
                <Container>
                    {(cityId || dateRange?.startDate || currentCategory?.id) ? (
                        <Title variant="h4">Filtros:</Title>
                    ) : ""}
                    <div className='pb-4 d-flex flex-wrap align-items-center gap-3'>
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
                    </div>
                </Container>
                <Container className={`categories-container ${currentCategory?.id ? "not-visible" : "is-visible"}`}>
                    <Title variant={'h2'}>Buscar por categoria</Title>
                    {categories.length ? (
                        <CategoriesColection categories={categories} className={"pb-4"}/>
                    ) : ""}
                </Container>
                <section id="search-result" className='products-container py-4 light-gray-bg flex-grow-1'>
                    <Container>
                    <Title variant="h2">Resultados</Title>
                        <Row className='d-flex row-cols-md-1 row-cols-lg-2'>
                            <ProductCardCollection products={products} category={currentCategory} />
                        </Row>
                    </Container>
                </section>
            </div>
        </Template>
    )
}
