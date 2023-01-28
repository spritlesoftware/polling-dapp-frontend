import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import SpritleLogo from "../assets/spritle_logo.png"
import Announcement from "../assets/Announce.png"
import { useContext } from "react";
import { PollingContext } from "../Listcontext/listcontext";
import Thumbsup from "../assets/Thumbsup.png"
import { useNavigate } from "react-router-dom";
import './Final.css'

function Result() {
    var navigate = useNavigate()
    const location = useLocation();
    const [vals, setVals] = useState()
    const element = location.state.id;
    const val: any = "0"
    const poll_question_and_details = useContext(PollingContext);
    const poll_question = useContext(PollingContext);

    const logout = async () => {
        await poll_question_and_details.userDetails.w3auth.logout();
        navigate('/')
    };

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND + "/api/test-collections/" + 2 + "?fields[0]=result", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + process.env.REACT_APP_BACKEND_TOKEN
            }
        }).then(async (res) => {
            await res.json().then(async (element) => {
                console.log("result: ", element.data.attributes.result);
                setVals(element.data.attributes.result);
            }
            )
        }).catch(err => console.log(err));
    }, [])

    return (
        <div>
            <div className="row">
                <div className="col-lg-6 first">
                    <img src={SpritleLogo} alt="spritlelogo" className="spritle-logo-polling" />
                </div>
                <div className="col-lg-6">
                    <button onClick={logout} className="btn btn-primary logout">Logout</button>
                </div>
                <div>
                    {
                        vals === null && (
                            <div className="val1">
                                <div className=""><img src={Announcement} className="announce" alt="thanks" />  </div>
                                <div className="thankyou-wrapper">
                                    <p className="">Results will be announced !</p>
                                        <button className="btn btn-primary back"onClick={() => { navigate("/card")}}>Back to Vote</button>
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    vals !== null && (
                        <div className="val2">
                            <div className=""><img src={Thumbsup} className="thumb" alt="thanks" /></div>
                            <p className="winner">The winner is {vals}</p>
                            <button className="btn btn-primary" onClick={() => {navigate("/card")}}>Back to Vote</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default Result