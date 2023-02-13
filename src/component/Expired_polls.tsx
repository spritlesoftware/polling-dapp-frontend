import React, { useEffect } from "react";
import { useState } from "react";
import { Accordion, Card, Button } from 'react-bootstrap';
import './Expired_polls.css'
import Header from "./Header";
import result from "../assets/image-asset.jpeg"
import Spinner from 'react-bootstrap/Spinner';

import { useNavigate } from "react-router-dom";
function Expired_polls() {
  const navigate = useNavigate();
  const [expiredresult, setExpiredresult] = useState<{ id: number, creator: string, result: string, createdAt: string, statement: string }[]>([{ id: 0, creator: "", result: "no", createdAt: "", statement: "" }])
  interface Data { id: number; creator: string; result: string; createdAt: string; statement: string }
  const [groupedData, setGroupedData] = useState<{ [key: string]: Data[] }>({});
  const [winner, setWinner] = useState("noresult")
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = getMonthName(0);
  const [loading, setLoading] = useState(true);

  function getMonthName(monthNumber: number): string {
    return monthNames[monthNumber - 1];
  }

  const logout = async () => {
    try {
      localStorage.removeItem('openlogin_store');
      localStorage.removeItem('Web3Auth-cachedAdapter');
      navigate('/');
      window.location.reload();
    } catch (err) { console.log(err) };
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND + "/api/expiredPolls", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + process.env.REACT_APP_BACKEND_TOKEN
      }
    }).then(async (res) => {
      await res.json().then(async (element) => {
        setExpiredresult(element)
        if (expiredresult.length !== 0) {
          setLoading(false)
        }
      }
      )
    }).catch(err => console.log(err));
  }, [])

  useEffect(() => {
    const groupedData: { [key: string]: Data[] } = {};

    expiredresult.forEach((item) => {
      const date = new Date(item.createdAt);
      const month = getMonthName(date.getMonth() + 1);
      const key = `${month}-${date.getFullYear()}`;
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(item);
    }

    );
    setGroupedData(groupedData);
  }, [expiredresult]);

  function handleClick(result: string) {
    setWinner(result)
  }
  const colors = ['white', 'aliceblue'];

  return (
    <div className="row ">
      <div className="col-lg-8 left-side">
        <Header />
        <div className="left">
          <img src={result} className="result-img"></img>
          {(winner == "noresult") &&
            <div className="left-content">
              <p>Select the poll and view the result</p>
              <button onClick={logout} className="btn btn-primary">Logout</button>
            </div>
            
            || (winner === "") &&
            <div className="left-content">
              <p>No one has voted in this poll.</p>
              <h3>Thank you!</h3>
              <button onClick={logout} className="btn btn-primary">Logout</button>
            </div>

            || (winner !== null) &&
            <div className="left-content" >
              <p>The winner is {winner}</p>
              <h3>Thank you!</h3>
              <button onClick={logout} className="btn btn-primary  expiry-logout">Logout</button>
            </div>

          }
        </div>
      </div>
      <div className="col-lg-4 expired-rightside text-area1">
        <div>
          {
            loading ? (
              <div className='loader'>
                <Spinner animation="border" /> Expired polling details Loading...
              </div>
            ) : (
              Object.keys(groupedData)[0] !== "undefined-NaN" &&
              <div>
                <Accordion defaultActiveKey={Object.keys(groupedData)[0]} >
                  {Object.entries(groupedData).map(([key, items]) => {

                    return (
                      <Accordion.Item eventKey={key}>
                        <Accordion.Header >
                          {key}
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="scroll">
                            {items.map((item, index) => (
                              <div key={item.id}>
                                <div onClick={() => { handleClick(item.result) }} className="statement" style={{ backgroundColor: colors[index % colors.length] }}>
                                  {item.statement}
                                </div>
                              </div>
                            ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    )

                  })}
                </Accordion>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Expired_polls
