import './styles.scss'
import { Link as LinkReactRouter } from 'react-router-dom'

export default function Link(props){

    return (
        <LinkReactRouter className='component-link' {...props}>
            {props.children}
        </LinkReactRouter>
    )
}