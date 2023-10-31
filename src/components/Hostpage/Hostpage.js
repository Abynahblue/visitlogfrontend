import {  useState } from "react"
import { useNavigate } from "react-router-dom"
import { API } from "../../api/axiosClient"
import { Button } from "react-bootstrap"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Center } from "@chakra-ui/react"


const HostPage = () => {
  const [formStep, setFormStep] = useState(1)
  const [hostEmail, setHostEmail] = useState('');
  const [qr, setQr] = useState('');
  const [code, setCode] = useState({
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: ''
  })
  const [msg, setMsg] = useState('');
  const [encryptedCode, setEncryptedCode] = useState('')

  const [guestEmail, setguestEmail] = useState('');
  const navigate = useNavigate()
  
  const handleHostFormSubmit = async(e) => {
    e.preventDefault();
    try
    {   
      const response = await API.post('/verify-email', { hostEmail });
      console.log(response.data);
      setEncryptedCode(response.data.data)
      toast.success("Email verification request sent successfully")
      localStorage.setItem("hostEmail", hostEmail)
      setFormStep(2)
      navigate()
    } catch (error)
    {
      console.log(error)
      toast.error("Invalid email, Please enter a valid email");
      const msg = error.response ? error.response.data.message : "Invalid email, Please enter a valid email"
      setMsg(msg)
    }
  };
  
  const handleCodeFormSubmit = async (e) => {
    e.preventDefault();

    const enteredCode = code.digit1 + code.digit2 + code.digit3 + code.digit4;
    console.log(enteredCode);
    if (enteredCode.length !== 4)
    {
      toast.error("Invalid code. Please enter a valid code")
      return;
    }
    try{
     const response = await API.post('/confirmation-code', { code: encryptedCode, generatedCode: enteredCode })
      toast.success(response.data.message)
      setFormStep(3)
    }catch(error) {
      console.error("Error: ", error)
      toast.error("Error occurred while verifying code, please make to enter correct code")
    }
  }


  const handleChange = event => {
    setguestEmail(event.target.value);
  };
  const handleSumbit = event => {
    event.preventDefault()
    const hostEmail = localStorage.getItem("hostEmail")
    API.post('/setAppointment', { hostEmail,email: guestEmail }).then(response => {
      setQr(response.data.data.qrCode)
      setMsg(response.data.data.message)
      setTimeout(() => {
        setFormStep(1)
      }, 2000)
    }) ;
  }
  console.log(qr);
    return (
        <div className="host_container">
        <h2 className="subtitle">Generate Qr Code for Guest</h2>
        {formStep === 1 &&(
            <form className="add_form" onSubmit={handleHostFormSubmit} style={{marginTop: "80px"}}>
            <h4 className="title">Please enter your email</h4>
            <input
              type="text"
              name="hostEmail"
              required="required"
              placeholder="Host Email"
              onChange={(e) => setHostEmail(e.target.value)}
          />
            <Button type="submit">
              Verify Email
            </Button></form>
        )}
            {formStep === 2 &&(
            <form className="add_form" onSubmit={handleCodeFormSubmit} style={{marginTop: "80px"}}>
            <h4 className="title">Please enter the code sent to your email</h4>
            <div className="confirmation-code-container">
            <input
              type="text"
              maxLength="1"
              name="digit1"
              required="required"
              value={code.digit1}
              onChange={(e) => setCode({...code, digit1: e.target.value})}
            />
            <input
              type="text"
              maxLength="1"
              name="digit2"
              required="required"
              value={code.digit2}
              onChange={(e) => setCode({...code, digit2: e.target.value})}
            />
            <input
              type="text"
              maxLength="1"
              name="digit3"
              required="required"
              value={code.digit3}
              onChange={(e) => setCode({...code, digit3: e.target.value})}
            />
            <input
              type="text"
              maxLength="1"
              name="digit4"
              required="required"
              value={code.digit4}
              onChange={(e) => setCode({...code, digit4: e.target.value})}
            />
                </div>
                <Button type="submit" className="add_btn">
              Send
          </Button>
          </form>
        )}
            {/* <input
              type="text" 
              name="sign_out"
              required="required"
              placeholder="Time out"
              onChange={""}
              value={""}
            /> */}
                {/* <input
              type="text"
              name="hostEmail"
              required="required"
              placeholder="Host Email"
              onChange={""}
              value={""} 
              
            /> */}
        {formStep === 3 && (
            <form className="add_form" onSubmit={handleSumbit} style={{ marginTop: "80px" }}>
            <h4 className="title">Please enter the guest's email</h4>
            <input
              type="text"
              name="guestEmail"
              required="required"
              placeholder="Guest Email"
              value={guestEmail}
              onChange={handleChange}
              />
            <Button type="submit" className="add_btn">
              Set Appointment
            </Button>
          </form>
        )}
        <Center display="flex" flexDirection="column">
            <p>{msg}</p>
          </Center>
        </div>
    )
}

export default HostPage