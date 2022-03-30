import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import Button from "../../Button"

export default function ButtonsUI() {

    
    let location = useLocation();
    let urlAtual = location.pathname
    const navigate = useNavigate();


    return (
        <div className="d-flex gap-2 headerItem">
            {urlAtual !== "/cadastro" && (
                <Button
                    variant="bordered"
                    onClick={() => { navigate("/cadastro") }}
                >Criar Conta</Button>
            )}
            {urlAtual !== "/login" && (
                <Button
                    variant="bordered"
                    onClick={() => { navigate("/login") }}
                >Entrar</Button>
            )}
        </div>
    )
}