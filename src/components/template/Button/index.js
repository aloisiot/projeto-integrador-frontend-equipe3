import './style.scss'

export default function Button(props) {
    return (
        <button
            className={`
                btn
                ${props.full === true ? "full" : ""}
                ${props.variant ? props.variant : "primary"}
                ${props.className ? props.className : ""}
            `}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}