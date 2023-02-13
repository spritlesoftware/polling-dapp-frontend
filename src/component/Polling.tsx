import React, { useState } from "react";
import "./Polling.css";
import { useContext } from "react";
import { PollingContext } from "../Listcontext/listcontext";
import { useLocation } from "react-router-dom";
import "../App.css";
import { useNavigate } from "react-router-dom";
import SpritleLogo from "../assets/spritle_logo.png";
import { useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';

function Polling() {
    const navigate = useNavigate();
    const poll_question_and_details = useContext(PollingContext);
    const poll_question = useContext(PollingContext);
    const location = useLocation();
    const [polling, setPolling] = useState<{ statement: string, candidates: string[] }>()
    const [vote_detail, setVote_detail] = useState<{ contractId: number, user: { username: string, usermail: string, publickey: string, privatekey: string }, candidate: string }>({ contractId: 0, user: { username: '', usermail: '', publickey: '', privatekey: '' }, candidate: "" })
    const [option1, setOption1] = useState<string>('0');
    const [loading, setLoading] = useState(false)
    const [thankspageloading, setThankspageloading] = useState(false)
    let errorpoll: any = ""

    const thank = (() => {
        submit()
    })

    useEffect(() => {
        const opt = option1
        setVote_detail({ contractId: id, user: { username: poll_question_and_details.userDetails.username, usermail: poll_question_and_details.userDetails.usermail, publickey: "", privatekey: "" }, candidate: option1 })
    }, [option1])

    const id = location.state.id
    const logout = async () => {
        try {
            localStorage.removeItem('openlogin_store');
            localStorage.removeItem('Web3Auth-cachedAdapter');
            navigate('/');
            window.location.reload();
        } catch (err) { console.log(err) };
    };

    const submit = async () => {
        setLoading(false);
        if (process.env.REACT_APP_BLOCKCHAIN_ACCOUNT === "true") {
            vote_detail.user.privatekey = await poll_question_and_details.userDetails.rpc.getPrivateKey();
        }
        fetch(process.env.REACT_APP_BACKEND + "/api/votingC_vote", {
            method: 'POST',
            body: JSON.stringify(
                vote_detail
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + process.env.REACT_APP_BACKEND_TOKEN
            }
        }).then((res) => res.json()).then(data => {
            console.log(thankspageloading, "thankspage")
            setThankspageloading(true)
        }).catch(err => console.log(err));
    }

    if (thankspageloading == true) {
        navigate('/thankyou')
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND + "/api/getPollDetails", {
            method: 'POST',
            body: JSON.stringify({
                contractId: id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + process.env.REACT_APP_BACKEND_TOKEN
            }
        }).then(async (res) => {
            await res.json().then(async (element) => {
                console.log(element, "element...............")
                setPolling(element)
                setLoading(true)
            }
            )
        }).catch(err => errorpoll = (err));
    }, [])

    const length1 = polling?.candidates.length

    function Text() {
        return (
            <>
                {
                    loading ? (
                        <div className="row">
                            <div className="col-lg-6 first">
                                <img src={SpritleLogo} alt="spritlelogo" className="spritle-logo-polling" />
                            </div>
                            <div className="col-lg-6">
                                <button onClick={logout} className="btn btn-primary logout-polling">Logout</button>
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
                                                <input className="form-check-input radio" type="radio" name="exampleRadios" id="exampleRadios2" value={ans} onChange={((e: React.ChangeEvent<HTMLInputElement>) => setOption1(e.target.value))} />
                                                <label className="form-check-label">
                                                    {ans}
                                                </label>
                                            </div>))
                                    }
                                    <button type="button" className="btn btn-primary submit" onClick={thank}>Submit</button>
                                </div>
                            </div>
                        </div>
                    ) : (<>
                        <div className='loader'>
                            <Spinner animation="border" /> Please wait...
                        </div>
                    </>
                    )
                }
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
