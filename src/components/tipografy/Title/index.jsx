import "./styles.scss"
export default function Title ({children, variant, color, className}) {
    const defaultColor = color ? color : "deep-blue"
    
    switch(variant) {
        default: 
            return <h1 className={`component-title ${defaultColor} ${className}`}>{children}</h1>
        case "h2":
            return <h2 className={`component-title ${defaultColor} ${className}`}>{children}</h2>
        case "h3":
            return <h3 className={`component-title ${defaultColor} ${className}`}>{children}</h3>
        case "h4":
            return <h4 className={`component-title ${defaultColor} ${className}`}>{children}</h4> 
        case "h5": 
            return <h5 className={`component-title ${defaultColor} ${className}`}>{children}</h5> 
        case "h6":
            return <h6 className={`component-title ${defaultColor} ${className}`}>{children}</h6>
        }
}