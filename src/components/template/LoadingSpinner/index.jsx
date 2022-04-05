import { useState } from "react";
import { processWatcher } from "../../../app/processWatcher";
import { LoadIcon } from "../../icons";

export default function LoadingSpinner() {
    const [loading, setLoading] = useState(false)
    processWatcher.subscribe(setLoading)
    
    return (
        <>
        {loading && (
            <div
                className={`
                    component-loading-spinner
                    d-flex align-items-center
                    justify-content-center
                `}
                style={{
                    zIndex: 999,
                    backgroundColor: "#FFFB",
                    position: "absolute",
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
