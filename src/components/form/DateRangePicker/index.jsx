import './styles.scss'
import { useEffect, useState } from "react";
import { DateRange } from 'react-date-range';
import { dateFormatPtBt } from "../../../utilitarios/dateFormat";
import { CalendarioIcon } from '../../icons';
import Button from '../../template/Button';
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';

export default function DateRangePicker({className, dateRange, setDateRange}) {
    const [visible, setVisible ]= useState(false) 

    const initialState = [
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
    ]

    function handlerDateRangeChange(newDateRange) {
        const newState = {
            ...dateRange,
            ...newDateRange
        }
        setDateRange([newState]);
    }

    function renderDates() {
        return (
            dateFormatPtBt(dateRange[0]?.startDate)
            + " - " +
            dateFormatPtBt(dateRange[0]?.endDate)
        )
    }

    useEffect(() => {
        document.body.addEventListener("click", () => {
            if(visible) setVisible(false)
        })
    })

    return (
        <div
            className={`constainer-date-range-picker ${className}`}
            onClick={event => event.stopPropagation()}
        >
            <div
                className={`
                date-view p-2 rounded-1
                d-flex gap-3 align-items-center
                `}
                onClick={() => setVisible(! visible)}
            >
                <span className='icon d-flex align-items-center'>
                    {CalendarioIcon}
                </span>
                <span>
                    {dateRange !== null ? renderDates() : "Check in - Check out"}
                </span>
            </div>
            {visible && (
                <div className={`
                    date-range-picker
                    rounded-1 shadow
                    overflow-hidden
                `}>
                    <DateRange
                        rangeColors={['#F0572D']}
                        color='#F0572D'
                        minDate={new Date()}
                        editableDateInputs={true}
                        onChange={item => handlerDateRangeChange(item.selection)}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange !== null ? dateRange : initialState}
                        showDateDisplay={false}
                        locale={ptBR}
                        weekdayDisplayFormat="EEEEEE"
                    />
                    <div className='p-2'>
                        <Button
                            full
                            variant="primary"
                            onClick={() => setVisible(! visible)}
                        >
                            Aplicar
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}