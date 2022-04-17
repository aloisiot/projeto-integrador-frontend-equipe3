import axios from "axios";
import jsCookie from "js-cookie";
import { createContext, useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const AppContext = createContext();
export const userCookieName = "c7d5e61a-e190-43b0-b422-b56571c0005d"

export function AuthProvider(props) {
    const [ authenticated, setAuthenticated ] = useState()

    const checkIsAuthenticated = useCallback(() => {
        return Boolean(getToken() !== null)
    }, [])

    useEffect(() => {
        setAuthenticated(checkIsAuthenticated())
    }, [authenticated, checkIsAuthenticated])

    async function signIn(email, password, keepConnected) {
        jsCookie.remove(userCookieName)
        const payload = {email, password}
        await axios
            .post(`${process.env.REACT_APP_LINK_API}/auth/sign-in`, payload)
            .then(resp => {
                const options = keepConnected ? { expires: 30 } : undefined
                jsCookie.set(userCookieName, JSON.stringify(resp.data), options)
                setAuthenticated(true)
            })
            .catch(({response}) =>{
                if(response?.data?.error === "account not ferified") {
                    Swal.fire({
                        icon: "warning",
                        title: "Conta não verificada",
                        text: "Enviamos um link de verificação para o seu email. Tente novamente após a verificação!"
                    })
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: response.status === 403 ? "Credenciais inválidas" : "Algo não ocorreu bem",
                        text: "Tente novamente"
                    })
                }
            })
    }

    async function signUp (name, lastname, email, password) {
        return await axios.post(
            `${process.env.REACT_APP_LINK_API}/auth/sign-up`,
            {name, lastname, email, password}
        )
        .then(() => {
            Swal.fire({
                icon: "success",
                title: 'Cadastro concluido',
                text: 'Enviamos um link de verificação para o seu email. Verifique sua conta antes de fazer entrar!',
            })
            return true
        })
        .catch(({response}) => {
            const invalidEmailError = "Ja existe um usuário com o email especificado"
            const internalError = "Erro interno. Tente novamente!"
            Swal.fire({
                icon: "info",
                title: "Ops!!!",
                text: response?.data?.error === invalidEmailError ? invalidEmailError : internalError
            })
            return false
        })
    }

    const getUserId = () => {
        return getUserDetails()?.id
    }

    function signOut() {
        jsCookie.remove(userCookieName)
        setAuthenticated(false)
        window.location.reload()
    }

    function getUserDetails() {
        const cookie = jsCookie.get(userCookieName)
        if(cookie) {
            const cookieContent = JSON.parse(cookie)
            return cookieContent.userDetails
        }
    }

    function getToken() {
        try {
            const cookie = JSON.parse(jsCookie.get(userCookieName))
            const tocken =  `${cookie.type} ${cookie.token}`
            return tocken
        } catch {
            return null
        }
    }

    return (
        <AppContext.Provider value={{
            signIn,
            signOut,
            signUp,
            authenticated,
            getUserDetails,
            getToken,
            getUserId,
            checkIsAuthenticated
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext