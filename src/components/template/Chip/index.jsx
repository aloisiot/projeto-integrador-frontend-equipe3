import { XIcon } from '../../icons'
import './styles.scss'

export default function Chip({label, text, closeAction}) {
    return(
        <span className='component-chip py-1 px-3 rounded gap-3 d-inline-flex align-items-center'>
            {label && <div className='label'>{label + ": "}</div>}
            {text &&<strong className='text'> {text}</strong>}
            <button onClick={closeAction}>{XIcon}</button>
        </span>
    )
}