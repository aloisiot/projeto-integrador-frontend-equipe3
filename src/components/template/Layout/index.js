import './styles.scss'
import Footer from "../Footer";
import Header from "../Header";

export default function Template({children, bgColor}){
    return(
        <div
            className={`
                default-template
                d-flex flex-column
                align-items-cener
                default-bg-${bgColor ? bgColor : "white"}
            `}
        >
            <Header/>
            <main className="main-content flex-grow-1">
                {children}
            </main>
            <Footer/>
        </div>
    )
}
