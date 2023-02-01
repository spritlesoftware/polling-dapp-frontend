import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import SpritleLogo from "../assets/spritle_logo.png"
import Announcement from "../assets/Announce.png"
import { useContext } from "react";
import { PollingContext } from "../Listcontext/listcontext";
import Thumbsup from "../assets/Thumbsup.png"
import { useNavigate } from "react-router-dom";
import './Final.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

function Result() {
    var navigate = useNavigate()
    const location = useLocation();
    const [vals, setVals] = useState()
    const element = location.state.id;
    const val: any = "0"
    const poll_question_and_details = useContext(PollingContext);
    const poll_question = useContext(PollingContext);
    const [loading, setLoading] = useState(false)
    const date = location.state.date

    const logout = async () => {
        try {
            localStorage.removeItem('openlogin_store');
            localStorage.removeItem('Web3Auth-cachedAdapter');
            navigate('/');
        } catch (err) { console.log(err) };
    };

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND + "/api/test-collections/" + element + "?fields[0]=result", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + process.env.REACT_APP_BACKEND_TOKEN
            }
        }).then(async (res) => {
            await res.json().then(async (element) => {
                console.log("result: ", element.data.attributes.result);
                setVals(element.data.attributes.result);
                setLoading(true);
            }
            )
        }).catch(err => console.log(err));
    }, [])

    return (
        <>
            {
                loading ? (
                    <div>
                        <div className="row">
                            <div className="col-lg-6 first">
                                <img src={SpritleLogo} alt="spritlelogo" className="spritle-logo-polling" />
                            </div>
                            <div className="col-lg-6">
                                <button onClick={logout} className="btn btn-primary logout-polling">Logout</button>
                            </div>
                            <div>

                                {
                                    vals === null && (
                                        <div className="val1">
                                            <div className=""><img src={Announcement} className="announce" alt="thanks" />  </div>
                                            <div className="thankyou-wrapper">
                                                <p className="">Poll will be expiring on {date} </p>
                                                <p>Results will be announced after the expiry date</p>
                                                <button className="btn btn-primary back" onClick={() => { navigate('/card') }}>Back</button>
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
                                        <button className="btn btn-primary" onClick={() => { navigate("/card") }}>Back to Vote</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ) : (<>
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span className="visually-hidden">Loading...</span>
                    </Button>{' '}
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        Loading...
                    </Button>
                </>
                )
            }
        </>
    )
}
export default Result