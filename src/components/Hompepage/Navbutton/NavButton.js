import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"


const Navbutton = ({url, displayText }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(url)
    }
    return (
        <Button  className="add_btn"
            onClick={handleClick}
        >{displayText}</Button> 
    )
}
export default Navbutton