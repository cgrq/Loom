import "./CTAButton.css"
export default function CTAButton({
    buttonText, // Self explainatory, button text
    onClick, // Function to run on button click
    formSubmitButton, // Boolean indicating whether or not it's a form submission button
    warningButton = false, // Boolean indicating whether or not to change hover animation color to red which serves as a warning indicator (for delete, log out, etc.)
}){
    return(
        <button className={`cta-button  ${warningButton ? "warning-button" : "standard-button"}`} onClick={onClick ? onClick : ()=>{}} type={formSubmitButton ? "submit" : "button"}>
        {buttonText}
        </button>
    )
}
