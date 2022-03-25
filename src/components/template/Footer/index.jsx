import "./styles.scss"
import { Container, Nav } from "react-bootstrap";
import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from "../../icons";

export default function Footer(){
    return(
        <footer className="component-default-footer py-4">
            <Container className="d-flex align-items-center justify-content-between">
                <div>  
                    <span className="copy">©2021 Digital Booking</span>
                </div>
                <Nav className="gap-4 align-items-center">
                    {FacebookIcon}
                    {LinkedInIcon}
                    {TwitterIcon}
                    {InstagramIcon}
                </Nav>
            </Container>
        </footer> 
    )
} 