import { Logo, headerMenu, XiconWhite, heartIcon } from "../../icons";
import { Nav, Container } from "react-bootstrap";
import ButtonsUI from "../HeaderItens/ButtonsUI"
import ProfileUI from "../HeaderItens/ProfileUI"
import { useState } from "react";
import { useLocation } from "react-router-dom";
import './style.scss';
import useAuth from "../../../app/auth/useAuth";
import Link from "../../tipografy/Link";

export default function Header() {
    const { getUserDetails, checkIsAuthenticated } = useAuth()
    const [sidebarActive, setSidebarActive] = useState(false)

    let location = useLocation();
    let urlAtual = location.pathname

    function opacityTrigger() {
        if (sidebarActive) {
            return "open-animation"
        } else {
            return "close-animation"
        }
    }

    return (
        <header className="default-header shadow">
            <div className={`sidebar-bkg ${sidebarActive ? "sidebar-bkg-visible" : ""}`}></div>
            <div className={`sidebar-holder ${sidebarActive ? "sidebar-visible" : ""}`}>
                <div className="orange-box">
                    <div>
                        <button onClick={() => { setSidebarActive(false) }} className={opacityTrigger()}>
                            {XiconWhite}
                        </button>
                    </div>
                    <div>
                        <div className="sidebar-span-holder">

                            <span className={opacityTrigger()}>Digital Booking</span>
                        </div>
                    </div>
                </div>
                <div className="header-second-section">
                    <div className={opacityTrigger()}>
                        {urlAtual !== "/cadastro" && (
                            <Link to="/cadastro">
                                Criar conta
                            </Link>
                        )}
                        {urlAtual !== "/login" && urlAtual !== "/cadastro" ? <div className="sidebar-section-separator"></div> : <></>}

                        {urlAtual !== "/login" && (
                            <Link to="/login">
                                Fazer Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <Container className="py-2">
                <Nav className="justify-content-between align-items-center">
                    <div className="logo-slogan">
                        <Link name="to-home-link" role="link" to="/">{Logo}</Link>
                        <span className="slogan">A reserva ideal você encontra aqui</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        {checkIsAuthenticated() ? (
                            <>
                                <Link title="favoritos" to="/favoritos" className="justify-self-end">
                                    {heartIcon}
                                </Link>
                                <ProfileUI user={getUserDetails()} />
                            </>
                        ) :  <ButtonsUI />}
                        <div className="menu-header">
                            <button onClick={() => { setSidebarActive(true) }}>{headerMenu}</button>
                        </div>
                    </div>
                </Nav>
            </Container>
        </header>
    )
}