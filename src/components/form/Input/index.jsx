import "./styles.scss"


export default function Input(props){

    return(
        <div>
            <label 
                htmlFor={props.inputId} 
                className={props.classLabel}
            > 
                {props.labelTxt}
            </label>
            <input
            autoComplete={props.autoComplete}
                type={props.type} 
                className={props.classInput} 
                id={props.inputId} 
                onChange={props.onChange}
                onBlur={props.blur} 
                value={props.value}
                selected={props.selected}
                disabled={props.disabled}
                ref={props.inputRef}
            />
            {props.children}
        </div>
    )
}