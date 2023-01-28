import React from "react";
import '../App.css'
import thanks from "../assets/thanks1.png"
import { useNavigate } from "react-router-dom";
import SpritleLogo from "../assets/spritle_logo.png"
import { useContext } from "react";
import { PollingContext } from "../Listcontext/listcontext";
import { useLocation } from "react-router-dom";

function Thankpage() {
    var navigate = useNavigate()
    const poll_question_and_details = useContext(PollingContext);
    const poll_question = useContext(PollingContext);

    const logout = async () => {
        await poll_question_and_details.userDetails.w3auth.logout();
        navigate('/')
    };
    return (
        <>
            <div className="row">
                <div className="col-lg-6 first">
                    <img src={SpritleLogo} alt="spritlelogo" className="spritle-logo-polling" />
                </div>
                <div className="col-lg-6">
                    <button onClick={logout} className="btn btn-primary logout-polling">Logout</button>
                </div>

                <section className="login-main-wrapper">
                    <div className="main-container">
                        <div className="login-process">
                            <div className="login-main-container">
                                <div className="thankyou-wrapper">
                                    <div className="center"><img src={thanks} className="image" alt="thanks" /></div>
                                    <p className="img-para">Results will be announced soon!</p>
                                    <div className="center">
                                        <button className="btn btn-primary submit2" onClick={() => {
                                            navigate("/card")
                                        }}>Back to Vote</button>
                                    </div>
                                    <div className="clr"></div>
                                </div>
                                <div className="clr"></div>
                            </div>
                        </div>
                        <div className="clr"></div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default Thankpage
