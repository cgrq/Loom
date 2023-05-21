import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "../../store/session";


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
        <button onClick={handleDemoSubmit}>
            Demo user
        </button>
    )
}
