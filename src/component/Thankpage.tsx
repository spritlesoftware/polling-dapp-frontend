import React from "react";
import '../App.css'
import thanks from "../assets/thanks1.png"
import { useNavigate } from "react-router-dom";
function Thankpage() {
    var navigate = useNavigate()
    return (
        <>
            <section className="login-main-wrapper">
                <div className="main-container">
                    <div className="login-process">
                        <div className="login-main-container">
                            <div className="thankyou-wrapper">
                                <div className="center"><img src={thanks} className="image" alt="thanks" /></div>
                                <p className="img-para">Results will be announced soon!</p>
                                <div className="center">
                                    <button className="back" onClick={() => {
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