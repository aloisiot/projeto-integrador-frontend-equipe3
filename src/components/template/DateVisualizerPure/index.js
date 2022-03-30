import { DateRange } from "react-date-range";
import { useState } from "react";
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';

function getMonthQTD() {
    return window.innerWidth >= 993 ? 2 : 1
}

export default function DateVisualizerPure({onchange,range}) {

    const [monthQTD, setMonthQTD] = useState(getMonthQTD())
    

    const initialState = [
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
    ] 

    window.addEventListener("resize", () => {
        setMonthQTD(getMonthQTD())
    })


    return (
        <div className="calendarioCampo redondo p-3">
            <DateRange
                editableDateInputs={true}
                rangeColors={["#F0572D"]}
                color='#F0572D'
                minDate={new Date()}
                locale={ptBR}
                months={monthQTD}
                direction="horizontal"
                onChange={onchange}
                moveRangeOnFirstSelection={false}
                ranges={range !== null ? range : initialState}
                weekdayDisplayFormat="EEEEEE"
            />
        </div>
    )
}