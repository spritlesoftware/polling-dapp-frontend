import React, { useEffect } from "react";
import { useState } from "react";
import { Accordion, Card, Button } from 'react-bootstrap';
import './Expired_polls.css'
import Header from "./Header";
import result from "./assets/image-asset.jpeg"

import { useLocation, useNavigate } from "react-router-dom";
function Expired_polls() {
  const navigate = useNavigate();
  const [finalresult, setFinalresult] = useState<{ id: number, creator: string, result: string, createdAt: string, statement: string }[]>([{ id: 0, creator: "", result: "no", createdAt: "", statement: "" }])
  interface Data {
    id: number;
    creator: string;
    result: string;
    createdAt: string;
    statement: string;
  }
  const [groupedData, setGroupedData] = useState<{ [key: string]: Data[] }>({});
  const [winner, setWinner] = useState("")
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const month = getMonthName(0);

  function getMonthName(monthNumber: number): string {
    return monthNames[monthNumber - 1];
  }

  const logout = async () => {
    try {
      localStorage.removeItem('openlogin_store');
      localStorage.removeItem('Web3Auth-cachedAdapter');
      navigate('/');
    } catch (err) { console.log(err) };
  };

  const data: Data[] = finalresult
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND + "/api/expiredPolls", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + process.env.REACT_APP_BACKEND_TOKEN
      }
    }).then(async (res) => {
      await res.json().then(async (element) => {
        setFinalresult(element)
      }
      )
    }).catch(err => console.log(err));
  }, [])

  useEffect(() => {
    const groupedData: { [key: string]: Data[] } = {};
    data.forEach((item) => {
      const date = new Date(item.createdAt);
      const month = getMonthName(date.getMonth() + 1);
      const key = `${month}-${date.getFullYear()}`;

      if (!groupedData[key]) {
        groupedData[key] = [];
      }

      groupedData[key].push(item);
    });

    setGroupedData(groupedData);
  }, [data]);

  function handleClick(result: string) {
    setWinner(result)
  }

  return (

    <div className="row">
      <div className="col-lg-8 left-side">
        <Header />
        <img src={result} className="result"></img>

        {winner === "" ?
          <div>
            <p className="select">Select the poll and view the result</p>
            <button onClick={logout} className="btn btn-primary expiry-logout">Logout</button>
          </div>
          :
          <div>
            <p className="select1">The winner is {winner}</p>
            <h3 className="select1">Thank you!</h3>
            <button onClick={logout} className="btn btn-primary  expiry-logout">Logout</button>
          </div>
        }
      </div>
      <div className="col-lg-4 expired-rightside text-area1">
        <div>
          {Object.entries(groupedData).map(([key, items]) => (
            <div key={key}>
              <Accordion defaultActiveKey={activeAccordion}>
                <Accordion.Item eventKey={key}>
                  <Accordion.Header onClick={() => setActiveAccordion(key === activeAccordion ? null : key)}>
                    {key}
                  </Accordion.Header>
                  <div className="scroll">
                    {items.map((item) => (
                      <div key={item.id}>
                        <Accordion.Body onClick={() => { handleClick(item.result); setActiveAccordion(null); }}>
                          {item.statement}
                        </Accordion.Body>
                      </div>
                    ))}
                  </div>
                </Accordion.Item>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>



  );
};




export default Expired_polls
