import "./styles.scss"
import Template from "../../components/template/Layout";
import FraseLink from "../../components/template/FraseLink";
import Input from "../../components/form/Input";
import Button from "../../components/template/Button";
import useAuth from "../../app/auth/useAuth";
import { useState } from "react";
import Title from "../../components/tipografy/Title";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actions as processReducerActions } from "../../app/store/slices/prossesSlice";
import { useNavigate } from "react-router-dom";

export default function Cadastro(){
    const { signUp } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [btnIsDisable, setBtnIsDisable] = useState(false);

    async function cadastrar() {
        if (name.length > 0 && lastname.length > 0){
            setBtnIsDisable(true)
            const now = Date.now()
            dispatch(processReducerActions.add("sign-up-process-" + now))
            const isUp = await signUp(name, lastname, email, password)
            dispatch(processReducerActions.remove("sign-up-process-" + now))
            if(isUp) {
                navigate("/login")
            }
        }
    }

    window.scrollTo(0,0)

    return(
        <Template>
            <div className="cadastrar-page-content py-4">
                <Container className="form-container d-flex flex-column align-items-center">
                    <div className="cadastro-box d-flex flex-column gap-1">
                    <Title className="pb-3" variant={"h1"} color="orange">
                        Crie sua conta
                    </Title>
                    <form className="cadastro-form-box mb-5">
                        <div className="double-input-box">
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            classLabel={"form-label"}
                            labelTxt={"Nome"}
                            type={"text"}
                            classInput={"form-control"}
                            inputId={"nome-input"}/>
                         <Input
                            onChange={(e) => setLastname(e.target.value)}
                            classLabel={"form-label"}
                            labelTxt={"Sobrenome"}
                            type={"text"}
                            classInput={"form-control"}
                            inputId={"sobrenome-input"}
                        />      
                        </div>
                        <Input
                            classLabel={"form-label"}
                            labelTxt={"Email"}
                            type={"email"}
                            classInput={"form-control"}
                            inputId={"email-cadastro-input"}
                        />
                        <Input
                            classLabel={"form-label"}
                            labelTxt={"Confirmar Email"}
                            type={"email"}
                            classInput={"form-control"}
                            inputId={"email-confirma-input"}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            classLabel={"form-label"}
                            labelTxt={"Senha"}
                            type={"password"} classInput={"form-control"}
                            inputId={"senha-cadastro-input"}
                            onChange={(e) => setPassword(e.target.value)}
                        />    
                    </form>
                    <Button disabled={btnIsDisable} className="align-self-center large" onClick={() => cadastrar()} variant={"primary login"}>
                        Cadastrar
                    </Button>
                    <FraseLink frase="Já possui uma conta?" url="/login" link="Faça login"/>
                    </div>
                </Container>
            </div>
        </Template>
    )
}