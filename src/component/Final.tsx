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

function Result() {
    var navigate = useNavigate()
    const location = useLocation();
    const [vals, setVals] = useState()
    const contractId = location.state.id;
    const val: any = "0"
    const poll_question_and_details = useContext(PollingContext);
    const poll_question = useContext(PollingContext);
    const [loading, setLoading] = useState(false)
    const [announce, setAnnounce] = useState<{ user: { privatekey: string }, contractId: number }>({ user: { privatekey: poll_question_and_details.userDetails.privatekey }, contractId: contractId })
    const date = location.state.date
    const role_id = location.state.role_id
    const creator = location.state.creator

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
                    console.log("****111")
                    setVals(element.data);
                    console.log("****")
                    result1()

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
        result1()
    }, [])


    function result1() {
        fetch(process.env.REACT_APP_BACKEND + "/api/test-collections/" + contractId + "?fields[0]=result", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + process.env.REACT_APP_BACKEND_TOKEN
            }
        }).then(async (res) => {
            await res.json().then(async (element) => {
                setVals(element.data.attributes.result);
                setLoading(true);

            }
            )
        }).catch(err => console.log(err));
    }

    return (
        <>
            {
                loading ? (
                    <div className="container-fluid cardpg">
                        <div className="row">
                            <div className="col-lg-6">
                                <img src={SpritleLogo} alt="spritlelogo" className="spritle-result" />
                                <div><img src={Announcement} alt="thanks" className="announce" /></div>
                            </div>
                            {/* <div className="col-lg-6 ryt"> */}
                                {
                                    vals === null && (
                                        <div className="col-lg-6 ryt">
                                            
                                            <div className="testing">
                                            
                                                <button className="btn btn-primary back" onClick={() => { navigate('/card') }}>Back</button>
                                                <button onClick={logout} className="btn btn-primary resultlogout">Logout</button>
                                            </div>
                                            <img src={Thumbsup} className="res" alt="thanks" />
                                            <div className="result-content">
                                                <p className="res1">Poll will be expiring on {date} </p>
                                                <p className="date1">Results will be announced after the expiry date</p>
                                                {creator == poll_question_and_details.userDetails.usermail &&
                                                    <button onClick={announce_result} className="btn btn-primary announceresult">Announce Result</button>
                                                }
                                                <div className="empty"></div>
                                            </div>
                                            </div>
                                        
                                    )
                                }
                                {
                                    vals !== null && (
                                        <div className="final">
                                            <button className="btn btn-primary back2" onClick={() => { navigate('/card') }}>Back</button>
                                            <button onClick={logout} className="btn btn-primary resultlogout">Logout</button>
                                            <p className="thank-you">Thank you!</p>
                                            <p className="vals">The winner is {vals} </p>
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                    // </div>
                ) :
                    (<>
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