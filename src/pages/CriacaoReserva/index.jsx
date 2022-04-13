import { Container } from "react-bootstrap";
import DetalhesCabecalho from "../../components/ProductPageComponents/DetalhesCabecalho";
import Template from "../../components/template/Layout";
import './style.scss'
import {  LocaleStrockIcon, Locale, categoryIcon } from "../../components/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, selectAllCities } from "../../app/store/slices/citiesSlice";
import ImputWithOptions from "../../components/form/ImputWithOptions";
import { fetchCategories, selectAllCategories } from "../../app/store/slices/categoriesSlice";


export default function CriacaoReserva(){

    const dispatch = useDispatch()
    const [selectedCityName, setSelectedCityName] = useState("");
    const [selectedCityId, setSelectedCityId] = useState(0);
    const cities = useSelector(selectAllCities);
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const categories = useSelector(selectAllCategories)

    
    useEffect(() => {
        if(! cities.length) {
            dispatch(fetchCities())
        }
    }, [dispatch, cities])

    
    useEffect(() => {
        if(! categories.length) {
            dispatch(fetchCategories())
        }
    }, [dispatch, categories])

 

    function modifyCategories(){
        return categories.map((category)=>{
            return {
                ...category,
                name: category.qualification
            }
        })
    }


    return(
        <Template>
            <DetalhesCabecalho singleTitle={"Administração"}/>
                <div className="criacao-reserva-content">
                    <Container>
                        <h4>Criar propriedade</h4>
                        <section className="criacao-form redondo p-4">
                            <div>
                               <form>
                                   <div className="dois-input">
                                        <div className="criacao-form-input">
                                            <label htmlFor="criacao-nome">Nome</label>
                                            <input className="redondo" type="text" id="criacao-nome" autoComplete="off"></input>
                                        </div>
                                        <div className="criacao-form-input">
                                            <label htmlFor="criacao-nome">Categoria</label>
                                            <ImputWithOptions
                                                className="criacao-cidade-input"
                                                name="input-cidade-selecionana"
                                                id="input-cidade-s1elecionada"
                                                setValue={(value) => setSelectedCategoryName(value)}
                                                value={selectedCategoryName}
                                                placeholder="Selecione uma categoria"
                                                icon={categoryIcon}
                                                options={modifyCategories()}
                                                onSelectedOption={setSelectedCategoryId} 
                                            />
                                        </div>
                                    </div>
                                    <div className="dois-input mt-3">
                                        <div className="criacao-form-input">
                                            <label htmlFor="criacao-endereço">Endereço</label>
                                            <input className="redondo" type="text" id="criacao-endereço" autoComplete="off"></input>
                                        </div>
                                        <div className="criacao-form-input">
                                            <label htmlFor="criacao-Cidade">Cidade</label>
                                            <ImputWithOptions
                                                className="criacao-cidade-input"
                                                name="input-cidade-selecionana"
                                                id="input-cidade-s1elecionada"
                                                setValue={(value) => setSelectedCityName(value)}
                                                value={selectedCityName}
                                                placeholder="Selecione uma cidade"
                                                icon={Locale}
                                                secIcon={LocaleStrockIcon}
                                                options={cities}
                                                onSelectedOption={setSelectedCityId} 
                                            />
                                        </div>
                                    </div>
                                    <div className="criacao-descricao">
                                        <label>Descrição</label>
                                        <textarea></textarea>
                                    </div>
                                </form> 
                            </div>
                        </section>
                    </Container>
                </div>
        </Template>
    )
}