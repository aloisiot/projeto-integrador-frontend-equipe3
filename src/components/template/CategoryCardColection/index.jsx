import './styles.scss'
import CategoryCard from "../CategoryCard";

export default function CategoriesColection({categories, className}) {
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