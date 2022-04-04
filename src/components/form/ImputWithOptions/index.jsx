import { useEffect, useState } from 'react'
import './styles.scss'

export default function ImputWithOptions (props) {
    const [optionsIsVisible, setOptionsIsVisible] = useState(false);

    function onSelectedOption(event, option, id) {
        event.stopPropagation()
        props.setValue(option)
        setOptionsIsVisible(false)
        props.onSelectedOption(id) // seta o id selecionado
    }
console.log(props.value)
    function onChangeHandler(event) {
        props.setValue(event.target.value)
        props.onSelectedOption(0) // remove o id selecionado pois o input esta sendo alterado
    }

    function onClickedInput(event) {
        event.stopPropagation()
        setOptionsIsVisible(true)
    }

    function filteredOptions() {
        const result = props.options.filter(({name}) => {
            if(typeof name === "string" && typeof props.value === "string") {
                return name.toUpperCase().includes(props.value.toUpperCase())
            }
            return name.includes(props.value)
        })
        return result.sort((opt1, opt2) => opt1.name > opt2.name ? 1 : -1)
    }

    useEffect(() => {
        document.body.addEventListener("click", () => {
            setOptionsIsVisible(false)
        })
    })

    return (
        <div className={`
                select-input px-2 rounded-1
                d-flex align-items-center gap-2
                ${props.className && props.className}
        `}>
            {props.icon && (
                <span className='icon'>
                    {props.icon}
                </span>
            )}
            <input
                autoComplete='off'
                className='flex-grow-1 imput-options'
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={onChangeHandler}
                onClick={onClickedInput}
            />
            {optionsIsVisible && (
                <ul className='list-unstyled shadow options p-3 rounded drop-down'>
                {(props.options && filteredOptions().length > 0) ?
                    filteredOptions().map(({name, id}) => {
                        return (
                            <li key={id}
                                className='mb-2 pb-2 d-flex gap-3'
                                value={id}
                                onClick={(event) => onSelectedOption(event, name, id)}
                            >
                                <span className='icon'>{props.secIcon || ""}</span>
                                <span>{name}</span>
                            </li>
                        )
                    }) : ("Sem resultados")
                }
                </ul>
            )}
        </div>
    )
}
