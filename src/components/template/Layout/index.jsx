import './styles.scss'
import Footer from "../Footer";
import Header from "../Header";
import LoadingSpinner from '../LoadingSpinner';

export default function Template({children, bgColor}){
    return(
        <div
            className={
                "default-template " +
                "d-flex flex-column " +
                "align-items-cener " +
                `default-bg-${bgColor ? bgColor : "white"}`
            }
        >
            <LoadingSpinner/>
            <Header/>
            <main className="main-content flex-grow-1">
                {children}
            </main>
            <Footer/>
        </div>
    )
}
