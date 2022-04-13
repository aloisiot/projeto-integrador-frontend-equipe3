import { Container } from "react-bootstrap";
import DetalhesCabecalho from "../../components/ProductPageComponents/DetalhesCabecalho";
import Template from "../../components/template/Layout";
import './style.scss'
import { LocaleStrockIcon, Locale, categoryIcon } from "../../components/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, selectAllCities } from "../../app/store/slices/citiesSlice";
import ImputWithOptions from "../../components/form/ImputWithOptions";
import { fetchCategories, selectAllCategories } from "../../app/store/slices/categoriesSlice";
import { fetchCharacteristics, selectAllCharacteristics } from "../../app/store/slices/characteristicsSlice";
import { tvIcon, wiFiIcon, kitchenIcon, noSmoke, noParty, acIcon, petsIcon, creditCard } from "../../components/icons";

const iconCaracteristicas = {
    "icon-wifi": wiFiIcon,
    "icon-tv": tvIcon,
    "icon-cozinha": kitchenIcon,
    "icon-naoFume": noSmoke,
    "icon-semFesta": noParty,
    "icon-arCondicionado": acIcon,
    "icon-pets": petsIcon,
    "icon-credito": creditCard
}


export default function CriacaoReserva() {

    const dispatch = useDispatch()
    const [selectedCityName, setSelectedCityName] = useState("");
    const [selectedCityId, setSelectedCityId] = useState(0);
    const cities = useSelector(selectAllCities);
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([])
    const categories = useSelector(selectAllCategories);
    const characteristics = useSelector(selectAllCharacteristics);

    useEffect(() => {
        if (!cities.length) {
            dispatch(fetchCities())
        }
    }, [dispatch, cities])

    useEffect(() => {
        if (!characteristics.length) {
            dispatch(fetchCharacteristics())
        }

    }, [dispatch, characteristics])

    useEffect(() => {
        if (!categories.length) {
            dispatch(fetchCategories())
        }
    }, [dispatch, categories])



    function modifyCategories() {
        return categories.map((category) => {
            return {
                ...category,
                name: category.qualification
            }
        })
    }

    function selectedOptionsHandler(iconName) {
        if (!selectedOptions.includes(iconName)) {
            setSelectedOptions([
                ...selectedOptions,
                iconName
            ])

        } else {
            setSelectedOptions(selectedOptions.filter((iconStored) => {
                return iconStored !== iconName
            }))
        }

    }

    useEffect(() => {
        console.log(selectedOptions)
    }, [selectedOptions])
    return (
        <Template>
            <DetalhesCabecalho singleTitle={"Administração"} />
            <div className="criacao-reserva-content">
                <Container>
                    <h4>Criar propriedade</h4>
                    <section className="criacao-form redondo p-4">
                        <form className="mx-4">
                            <div className="dois-input gap-4">
                                <div className="criacao-form-input">
                                    <label htmlFor="criacao-nome">Nome</label>
                                    <input className="redondo" type="text" id="criacao-nome" autoComplete="off"></input>
                                </div>
                                <div className="criacao-form-input">
                                    <label htmlFor="criacao-nome">Categoria</label>
                                    <ImputWithOptions
                                        className="criacao-cidade-input redondo"
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
                            <div className="dois-input mt-3 gap-4">
                                <div className="criacao-form-input">
                                    <label htmlFor="criacao-endereço">Endereço</label>
                                    <input className="redondo" type="text" id="criacao-endereço" autoComplete="off"></input>
                                </div>
                                <div className="criacao-form-input">
                                    <label htmlFor="criacao-Cidade">Cidade</label>
                                    <ImputWithOptions
                                        className="criacao-cidade-input redondo"
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
                            <div className="criacao-descricao mt-2">
                                <label>Descrição</label>
                                <textarea className="redondo"></textarea>
                            </div>
                        </form>
                        <div className="criacao-atributos-holder mx-4 mt-4">
                            <h4>Adicionar Atributos</h4>
                            <h6>Clique para adicionar</h6>
                            <div className="row row-cols-2 row-cols-lg-4">
                                {
                                    characteristics.slice(0, 8).map(({ id, name, icon }) => {
                                        return (
                                            <div key={id} className='col'>
                                                <div
                                                    className={`d-flex gap-3 criacao-atributos mt-3 p-2 redondo align-items-center ${selectedOptions.includes(icon) ? "option-animation-in" : ""}`}
                                                    onClick={() => { selectedOptionsHandler(icon) }}
                                                    key={id}
                                                >
                                                    {iconCaracteristicas[icon]}
                                                    <p>{name}</p>
                                                </div>
                                                <p className={`atributo-indicador ${selectedOptions.includes(icon) ? "" : 'escondido'}`}>Atributo adicionado!</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="criacao-politicas-holder mx-4 mt-4">
                            <h4>Políticas do Produto</h4>
                            <div className="row row-cols-3 mt-2">
                                <div className="col-12 mt-2 col-xl-4">
                                    <div className="d-flex flex-column politicas-box">
                                        <h6>Regras da casa</h6>
                                        <textarea className="redondo" placeholder="Escreva sobre as regras da casa" onBlur={()=>{console.log("hello")}}></textarea>
                                    </div>
                                </div>
                                <div className="col-12 mt-2 col-xl-4">
                                        <div className="d-flex flex-column politicas-box">
                                            <h6>Saúde e segurança</h6>
                                            <textarea className="redondo" placeholder="Escreva sobre os protocolos de saúde e segurança"></textarea>
                                        </div>
                                </div>
                                <div className="col-12 mt-2 col-xl-4">
                                        <div className="d-flex flex-column politicas-box">
                                            <h6>Cancelamento</h6>
                                            <textarea className="redondo" placeholder="Escreva sobre os detalhes do processo de cancelamento"></textarea>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Container>
            </div>
        </Template>
    )
}