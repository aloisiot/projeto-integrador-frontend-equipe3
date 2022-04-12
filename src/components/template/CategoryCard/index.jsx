import "./styles.scss";
import Title from "../../tipografy/Title";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentCategoriy, setCurrentCategory } from "../../../app/store/slices/currentCategorySlice";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ category, style }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentCategory = useSelector(selectCurrentCategoriy)
    const { urlImage, qualification, productsQuantity } = category

    function onClickHandler(event) {
        dispatch(setCurrentCategory(category))
        navigate("/search")
    }

    return (
        <div
            onClick={onClickHandler}
            style={style}
            className={`
                ${currentCategory.id === category.id ? "active" : ""}
                component-category-card
                rounded-3 shadow overflow-hidden
            `}
        >
            <div className="img-container">
                <img
                    src={urlImage}
                    alt={qualification}
                />
            </div>
            <div className="component-card-content p-2">
                <Title variant="h5" color="deep-blue">{qualification}</Title>
                <p className="description">{`${productsQuantity} ${productsQuantity > 1 ? "resultados" : "resultado"}`}</p>
            </div>
        </div>
    )
}