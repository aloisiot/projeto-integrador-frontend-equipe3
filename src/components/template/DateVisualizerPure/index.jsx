import { DateRange } from "react-date-range";
import { useState } from "react";
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';

function getMonthQTD() {
    return window.innerWidth >= 992 ? 2 : 1
}

export default function DateVisualizerPure({onchange,range,disabledDay}) {

    const [monthQTD, setMonthQTD] = useState(getMonthQTD())
    
    const initialState = [
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'datasSelecao'
        }
    ] 

    window.addEventListener("resize", () => {
        setMonthQTD(getMonthQTD())
    })


    return (
        <div className="calendarioCampo redondo p-3 margin-top-padrao">
            <DateRange
                editableDateInputs={true}
                rangeColors={["#F0572D"]}
                showDateDisplay={getMonthQTD() === 2 ? true : false}
                color='#F0572D'
                minDate={new Date()}
                locale={ptBR}
                months={monthQTD}
                direction="horizontal"
                onChange={onchange}
                moveRangeOnFirstSelection={true}
                ranges={range !== null ? range : initialState}
                weekdayDisplayFormat="EEEEEE"
                disabledDay={disabledDay}
            />
        </div>
    )
}
