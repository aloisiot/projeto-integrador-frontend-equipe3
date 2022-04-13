import axios from "axios";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../app/auth/useAuth";
import { fetchFavoritesByClient, selectAllFavorites } from "../../app/store/slices/favoritesSlice";
import DetalhesCabecalho from "../../components/ProductPageComponents/DetalhesCabecalho";
import Button from "../../components/template/Button";
import Template from "../../components/template/Layout";
import ProductCardCollection from '../../components/template/ProductCardCollection';
import { currentProductIsFavorite } from "../DetalhesReserva";

export default function Favoritos() {
    const navigate = useNavigate()
    const { getUserId, getToken, checkIsAuthenticated } = useAuth()
    const dispatch = useDispatch()
    const favorites = useSelector(selectAllFavorites)

    useEffect(() => {
        if(! checkIsAuthenticated()) { // TODO alterar o uso do estado 'authenticated' para o uso da funçao
            Swal.fire({
                icon: 'info',
                title: 'Faça login para continuar'
            })
            .then(()=> navigate('/login'))
        }
    }, [navigate, checkIsAuthenticated])

    useEffect(() => {
        if(checkIsAuthenticated()) { // TODO alterar o uso do estado 'authenticated' para o uso da funçao
            dispatch(fetchFavoritesByClient({token: getToken()}))
        }
    }, [dispatch, getToken, checkIsAuthenticated])

    const removeFavorite = async (productId) => {
        const token = getToken()
        const userId = getUserId()
        const config = {
            headers: {
                Authorization: token
            }
        }
        const body = {
            clientId: userId,
            productId
        }
        if(await currentProductIsFavorite(productId, config)){
            await axios.put(`${process.env.REACT_APP_LINK_API}/clients/favorite-products`, body, config)
            dispatch(fetchFavoritesByClient({token}))
        }
    }

    return (
        <Template>
            <div style={{height: "100%"}} className="favoritos-page-content">
                <DetalhesCabecalho
                    singleTitle={"Favoritos"}
                />
                <Container>
                    <section className="mt-3">
                            {favorites.length ? (
                                <Row className='d-flex row-cols-md-1 row-cols-lg-2'>
                                    <ProductCardCollection
                                        secondaryAction={removeFavorite}
                                        secondaryActionText="Remover favorito"
                                        products={favorites}
                                    />
                                </Row>
                            ) : (
                                <div className="d-flex flex-column align-items-center py-4">
                                    <p style={{fontSize: "2rem", textAlign: "center"}}>
                                        Ainda não há produtos favoritados
                                    </p>
                                    <Button onClick={() => navigate("/")}>
                                        Volte para a página principal
                                    </Button>
                                </div>
                            )}
                    </section>
                </Container>
            </div>
        </Template>
    )
}