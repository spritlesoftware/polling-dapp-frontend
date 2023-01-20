import React from "react";
import '../App.css'
import thanks from "../assets/thanks1.png"
import { useNavigate } from "react-router-dom";
import SpritleLogo from "../assets/spritle_logo.png"

function Thankpage() {
    var navigate = useNavigate()
    return (
        <>
        <div className="col-6">
          <img src={SpritleLogo} alt="spritlelogo" className="spritle-logo-card" />
        </div>
        <div className="col-6">
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
                                        navigate("/")
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
        </>
    )
}
export default Thankpage