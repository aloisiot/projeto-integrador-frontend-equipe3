import "./styles.scss"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import DateRangePicker from "../../form/DateRangePicker"
import ImputWithOptions from "../../form/ImputWithOptions"
import { LocaleStrockIcon, Locale } from "../../icons"
import Title from "../../tipografy/Title"
import Button from "../Button"
import { useDispatch, useSelector } from "react-redux"
import { fetchCities, selectAllCities } from "../../../app/store/citiesSlice"
import { fetchProductsByCity } from "../../../app/store/productsSlice"

export default function SearchBar() {
    const dispatch = useDispatch()
    const [selectedCityName, setSelectedCityName] = useState("");
    const [ selectedCityId, setSelectedCityId] = useState(0);
    const cities = useSelector(selectAllCities);

    useEffect(() => {
        if(! cities.length) {
            dispatch(fetchCities())
        }
    }, [dispatch, cities])

    function onSubmit(event){
        if(selectedCityId !== 0) {
            dispatch(fetchProductsByCity(selectedCityId))
        }
    }

    return (
        <div className="search-bar py-4">
            <Container>
                <Title color="white">Busque as melhores ofertas perto de você</Title>
                <div className="d-flex flex-wrap gap-2 search-bar-content">
                    <ImputWithOptions
                        className="flex-grow-1"
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
                    <DateRangePicker className="flex-grow-1"/>
                    <Button
                        onClick={onSubmit}
                        className="flex-grow-1"
                        variant="primary"
                    >Buscar</Button>
                </div>
            </Container>
        </div>
    )
}