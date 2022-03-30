import "./styles.scss";
import Title from "../../tipografy/Title";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrentCategory, selectCurrentCategoriy, setCurrentCategory } from "../../../app/store/currentCategorySlice";
import { useEffect, useState } from "react";

export default function CategoryCard({ category, style }) {
    const [ isSelected, setIsSelected ] = useState(false)
    const dispatch = useDispatch()
    const currentCategory = useSelector(selectCurrentCategoriy)

    useEffect(() => {
        if(category.id === currentCategory.id) {
            setIsSelected(true)
        } else {
            setIsSelected(false)
        }
    }, [category, currentCategory])

    function onClickHandler(event) {
        const id = currentCategory.id
        if(id === undefined || id !== category.id) {
            dispatch(setCurrentCategory(category))
        } else {
            dispatch(removeCurrentCategory())
        }
    }

    return (
        <div
            onClick={onClickHandler}
            style={style}
            className={`
                component-category-card
                rounded-3 shadow
                overflow-hidden
                ${isSelected ? "active-category-card" : ""}
            `}
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