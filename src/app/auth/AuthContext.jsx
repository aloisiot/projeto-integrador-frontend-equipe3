import axios from "axios";
import jsCookie from "js-cookie";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AppContext = createContext();
export const userCookieName = "c7d5e61a-e190-43b0-b422-b56571c0005d"

export function AuthProvider(props) {
    const navigate = useNavigate()
    const [ authenticated, setAuthenticated ] = useState()

    const checkIsAuthenticated = useCallback(() => {
        return Boolean(getUserDetails()?.email !== undefined)
    }, [])

    useEffect(() => {
        setAuthenticated(checkIsAuthenticated())
    }, [authenticated, checkIsAuthenticated])

    async function signIn(email, password, keepConnected, onRejected) {
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
                const is403 = response.status === 403
                Swal.fire({
                    icon: "warning",
                    title: is403 ? "Credenciais inválidas" : "Algo não ocorreu bem",
                    text: "Tente novamente"
                })
            })
        
        /* if(resp.status === 200) {
            const options = keepConnected ? { expires: 30 } : undefined
            jsCookie.set(userCookieName, JSON.stringify(resp.data), options)
            setAuthenticated(true)
        } else {
            console.log(resp)
            Swal.fire({
                title: 'Credenciais inválidas',
                text: 'Usuário ou senha incorreto',
                icon: 'error'
            })
        } */
    }

    async function signUp (name, lastname, email, password) {
        const resp = await axios.post(
            `${process.env.REACT_APP_LINK_API}/auth/sign-up`,
            {name, lastname, email, password}
        )

        if(resp.status === 201) {
            Swal.fire(
                'Cadastro concluido',
                'Voce será redirecionado para a págona de login',
            ).then(() => {navigate("/login")})
        }
    } 

    function signOut() {
        jsCookie.remove(userCookieName)
        setAuthenticated(false)
    }

    function getUserDetails() {
        const cookie = jsCookie.get(userCookieName)
        if(cookie) {
            const cookieContent = JSON.parse(cookie)
            return cookieContent.userDetails
        }
    }

    function getTocken() {
        const cookie = JSON.parse(jsCookie.get(userCookieName))
        const tocken =  `${cookie.type} ${cookie.token}`
        return tocken
    }

    return (
        <AppContext.Provider value={{
            signIn,
            signOut,
            signUp,
            authenticated,
            getUserDetails,
            getTocken
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext