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
import Button from "../../components/template/Button";
import ImgInputBox from "../../components/template/ImgInputBox";
import axios from "axios";
import useAuth from "../../app/auth/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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
    const {getToken, getUserDetails} = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedCityName, setSelectedCityName] = useState("");
    const [selectedCityId, setSelectedCityId] = useState(0);
    const cities = useSelector(selectAllCities);
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [selectedCharacteristics, setSelectedCharacteristics] = useState([])
    const categories = useSelector(selectAllCategories);
    const characteristics = useSelector(selectAllCharacteristics);
    const [imgLinks, setImgLinks] = useState([])
    const [newLink, setNewLink] = useState("")
    const [currentEdit, setCurrentEdit] = useState(false)
    const [inputNome, setInputNome] = useState(null)
    const [inputEndereco, setInputEndereco] = useState("")
    const [inputDesc, setInputDesc] = useState(null)
    const [inputRegras, setInputRegras] = useState(null)
    const [inputSaude, setInputSaude] = useState(null)
    const [inputCancelamento, setInputCancelamento] = useState(null)
    const [inputLatitude, setInputLatitude] = useState(null)
    const [inputLongitude, setInputLongitude] = useState(null)

    useEffect(()=>{
        const user = getUserDetails();
        const authority = user?.authorities?.[0]?.authority
        if(authority !== 'ADMIN'){
            navigate("/")
        }
        
    })

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


    function includesCharacteristic(characteristic) {
        return selectedCharacteristics.filter((c) => {
            return c.id === characteristic.id
        }).length > 0
    }


    function modifyCategories() {
        return categories.map((category) => {
            return {
                ...category,
                name: category.qualification
            }
        })
    }

    function selectedCharacteristicsHandler(characteristic) {
        if (!includesCharacteristic(characteristic)) {
            setSelectedCharacteristics([
                ...selectedCharacteristics,
                characteristic
            ])

        } else {
            setSelectedCharacteristics(selectedCharacteristics.filter((c) => {
                return c.id !== characteristic.id
            }))
        }

    }

    function imgLinkPusher() {
        if (!imgLinks.includes(newLink) && newLink.length > 0) {
            setImgLinks(imgLinks.concat(newLink))
            setNewLink("")
        }
    }

    function imgLinkRemover(linkName) {
        const newImgLinks = imgLinks.filter((name) => {
            return name !== linkName
        })
        setImgLinks(newImgLinks)
    }

    function imgLinkUpdater(oldName, newName) {
        let newImgLinks = [];
      


        if (oldName !== newName && newName.length > 0) {
            newImgLinks = imgLinks.map((name) => {
                if (name === oldName) {
                    return newName
                } else {
                    return name
                }
            })

            setImgLinks(newImgLinks)
        }

        setCurrentEdit("")
    }

    async function criacaoPostHandler() {
        const reservaCriada = {
            description: inputDesc,
            name: inputNome,
            category: {
                id: selectedCategoryId
            },
            city: {
                id: selectedCityId
            },
            address: inputEndereco,
            images: imgLinks.map((link) => {
                return {
                    url: link,
                    title: inputNome
                }
            }),
            characteristics: selectedCharacteristics,
            policies: {
                generalRules: inputRegras,
                cheersAndSecurity: inputSaude,
                cancellation: inputCancelamento
            },
            latitude: inputLatitude,
            longitude: inputLongitude
        }

        const config = {
            headers: {
                Authorization: getToken()
            }
        }
        await axios.post(`${process.env.REACT_APP_LINK_API}/products`, reservaCriada, config)
            .then((resp => {
                if (resp.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sua reserva foi criada!'
                    })
                }
            }))
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Ops! Algo aconteceu.'
                })
            })


    }



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
                                    <input className="redondo" type="text" id="criacao-nome" autoComplete="off" onBlur={(e) => { setInputNome(e.target.value) }}></input>
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
                                    <input className="redondo" type="text" id="criacao-endereço" autoComplete="off" value={inputEndereco} onChange={(e) => { setInputEndereco(e.target.value) }}></input>
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
                            <div className="dois-input gap-4 mt-3">
                                <div className="criacao-form-input">
                                    <label htmlFor="criacao-latitude">Latitude</label>
                                    <input className="redondo" type='number' step="0.00000000000001" id="criacao-latitude" onBlur={(e) => { setInputLatitude(e.target.value) }}></input>
                                </div>
                                <div className="criacao-form-input">
                                    <label htmlFor="criacao-longitude">Longitude</label>
                                    <input className="redondo" type='number' step="0.00000000000001" id="criacao-longitude" onBlur={(e) => { setInputLongitude(e.target.value) }}></input>
                                </div>
                            </div>
                            <div className="criacao-descricao mt-2">
                                <label>Descrição</label>
                                <textarea className="redondo" onBlur={(e) => { setInputDesc(e.target.value) }}></textarea>
                            </div>
                        </form>
                        <div className="criacao-atributos-holder mx-4 mt-4">
                            <h4>Adicionar Atributos</h4>
                            <h6>Clique para adicionar</h6>
                            <div className="row row-cols-2 row-cols-lg-4">
                                {
                                    characteristics.slice(0, 8).map((characteristic) => {
                                        return (
                                            <div key={characteristic.id} className='col'>
                                                <div
                                                    className={`d-flex gap-3 criacao-atributos mt-3 p-2 redondo align-items-center ${includesCharacteristic(characteristic) ? "option-animation-in" : ""}`}
                                                    onClick={() => { selectedCharacteristicsHandler(characteristic) }}
                                                >
                                                    {iconCaracteristicas[characteristic.icon]}
                                                    <p>{characteristic.name}</p>
                                                </div>
                                                <p className={`atributo-indicador ${includesCharacteristic(characteristic) ? "" : 'escondido'}`}>Atributo adicionado!</p>
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
                                        <textarea className="redondo" placeholder="Escreva sobre as regras da casa" onBlur={(e) => { setInputRegras(e.target.value) }} ></textarea>
                                    </div>
                                </div>
                                <div className="col-12 mt-2 col-xl-4">
                                    <div className="d-flex flex-column politicas-box">
                                        <h6>Saúde e segurança</h6>
                                        <textarea className="redondo" placeholder="Escreva sobre os protocolos de saúde e segurança" onBlur={(e) => { setInputSaude(e.target.value) }}></textarea>
                                    </div>
                                </div>
                                <div className="col-12 mt-2 col-xl-4">
                                    <div className="d-flex flex-column politicas-box">
                                        <h6>Cancelamento</h6>
                                        <textarea className="redondo" placeholder="Escreva sobre os detalhes do processo de cancelamento" onBlur={(e) => { setInputCancelamento(e.target.value) }}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="criacao-img-holder mx-4 mt-4">
                            <div className="d-flex flex-column">
                                <h4>Carregar imagens</h4>
                                <h6>Adicione pelo menos 5 imagens</h6>
                                <div className="img-input-box p-3 d-flex redondo">
                                    <input type='url' className="redondo" placeholder="Insira o link da imagem" onChange={(e) => { setNewLink(e.target.value) }} value={newLink}></input>
                                    <div className="img-input-btn-box">
                                        <Button onClick={() => { imgLinkPusher() }}>Adicionar imagem</Button>
                                    </div>
                                </div>
                                {
                                    imgLinks?.map((savedLink) => {
                                        return (
                                            <ImgInputBox
                                                key={savedLink}
                                                linkName={savedLink}
                                                remover={(l) => { imgLinkRemover(l) }}
                                                updater={(oldName, newName) => { imgLinkUpdater(oldName, newName) }}
                                                currentEdit={currentEdit}
                                                setCurrentEdit={(boolean) => { setCurrentEdit(boolean) }}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="d-flex mx-4 mt-5 justify-content-center">
                            <Button className="mt-4 py-2 criacao-confirm-btn" onClick={() => { criacaoPostHandler() }}>Criar Reserva</Button>
                        </div>
                    </section>
                </Container>
            </div>
        </Template>
    )
}