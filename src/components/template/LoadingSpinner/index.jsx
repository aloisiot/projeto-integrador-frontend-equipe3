import { useSelector } from "react-redux";
import { selectProcessState } from "../../../app/store/slices/prossesSlice";
import { LoadIcon } from "../../icons";

export default function LoadingSpinner() {
    const isLoading = useSelector(selectProcessState)
    
    return (
        <>
        {isLoading && (
            <div
                className={`
                    component-loading-spinner
                    d-flex align-items-center
                    justify-content-center
                `}
                style={{
                    position: "fixed",
                    zIndex: 999,
                    backgroundColor: "#FFFB",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    width: "100vw"
                }}    
            >
                {LoadIcon}
            </div>
        )}
        </>
    )
}
