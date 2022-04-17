import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { actions as processReducerActions } from "../../app/store/slices/prossesSlice"
import Button from "../../components/template/Button"
import Template from "../../components/template/Layout"
import Link from "../../components/tipografy/Link"
import Title from "../../components/tipografy/Title"

export default function ValidaEmail() {
    const params = useParams()
    const dispatch = useDispatch()
    const [emailStatus, setEmailIsValid] = useState("processing")

    const checkEmail = useCallback(async (userId, emailHash) => {
        const url = `${process.env.REACT_APP_LINK_API}/auth/validate-email/${userId}/${emailHash}`
        const now = Date.now()
        
        dispatch(processReducerActions.add("check-email-" + now))
        await axios.get(url)
            .then(resp => setEmailIsValid(resp.data === true ? 'valid' : "invalid"))
            .catch(() => setEmailIsValid("invalid"))
        
        dispatch(processReducerActions.remove("check-email-" + now))
    }, [dispatch])

    useEffect(() => {
        const {userId, emailHash} = params
        if(userId && emailHash) {
            console.log(params)
            checkEmail(userId, emailHash)
        }
    }, [params, checkEmail])

    return (
        <Template>
            <Container style={{height: "70vh"}} className={
                "check-email-page-content " +
                "d-flex flex-column " +
                "align-items-center " +
                "justify-content-center "
            }>
                <div style={{display: "inline"}} className={
                    "d-flex flex-column " +
                    "p-4 rounded border " +
                    "align-items-center " +
                    "justify-content-center "
                }>
                    {emailStatus === "processing" && (
                        <>
                            <Title className="text-center">Aguarde...</Title>
                            <p>Estamos processando a solicitação</p>
                        </>
                    )}
                    {emailStatus === "valid" && (
                        <>
                            <Title className="text-center">Email verificado!</Title>
                            <p>Entre com sua conta</p>
                            <Link to="/login">
                                <Button>Entrar</Button>
                            </Link>
                        </>
                    )}
                {emailStatus === "invalid" && (
                        <>
                            <Title className="text-center">Link de verificação inválido</Title>
                            <p>cadastre-se novamente</p>
                            <Link to="/cadastro">
                                <Button>Cadastrar-me</Button>
                            </Link>
                        </>
                    )}
                </div>
            </Container>
        </Template>
    )
}
