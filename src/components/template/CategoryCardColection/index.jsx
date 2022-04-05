import './styles.scss'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, selectAllCategories } from "../../../app/store/slices/categoriesSlice";
import CategoryCard from "../CategoryCard";

export default function CategoriesColection({className}) {
    const dispatch = useDispatch()
    const categories = useSelector(selectAllCategories);
    
    useEffect(() => {
        if(! categories.length) {
            dispatch(fetchCategories())
        }
    }, [dispatch, categories])

    return (
        <section className={`component-categories-colection list-unstyled gap-4 ${className ? className : ""}`}>
            {categories?.map?.(category => {
                return (
                    <div key={category.id}>
                        <CategoryCard style={{width: "100%"}} category={category}/>
                    </div>
                )
            })}
        </section>
    )
}