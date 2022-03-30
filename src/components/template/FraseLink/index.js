import {useNavigate} from "react-router";
import "./styles.scss"


export default function FraseLink({frase,link,url}){
    const navigate = useNavigate();
    return(
        <div className="link-login-holder">
            <p>{frase}</p> <button onClick={()=> {navigate(url)}}>{link}</button>
        </div>
    )
}