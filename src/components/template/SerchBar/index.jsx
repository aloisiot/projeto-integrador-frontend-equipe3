import "./styles.scss"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import DateRangePicker from "../../form/DateRangePicker"
import ImputWithOptions from "../../form/ImputWithOptions"
import { LocaleStrockIcon, Locale } from "../../icons"
import Title from "../../tipografy/Title"
import Button from "../Button"
import { useDispatch, useSelector } from "react-redux"
import { fetchCities, selectAllCities } from "../../../app/store/slices/citiesSlice"
import { formatDateForTransfer } from "../../../utilitarios/dateFormat";
import Swal from "sweetalert2"
import { setCityId, setDateRange } from "../../../app/store/slices/searchParamsSlice"
import { useNavigate } from "react-router-dom"

export default function SearchBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedCityName, setSelectedCityName] = useState("");
    const [selectedCityId, setSelectedCityId] = useState(0);
    const cities = useSelector(selectAllCities);
    const [dateRangeFromPiker, setDateRangeFromPiker] = useState(null)

    useEffect(() => {
        if(! cities.length) {
            dispatch(fetchCities())
        }
    }, [dispatch, cities])

    function getFormatedDateRange() {
        if(dateRangeFromPiker?.length) {
            const formatedDateRange = {
                startDate: formatDateForTransfer(dateRangeFromPiker[0].startDate),
                endDate: formatDateForTransfer(dateRangeFromPiker[0].endDate)
            }
            return formatedDateRange
        }
        return {}
    }

    function onSubmit(event){
        const formatedDateRange = getFormatedDateRange()
        dispatch(setDateRange(getFormatedDateRange()))
        dispatch(setCityId(selectedCityId))
        const startDate = formatedDateRange?.startDate
        const endDate = formatedDateRange?.endDate

        if(selectedCityId || startDate || endDate) {
            navigate("/search")
        } else {
            Swal.fire({
                icon: 'info',
                title: "Opss!",
                text: "Voce deve indicar uma cidade ou intervalo de datas para a pesquisa!"
            })
            return;
        }
    }

    return (
        <div className="component-search-bar py-4">
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
                    <DateRangePicker
                        className="flex-grow-1"
                        dateRange={dateRangeFromPiker}
                        setDateRange={setDateRangeFromPiker}
                    />
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
