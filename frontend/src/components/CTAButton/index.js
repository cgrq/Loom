import "./CTAButton.css"
export default function CTAButton({
    buttonText, // Self explainatory, button text
    onClick, //
}){
    return(
        <button className="cta-button" onClick={onClick ? onClick : ()=>{}}>
            {buttonText}
        </button>
    )
}
