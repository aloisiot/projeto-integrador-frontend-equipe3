import Template from "../../components/template/Layout";
import DetalhesCabecalho from "../../components/ProductPageComponents/DetalhesCabecalho"
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../app/auth/useAuth";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { fetchBookingsByClient, selectAllBookings } from "../../app/store/slices/bookingsSlice";
import Button from "../../components/template/Button";
import ProductCardCollection from "../../components/template/ProductCardCollection";

export default function MinhasReservas(){
    const navigate = useNavigate()
    const { getToken, checkIsAuthenticated } = useAuth()
    const dispatch = useDispatch()
    const bookings = useSelector(selectAllBookings)

    useEffect(() => {
        if(! checkIsAuthenticated()) {
            Swal.fire({
                icon: 'info',
                title: 'Faça login para continuar'
            })
            .then(()=> navigate('/login'))
        }
    }, [navigate, checkIsAuthenticated])

    useEffect(() => {
        if(checkIsAuthenticated()) {
            const token = getToken()
            dispatch(fetchBookingsByClient({token}))
        }
    }, [dispatch, getToken, checkIsAuthenticated])
 
    return(
        <Template>
             <DetalhesCabecalho singleTitle={"Minhas reservas"} />
             <Container className="minhas-reservas-main-content">
                <section className="mt-3">
                    {bookings.length ? (
                        <Row className='d-flex row-cols-md-1 row-cols-lg-2'>
                            <ProductCardCollection
                                products={bookings.map(booking => booking.product)}
                                checkIn = "19:00"
                                startDate = "22/04/2022"
                                endDate = "25/04/2022"
                            />
                        </Row>
                    ) : (
                        <div className="d-flex flex-column align-items-center py-4">
                            <p style={{fontSize: "2rem", textAlign: "center"}}>
                                Você ainda não possui reservas
                            </p>
                            <Button onClick={() => navigate("/")}>
                                Volte para a página principal
                            </Button>
                        </div>
                    )}
                </section>
             </Container>
        </Template>
    )
}