import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import CTAButton from '../CTAButton';


export default function DemoUserButton({setErrors}) {
    const history = useHistory();
    const dispatch = useDispatch()

    const handleDemoSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login("demo1@aa.io", "password"))

        if (data) {
            setErrors(data);
        } else {
            history.push('/');
        }
    };
    return (
        <CTAButton
            buttonText={"Log in as Demo User"}
            onClick={handleDemoSubmit}
        />
    )
}
