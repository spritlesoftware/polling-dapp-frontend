import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import SpritleLogo from "../assets/spritle_logo.png"
import Announcement from "../assets/Jan-Success_1.jpg"
import { useContext } from "react";
import { PollingContext } from "../Listcontext/listcontext";
import Thumbsup from "../assets/transparantresult.png"
import { useNavigate } from "react-router-dom";
import './Final.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Header from "../Header";

function Result() {
    var navigate = useNavigate()
    const location = useLocation();
    const [vals, setVals] = useState(null)
    const [winner, setWinner] = useState()
    const contractId = location.state.id;
    const val: any = "0"
    const poll_question_and_details = useContext(PollingContext);
    const poll_question = useContext(PollingContext);
    // const [loading, setLoading] = useState(true)
    const [announce, setAnnounce] = useState<{ user: { privatekey: string }, contractId: number }>({ user: { privatekey: poll_question_and_details.userDetails.privatekey }, contractId: contractId })
    const date = location.state.date
    const role_id = location.state.role_id
    const creator = location.state.creator
    const [oldresult, setOldResult] = useState(location.state.winner)

    const announce_result = async () => {
        fetch(process.env.REACT_APP_BACKEND + "/api/announceResult", {
            method: 'POST',
            body: JSON.stringify(
                announce
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + process.env.REACT_APP_BACKEND_TOKEN
            }
        }
        )
            .then(async (res) => {
                await res.json().then(async (element) => {
                    setVals(element);
                    setWinner(element?.candidate)
                    final_result()
                })
            })
            .catch(err => console.log(err));
    }
    const logout = async () => {
        try {
            localStorage.removeItem('openlogin_store');
            localStorage.removeItem('Web3Auth-cachedAdapter');
            navigate('/');
        } catch (err) { console.log(err) };
    };

    useEffect(() => {

        final_result()
        if (oldresult !== undefined) {
            setVals(oldresult)
            setWinner(oldresult)
        }
    }, [])

    function final_result() {
        fetch(process.env.REACT_APP_BACKEND + "/api/test-collections/" + contractId + "?fields[0]=result", {
            method: 'GET',

            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + process.env.REACT_APP_BACKEND_TOKEN
            }
        }).then(async (res) => {
            await res.json().then(async (element) => {
                setVals(element.data.attributes.result);
            }
            )
        }).catch(err => console.log(err));
    }

    return (
        <>
            {
                <div className="container-fluid cardpg">
                    <div className="row before-result">
                        <div className="col-lg-6">
                            <Header />
                            <div><img src={Announcement} alt="thanks" className="announce" /></div>
                        </div>
                        {
                            vals === null ?
                                <div className="col-lg-6 ryt">
                                    <div className="testing">
                                        <button className="btn btn-primary back" onClick={() => { navigate('/card') }}>Back</button>
                                        <button onClick={logout} className="btn btn-primary resultlogout">Logout</button>
                                    </div >
                                    <div className="result-page">
                                        <img src={Thumbsup} className="thumbsup-img" alt="thumbsup" />
                                        <div className="">
                                            <p className="expiring-on">Poll will be expiring on {date} </p>
                                            <p className="">Results will be announced after the expiry date</p>
                                            {creator == poll_question_and_details.userDetails.usermail &&
                                                <button onClick={announce_result} className="btn btn-primary announce-result">Announce Result</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                : <>
                                    <div className="col-lg-6 ryt">
                                        <div className="testing">
                                            <button className="btn btn-primary back" onClick={() => { navigate('/card') }}>Back</button>
                                            <button onClick={logout} className="btn btn-primary resultlogout">Logout</button>
                                        </div>
                                        <div className="result-page">
                                            <img src={Thumbsup} className="thumbsup-img" alt="thanks" />
                                            <h3>Thank you! </h3>
                                            <p className="the-winner">The winner is {winner}</p>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            }
        </>
    )
}
export default Result