import React from "react";
import Money from "../assets/money.jpg"
import SpritleLogo from "../assets/spritle_logo.png"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Nobalance() {
    var navigate = useNavigate()
    const location = useLocation();
    const logout = async () => {
        try {
            localStorage.removeItem('openlogin_store');
            localStorage.removeItem('Web3Auth-cachedAdapter');
            navigate('/');
        } catch (err) { console.log(err) };
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
                                    <div className="center"><img src={Money} className="image" alt="thanks" /></div>
                                    <p className="img-para">you don't have a goerli.etherscan balance</p>
                                    <div className="center">
                                        <button className="btn btn-primary submit2" onClick={() => {
                                            navigate('/card')
                                        }}>Back</button>
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
export default Nobalance