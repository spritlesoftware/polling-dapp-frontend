import React from "react";
import { useState } from "react";
import SpritleLogo from "../assets/spritle_logo.png";
function View_results(){
    const [old_poll,setOld_poll]=useState([{id:0,creator: "",result: "",statement: ""}])
    return(
        <div>
      <div>
        <div className="row  cards1">
          <div className="col-lg-7 first">
            <img src={SpritleLogo} alt="spritlelogo" className="spritle-logo1" />
          </div>
          <div className="col-lg-3 logout-button">
           
            {/* {Create_poll()} */}
            {/* <button className='btn btn-primary view_results' onClick={View_resultpage}>View Results</button> */}
          </div>
          <div className="col-lg-2 buttons">
            {/* <button onClick={logout} className="btn btn-primary logout-test">Logout</button> */}
            {/* {User_detail()} */}
          </div>
        </div>
        <div>
          <div className="container mt-5 mb-3">
            <div className="row">
              {/* {
                loading ? (
                  <Spinner animation="border" />
                ) : (
                  resuse.map((element, id) => {
                    return (
                      <div className='col-lg-4' key={id}>
                        <div className="card p-3 mb-2 card3 "  >
                          <div onClick={() => { handleclick(element) }}>
                            <div className="d-flex justify-content-between"  >
                              <div className="d-flex flex-row align-items-center"  >
                                <div  > <img className='voteicon' src={voteicon} /></div>
                                <div className="ms-2 c-details">
                                  <h6 className="mb-0"></h6> <span>Expiring on: {element.expiring}</span>
                                </div>
                              </div>
                              <div className="badge">    <span style={{
        color: element.voted ? 'red' : (element.creator  ===  poll_question_and_details.userDetails.usermail ? 'green' : 'blue')
      }}>{(element.voted == true) && "Voted" || ((element.creator == poll_question_and_details.userDetails.usermail) && "Owner" || "Vote")}</span> </div>
                            </div>
                            <div className="mt-5 ">   <h6 className="heading ">{element.statement}</h6>
                              <p ></p>
                              <div className="mt-5">
                                <progress id="file" value={element.votesCount} max="100"></progress>
                                <div className="mt-3"> <span className="text1">{element.votesCount} Vote <span className="text2"></span></span> </div>
                              </div>
                            </div>
                          </div>
                          <p></p>
                        </div>
                      </div>
                    )
                  })
                )
              }
              {
                resuse == null && (
                  <center><b>You have not signed in</b></center>
                )
              } */}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
export default View_results