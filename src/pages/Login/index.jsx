import "./styles.scss"
import Input from "../../components/form/Input";
import FraseLink from "../../components/template/FraseLink";
import { validaEmail} from "../../utilitarios/validaEmail";
import { validaSenhaLogin} from "../../utilitarios/validaEmail";
import { useEffect, useState, useRef } from "react";
import Button from "../../components/template/Button";
import Template from "../../components/template/Layout";
import useAuth from "../../app/auth/useAuth";
import { Container } from "react-bootstrap";
import Title from "../../components/tipografy/Title";
import { useNavigate } from "react-router-dom";
import CheckBox from "../../components/form/CheckBox";

export default function Login(){
    const { signIn, authenticated } = useAuth()
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("");
    const [emailMudou, setEmailMudou] = useState(false)
    const [passwordMudou, setPasswordMudou] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const inputRef = useRef(null)
    const [keepConnected, setKeepConnected] = useState(false)

    useEffect(()=>{
        inputRef?.current?.focus()
    },[])

    useEffect(() => {
        if(authenticated) {
            navigate("/")
        }
    }, [authenticated, navigate])

    // TODO
    function onSignInError(err) {
        // console.log(err)
    }

    function fazerLogin(){
        signIn(email, password, keepConnected, onSignInError)
    }

    function controlaInputOnBlur(event){
        let valorInput = event.target.value
        let inputAlterado = event.target.id

        if(valorInput !== ""){
            if(inputAlterado === "email-input"){
                if(validaEmail(email)){
                    if(emailError.length > 0 || emailError === "Email incorreto. Digite novamente"){
                        setEmailError("")
                    }
                }else{
                    setEmailError("Formato de email inválido")
                }
            }else{
                if(validaSenhaLogin(valorInput)){
                    if(passwordError.length > 0 || passwordError === "Senha incorreta. Digite novamente"){
                        setPasswordError("")
                    }
                }else{
                    setPasswordError("A senha tem no mínimo 6 caracteres")
                }
            }
        }
    }

    function controlaInputOnChange(event){
        let valorInput = event.target.value
        let inputAlterado = event.target.id


        if(inputAlterado === "email-input"){
            setEmail(valorInput)
            if(!emailMudou){
                setEmailMudou(true)
            }
        }else{
            setPassword(valorInput)
            if(!passwordMudou){
                setPasswordMudou(true)
            }
        }

        if(valorInput === ""){
            if(inputAlterado === "email-input"){
                setEmailError("Digite seu email")
            }else{
                setPasswordError("Digite sua senha")
            }
        }
    }
    
    function desabilitarBotao(){
        let boolean = true;

        if(passwordMudou && emailMudou){
            if(passwordError.length > 0 || emailError.length > 0){
                boolean = true;
            }else{
                boolean = false;
            }
        }
        return boolean
    
    }
    
    return(
        <Template>
            <div className="login-page-content">
                <Container className="form-container">
                    <div className="login-box py-4">
                        <Title className="pb-3" variant={"h1"} color="orange">
                            Iniciar sessão
                        </Title>
                        <div className="form-box">
                            <form className="d-flex flex-column" >
                                <Input 
                                    autoComplete='on'
                                    forLabel={"email-input"} 
                                    classLabel={"form-label input-padrao"} 
                                    labelTxt={"Email"}
                                    type={"email"} 
                                    classInput={`form-control ${emailError.length > 0 && emailMudou ? "input-negativo" : "" }`} 
                                    inputId={"email-input"} 
                                    onChange={(e)=>{controlaInputOnChange(e)}}
                                    blur={(e)=>{controlaInputOnBlur(e)}}
                                    value={email}
                                    selected={true}
                                    inputRef={inputRef}
                                >
                                {<p className={`warn ${emailError.length > 1 && emailMudou ? "" : "escondido"}`}>
                                    {emailError.length === 0 ? "lorem ipsum" : emailError}
                                </p>}
                                </Input>
                                <Input 
                                    autoComplete='on'
                                    forLabel={"senha-input"} 
                                    classLabel={"form-label input-padrao"} 
                                    labelTxt={"Senha"}
                                    type={"password"} 
                                    classInput={`form-control ${passwordError.length > 0 && passwordMudou  ? "input-negativo" : ""}`} 
                                    inputId={"senha-input"} 
                                    onChange={(e)=>{controlaInputOnChange(e)}}
                                    blur={(e)=>{controlaInputOnBlur(e)}}
                                    value={password}
                                >
                                {<p className={`warn ${passwordError.length > 0 && passwordMudou > 0 ? "" : "escondido"}`}>
                                    {passwordError.length === 0 ? "lorem ipsum" : passwordError}
                                </p>}
                                </Input>
                                <div className="d-flex gap-2 align-self-center  align-items-strech">
                                    <CheckBox id="toggle-check" value={keepConnected} onChange={setKeepConnected} />
                                    <label htmlFor="toggle-check">Mantenha-me conectado!</label>
                                </div>
                            </form>
                        </div>
                            <Button
                                className=" mt-3 large align-self-center"
                                variant={"primary"}
                                disabled={desabilitarBotao()}
                                onClick={()=>{fazerLogin()}}
                            >Entrar</Button>
                        <FraseLink frase="Ainda não possui uma conta?" url="/cadastro" link="Registre-se"/>
                    </div>
                </Container>
            </div>
        </Template>
    )
}