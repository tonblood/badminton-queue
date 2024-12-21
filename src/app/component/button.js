import styles from "../styles/button.module.css"

const Default_Button = ({onClick, children, className, style}) => (
    <button
        onClick={onClick}
        className={`btn ${className}`}
        style={style}
    >
        {children}
    </button>
)

export default Default_Button