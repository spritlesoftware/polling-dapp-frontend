import React from "react";
import "./Polling.css";
import Ract, { Component } from 'react'
import { useContext } from "react";
import { PollingContext } from "../Listcontext/listcontext";
import { useLocation } from "react-router-dom";
import "../App.css";
import { useNavigate } from "react-router-dom";
import SpritleLogo from "../assets/spritle_logo.png"
const vote = 0
function Polling(index) {
    const navigate = useNavigate();
    const poll_question = useContext(PollingContext);
    const location = useLocation();
    const thank = (({ vote: number }) => {
        navigate('/thankyou')
    })
    function Text() {
        const index = location.state
        console.log("index", index)
        const options = [poll_question.poll_question[index.id]]
        console.log("options", options)

        return (
            <> {
                options.map((element) => {
                    return (
                        <div>
                            <p className="para">{element.ques}</p>
                            <div className="radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        {element.option1}
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                    <label className="form-check-label" for="flexRadioDefault2">
                                        {element.option2}
                                    </label>

                                </div>
                            </div>
                            <button type="button" className="btn btn-dark" onClick={thank}>Submit</button>
                        </div>
                    )
                }
                )
            }
            </>
        )
    }
    return (
        <div>
            <div class="container-fluid">
                {/* <div class="row main-content bg-success text-center"> */}
                {/* <div class="col-md-4 text-center company__info"> */}
                {/* <img src={ SpritleLogo} alt="spritlelogo"/> */}
            </div>
            {/* <div class="col-md-8 col-xs-12 col-sm-12 login_form "> */}
            <div class="container-fluid">
                <div class="row">
                </div>
                <div class="row">
                </div>
                <div class="row">
                    <Text />
                </div>
            </div>
        </div>
    )
}

export default Polling