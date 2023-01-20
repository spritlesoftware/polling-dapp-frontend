import React from "react";
import "./Polling.css";
import Ract, { Component } from 'react'
import { useContext } from "react";
import { PollingContext } from "../Listcontext/listcontext";
import { useLocation } from "react-router-dom";
import "../App.css";
import { useNavigate } from "react-router-dom";
import SpritleLogo from "../assets/spritle_logo.png";

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
                        <div> <div className="col-6">
                            <img src={SpritleLogo} alt="spritlelogo" className="spritle-logo-card" />
                        </div>
                            <div className="col-6">
                                {/* <button onClick={logout} className="logout-btn">Logout</button>   */}
                            </div>
                            <div className="card p-3 mb-2 ques-card"  >
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <div className="ms-2 c-details">


                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5">   <h6 className="heading">{element.ques}</h6>

                                <div class="form-check">
  <input class="form-check-input radio" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
  <label class="form-check-label" for="exampleRadios1">
    {element.option1}
  </label>
</div>
<div class="form-check">
  <input class="form-check-input radio" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
  <label class="form-check-label" for="exampleRadios2">
    {element.option2}
  </label>
  
</div>
<button type="button" className="btn btn-primary submit" onClick={thank}>Submit</button>
                                    </div>

                                </div>
                              
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
            </div>
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