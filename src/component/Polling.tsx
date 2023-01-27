
import React, { useState } from "react";
import "./Polling.css";
import { useContext } from "react";
import { PollingContext } from "../Listcontext/listcontext";
import { useLocation } from "react-router-dom";
import "../App.css";
import { useNavigate } from "react-router-dom";
import SpritleLogo from "../assets/spritle_logo.png";
import { useEffect } from "react";
const vote = 0
function Polling() {
    const navigate = useNavigate();
    const poll_question_and_details = useContext(PollingContext);
    const poll_question = useContext(PollingContext);
    const location = useLocation();
    const [polling, setPolling] = useState<{ statement: string, candidates: string[] }>()
    const [vote_detail, setVote_detail] = useState<{ contractId: number,user: { username: string, usermail: string, publickey: string, privatekey: string }, candidate: string}>({ contractId:0, user: { username: '', usermail: '', publickey: '', privatekey: '' }, candidate:"" })
    const [option1, setOption1] = useState<string>('0');

    const thank = (() => {
        submit()
        navigate('/thankyou')
    })

    useEffect(() => {
        const opt =option1
     setVote_detail({contractId:id,user: { username: poll_question_and_details.userDetails.username, usermail: poll_question_and_details.userDetails.usermail, publickey: "", privatekey: "" }, candidate:option1})
    console.log(option1,"opt************")
      }, [option1])



    const id = location.state.id
    console.log("index ", id);
    const options = {};
    
    function submit() {
        fetch("https://polling.spritle.com/api/votingC_vote", {
          method: 'POST',
          body: JSON.stringify(
            vote_detail
          ),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer 51ca94dc9a4674a334c4c548f9d95c1f8881a776f579487e4afb07c9c5f3b247f9d5198c7852173c3daab0d4de80ed55b03f1badafc3c9900dca6efefb50db210f236d4f5dc7345f21398eb47cf79169d4fed0145879c9e8781997318b1cdc702726c6ae143d6283525e04c3f36e326e013f947cf9f6330787828843528028fc'
          }
        }).then((res) => res.json()).then(data => {
        }).catch(err => console.log(err));
      }

    useEffect(() => {
        fetch("https://polling.spritle.com/api/getPollDetails", {
            method: 'POST',
            body: JSON.stringify({
                contractId: id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer 51ca94dc9a4674a334c4c548f9d95c1f8881a776f579487e4afb07c9c5f3b247f9d5198c7852173c3daab0d4de80ed55b03f1badafc3c9900dca6efefb50db210f236d4f5dc7345f21398eb47cf79169d4fed0145879c9e8781997318b1cdc702726c6ae143d6283525e04c3f36e326e013f947cf9f6330787828843528028fc'
            }
        }).then(async (res) => {
            await res.json().then(async (element) => {
                console.log(element, "element...............")
                setPolling(element)
            }
            )
        }).catch(err => console.log(err));
    }, [])
    console.log(polling, "polling.............")
    const length1 = polling?.candidates.length
    function Text() {
        console.log({ polling })
        console.log(length1)

        return (
            <>
                <div>
                    <div className="col-6">
                        <img src={SpritleLogo} alt="spritlelogo" className="spritle-logo-card" />
                    </div>
                    <div className="col-6">
                    </div>
                    <div className="card p-3 mb-2 ques-card"  >
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <div className="ms-2 c-details">
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">   <h6 className="heading">{polling?.statement}</h6>
                            {
                                polling?.candidates.map(ans => (
                                    <div className="form-check">
                                        <input className="form-check-input radio" type="radio" name="exampleRadios" id="exampleRadios2" value={ans} onChange={((e: React.ChangeEvent<HTMLInputElement>) => setOption1(e.target.value ))} />
                                        <label className="form-check-label">
                                            {ans}
                                        </label>
                                    </div>))
                            }

                            <button type="button" className="btn btn-primary submit" onClick={thank}>Submit</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div>
            <div className="container-fluid">
            </div>
            <div className="container-fluid">
                <div className="row">
                </div>
                <div className="row">
                </div>
                <div className="row">
                    <Text />
                </div>
            </div>
        </div>
    )
}

export default Polling
{/* <Form.Control as="textarea" value={detail?.statement} onChange={((e:any) => setDetail({...detail,user: {username: poll_question_and_details.userDetails.username, usermail:poll_question_and_details.userDetails.usermail,publickey:"",privatekey:""}, statement:e.target.value, candidates: []}))} className='text-area1' placeholder='Enter your question' rows={3} /> */ }