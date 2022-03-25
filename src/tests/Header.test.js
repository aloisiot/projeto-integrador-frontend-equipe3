import Header from "../components/template/Header";
import {render, screen} from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";


describe("Testes do Header", () =>{

    test("Verifica a existencia do link da Logo", ()=>{
        render(
        <MemoryRouter>
            
            <Header/>
        </MemoryRouter>)

        const linkLogo = screen.getAllByRole("link")

        expect(linkLogo).toBeInTheDocument()
    })

})