import ProductCard from "../components/template/ProductCard";
import {render, screen} from "@testing-library/react"
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";


const produto = {
    id: 0,
    images:[{
        url: "/img/rhema-kallianpur-uocSnWMhnAs-unsplash.jpg"
    }],
    name: "produto",
    city:{
        name: "cidade"
    },
    description: "a"
}

describe("Testes do ProductCard", ()=>{

    test("Verifica a existencia do botão Ver Mais", ()=>{
        render(
            <MemoryRouter>
                <ProductCard product={produto}/>
            </MemoryRouter>
            )

        const cardButton = screen.getByRole("button")

        expect(cardButton).toBeInTheDocument()
    })

})