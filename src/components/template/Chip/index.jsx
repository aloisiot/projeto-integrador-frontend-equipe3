import { XIcon } from '../../icons'
import './styles.scss'

export default function Chip({label, text, closeAction}) {
    return(
        <span className='py-1 px-3 rounded gap-3 d-inline-flex align-items-center component-chip'>
            {label && `${label}: `}
            <strong>{text && text}</strong>
            <button onClick={closeAction}>{XIcon}</button>
        </span>
    )
}