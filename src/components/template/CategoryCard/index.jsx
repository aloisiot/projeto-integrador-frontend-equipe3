import "./styles.scss";
import Title from "../../tipografy/Title";
import { useDispatch } from "react-redux";
import { setCurrentCategory } from "../../../app/store/currentCategorySlice";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ category, style }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onClickHandler(event) {
        dispatch(setCurrentCategory(category))
        navigate("/search")
    }

    return (
        <div
            onClick={onClickHandler}
            style={style}
            className="component-category-card rounded-3 shadow overflow-hidden"
        >
            <div className="img-container">
                <img
                    src={category.urlImage}
                    alt={category.qualification}
                />
            </div>
            <div className="component-card-content p-2">
                <Title variant="h5" color="deep-blue">{category.qualification}</Title>
                <p className="description">{"954.767 resultados"}</p>
            </div>
        </div>
    )
}