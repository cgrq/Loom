import CTAButton from "../CTAButton"
import "./FormWrapperComponent.css"

export default function FormWrapperComponent({
    title, // Title of form
    onSubmit, // Function to run on submission of form
    children, // Render input fields as children passed into wrapper component
    submitButtonText, // Text to display on submit button
    lowerComponent: LowerComponent, // Component to be rendered under the form (this is for delete and sign in as demo user buttons)
}) {
    return (
        <div className="form-wrapper">
            <h1 className="form-wrapper-title">
                {title}
            </h1>
            <form
                className="form-wrapper-form"
                onSubmit={onSubmit}
                encType="multipart/form-data"
            >
                {
                    children // Render input fields as children passed into wrapper component
                }
                <div className="form-wrapper-button-wrapper">
                    <CTAButton buttonText={submitButtonText} formSubmitButton={true}
                />
                </div>
            </form>
            {LowerComponent && <LowerComponent />  /* This is for "delete" and "sign in as demo user" button components */}
        </div>
    )
}
