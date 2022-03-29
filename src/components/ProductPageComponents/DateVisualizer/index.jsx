import { useState } from "react";
import { DateRange } from "react-date-range";
import Button from "../../template/Button";

import ptBR from 'date-fns/esm/locale/pt-BR/index.js';

import "./style.scss"

function getMonthQTD() {
    return window.innerWidth >= 993 ? 2 : 1
}

export default function DateVisualizer(props) {
    const [monthQTD, setMonthQTD] = useState(getMonthQTD())
    const [currentRange, setCurrentRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);


    window.addEventListener("resize", () => {
        setMonthQTD(getMonthQTD())
    })

    return (
        <div className="container calendarioCampo">
            <h3 className=" py-3 tituloSecundario">{props.calendarioTitle}</h3>
            {props.temSeparador &&
                <div className="separador-box">
                    <div className="separador"></div>
                </div>
            }
            <div className="row g-0 data-campo-holder py-3">
                <div className=" dateRange-holder col col-12 col-lg-6 shadow rounded-1">
                    <DateRange
                        editableDateInputs={true}
                        rangeColors={["#F0572D"]}
                        color='#F0572D'
                        minDate={new Date()}
                        locale={ptBR}
                        months={monthQTD}
                        direction="horizontal"
                        onChange={item => setCurrentRange([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={currentRange}
                        weekdayDisplayFormat="EEEEEE"
                    />
                </div>
                <div className="col  texto-calendario-box p-3">
                    <div>
                        <p>Selecione a data de início e término no calendário</p>
                        <Button className="detalhes-btn">Fazer reserva</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}