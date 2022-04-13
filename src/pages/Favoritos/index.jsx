import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../app/auth/useAuth";
import { fetchFavoritesByClient, selectAllProducts } from "../../app/store/slices/productsSlice";
import DetalhesCabecalho from "../../components/ProductPageComponents/DetalhesCabecalho";
import Template from "../../components/template/Layout";

export default function Favoritos() {
    const { getToken } = useAuth()
    const dispatch = useDispatch()
    const products = useSelector(selectAllProducts)

    useEffect(() => {
        dispatch(fetchFavoritesByClient(getToken()))
    }, [dispatch, getToken])

    return (
        <Template>
            <div className="favoritos-page-content">
                <DetalhesCabecalho
                    singleTitle={"Favoritos"}
                />
            </div>
        </Template>
    )
}