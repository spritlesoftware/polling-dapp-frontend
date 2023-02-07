import React from "react";
import Money from "../assets/dollar.png"
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




// import React, { useEffect } from "react";
// import { useState } from "react";
// import { Accordion, Card, Button } from 'react-bootstrap';
// function Expired_polls(){
//     const [finalresult, setFinalresult] = useState<{ id: number, creator: string, result: string,createdAt:string, statement: string }[]>([{ id: 0, creator: "", result: "no",createdAt:"",statement: "" }])
//     interface Data {
//       id: number;
//       creator: string;
//       result: string;
//       createdAt: string;
//       statement: string;
//     }
//     const [groupedData, setGroupedData] = useState<{ [key: string]: Data[] }>({});
// const data: Data[] = finalresult
    
    
//   useEffect(()=>{
//     fetch(process.env.REACT_APP_BACKEND + "/api/expiredPolls", {
//       method: 'GET',
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//         'Authorization': 'Bearer ' + process.env.REACT_APP_BACKEND_TOKEN
//       }
//     }).then(async (res) => {
//       await res.json().then(async (element) => {
//         setFinalresult(element)
//       }
//       )
//     }).catch(err => console.log(err));
// },[])
// useEffect(() => {
//   const groupedData: { [key: string]: Data[] } = {};
//   data.forEach((item) => {
//     const date = new Date(item.createdAt);
//     const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

//     if (!groupedData[key]) {
//       groupedData[key] = [];
//     }

//     groupedData[key].push(item);
//   });

//   setGroupedData(groupedData);
// }, [data]);

// return (
//  <Accordion defaultActiveKey="0">
//   {Object.entries(groupedData).map(([key, items], index) => (
//     <Card key={key}>
//       <Accordion as={Card.Header} eventKey={index.toString()}>
//         {key}
//       </Accordion>
//       <Accordion.Collapse eventKey={index.toString()}>
//         <Card.Body>
//           {items.map((item) => (
//             <div key={item.id}>
//               <p>{item.statement}</p>
//             </div>
//           ))}
//         </Card.Body>
//       </Accordion.Collapse>
//     </Card>
//   ))}
// </Accordion>
// /* <Accordion>
// <Accordion.Item eventKey="0">
//   <Accordion.Header>View Result</Accordion.Header>
//   <Accordion.Body>
//   {Object.entries(groupedData).map(([key, items], index) => (
//     <Card key={key}>
//       <Accordion.Header as={Card.Header} eventKey={index.toString()}>
//         {key}
//       </Accordion.Header>
//       <Accordion.Collapse eventKey={index.toString()}>
//         <Card.Body>
//           {items.map((item) => (
//             <div key={item.id}>
//               <p>{item.statement}</p>
//             </div>
//           ))}
//         </Card.Body>
//       </Accordion.Collapse>
//     </Card>
//   ))}
//   </Accordion.Body>
// </Accordion.Item>



// </Accordion>
//  */

// );
// };




// export default Expired_polls



