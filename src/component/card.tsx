
import { Link, } from 'react-router-dom';
import './card.css';
import voteicon from "../assets/newimage.png"
import React, { useRef } from "react";
import Ract, { Component } from 'react'
import { useContext } from "react";
import { PollingContext } from "../Listcontext/listcontext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SpritleLogo from "../assets/spritle_logo.png";
import { useEffect, useState, } from "react";
import Alert from 'react-popup-alert'
import { Web3Auth } from "@web3auth/modal";
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "../web3RPC";
import Card from "../component/card";
import { Routes, Route, Navigate } from "react-router-dom"
import Polling from "../component/Polling";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/Form'
import Remove from "../assets/Close.png";
import { resourceUsage, setuid } from 'process';
import DatePicker, { DayValue, DayRange, Day } from 'react-modern-calendar-datepicker'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

function Cards() {
  const navigate = useNavigate();
  const poll_question_and_details = useContext(PollingContext);
  console.log(poll_question_and_details);
  const [resuse, setResuse] = useState<{ id: number, createdAt: string, creator: string, voted: boolean, votesCount: number, statement: string }[]>([])
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [detail, setDetail] = useState<{ user: { username: string, usermail: string, publickey: string, privatekey: string }, statement: string, candidates: string[] ,expiring:string}>({ user: { username: '', usermail: '', publickey: '', privatekey: '' }, statement: '', candidates: [],expiring:''})
  const [poll_collection, setPoll_collection] = useState<{ statement: string, option: string[] }>({ statement: '', option: [] })
  const [role_id, setRole_id] = useState<null | number>(0)
  const [question, setQuestion] = useState("")
  const [option, setOption] = useState<Record<string, string>>({ '0': '', '1': '' });
  const [value, setValue] =useState(new Date());
  const [date, setDate] = useState<string>('');
 console.log(date,"setdate.................")

  useEffect(() => {
    const opt = Object.values(option)
    setDetail(prev => ({
      ...prev, candidates: opt
    }))
  }, [option])

  useEffect(() => {
    setDetail({ user: { username: poll_question_and_details.userDetails.username, usermail: poll_question_and_details.userDetails.usermail, publickey: "", privatekey: "" }, statement: question, candidates: [],expiring:""})
  }, [])

  console.log(detail,"setValue......")


  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND + "/api/myRole", {
      method: 'POST',
      body: JSON.stringify({
        user: {
          usermail: poll_question_and_details.userDetails.usermail
        }
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + process.env.REACT_APP_BACKEND_TOKEN
      }
    }).then((res) => res.json()).then(data => {
      console.log(data, "PPPPPP")
      setRole_id(data.role_id)
      setResuse(data.polls);
    }).catch(err => console.log(err));
  }, [])

  function clk() {
    fetch(process.env.REACT_APP_BACKEND + "/api/votingC_newPollDeploy", {
      method: 'POST',
      body: JSON.stringify(
        detail
      ),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + process.env.REACT_APP_BACKEND_TOKEN
      }
    }).then((res) => res.json()).then(data => {
    }).catch(err => console.log(err));
  }
  function AddRemoveInputField() {
    const [inputFields, setInputFields] = useState<{ option: string }[]>([]);
    const addInputField = () => {
      setInputFields([...inputFields, {
        option: '',
      }])
    }
    const removeInputFields = (index: any) => {
      const rows = [...inputFields];
      rows.splice(index, 1);
      setInputFields(rows);
      setOption(prev => ({}))

    }
    const handleChange = (index: number, name: any, evnt: any) => {
      const { name: any, value } = evnt.target;
      const list = [...inputFields];
      setInputFields(list);
    }

    return (

      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <div className="col-sm-12">
              <div className="row">

              </div>
            </div>
            <input type="text" name="option" className="form-control option-one" placeholder="Option " value={option['0']} onChange={((e: React.ChangeEvent<HTMLInputElement>) => setOption(prev => ({ ...prev, '0': e.target.value })))} />
            <input type="text" name="option" className="form-control option-one" placeholder="Option " value={option['1']} onChange={((e: React.ChangeEvent<HTMLInputElement>) => setOption(prev => ({ ...prev, '1': e.target.value })))} />

            {
              inputFields.map((data, index) => {
                const idx = index + 2
                return (
                  <div className="row my-3" key={index}>
                    <div className="col">
                      <div className="form-group">
                        <input type="text" name="option" className="form-control new-option" placeholder="Option " value={option[index + 2] || ''} onChange={((e: React.ChangeEvent<HTMLInputElement>) => setOption(prev => ({ ...prev, [`${idx}`]: e.target.value })))} />

                      </div>
                    </div>
                    <div className="col">
                      {<img src={Remove} alt="spritlelogo" onClick={removeInputFields} className="remove" />}
                    </div>
                  </div>
                )
              })
            }
            <button className="btn btn-success  add-options" onClick={addInputField}>Add Option</button>
          </div>
        </div>
        <div className="col-sm-4">
        </div>
      </div>
    )
  }

  function Create_poll() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
      <>
        {
          role_id === 1 &&
          (<Button variant="primary" className="createpollbtn" onClick={handleShow}>
            Create Poll
          </Button>)
        }
        {
          role_id !== 1 &&
          (<p className='badge rounded-pill bg-dark poll-create1'>{poll_question_and_details.userDetails.username.split("a",1)}</p>)
        }

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Poll</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" value={option.candidates} onChange={((e: any) => setDetail({ user: { username: poll_question_and_details.userDetails.username, usermail: poll_question_and_details.userDetails.usermail, publickey: "", privatekey: "" }, statement: e.target.value, candidates: [],expiring:""}))} className='text-area1' placeholder='Enter your question' rows={3} />
              </Form.Group>
            </Form>

        <div>
          <input type="date"onChange={((e: any) => setDetail({ user: { username: poll_question_and_details.userDetails.username, usermail: poll_question_and_details.userDetails.usermail, publickey: "", privatekey: "" }, statement:question, candidates: [],expiring:e.target.value}))}  />
      </div>
    
            {AddRemoveInputField()}
       
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={clk}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  console.log(question, "setQuestion")
  console.log(poll_collection.statement, "poll_collection.statement")

  const [alert, setAlert] = useState({
    header: 'header',
    type: 'error',
    text: 'This is a alert message',
    show: false
  })

  function onCloseAlert() {
    setAlert({
      header: '',
      type: '',
      text: '',
      show: false
    })
  }
  function onShowAlert(type: string, val: string, _header: string) {
    setAlert({
      header: _header,
      type: type,
      text: val,
      show: true
    })
  }

  const logout = async () => {
    await poll_question_and_details.userDetails.w3auth.logout();
    navigate('/')
  };

  const getChainId = async (_provider:SafeEventEmitterProvider) => {
    const rpc = new RPC(_provider);
    const chainId = await rpc.getChainId();
    onShowAlert('success', chainId, "Chain-ID");
  };

  const getAccounts = async (_provider:SafeEventEmitterProvider) => {
    const rpc = new RPC(_provider);
    const address = await rpc.getAccounts();
    onShowAlert('success', String(address), "Public Address");
  };

  const getBalance = async (_provider:SafeEventEmitterProvider) => {
    const rpc = new RPC(_provider);
    const balance = await rpc.getBalance();
    onShowAlert('success', balance, "Balance");
  };

  const sendTransaction = async (_provider:SafeEventEmitterProvider) => {
    const rpc = new RPC(_provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async (_provider:SafeEventEmitterProvider) => {
    const rpc = new RPC(_provider);
    const signedMessage = await rpc.signMessage("helloworld msg", "mypwd");
    onShowAlert('success', "{msg: \"helloworld msg\", password: \"mypwd\"} is: " + signedMessage, "SignedMessage for");
  };

  const getPrivateKey = async (_provider:SafeEventEmitterProvider) => {
    const rpc = new RPC(_provider);
    const privateKey = await rpc.getPrivateKey();
    onShowAlert('success', privateKey, "Private Key");
  };

  const handleclick = (id: number) => {
    console.log(id, "index")
    navigate('/pole', { state: { id: id } });

  }

  console.log(resuse, "reuse!!!!!!!!!!!!!!!!!!")

  return (
    <div className="">
      <div className="row  cards1">
        <div className="col-lg-6 first">
          <img src={SpritleLogo} alt="spritlelogo" className="spritle-logo1" />
        </div>
        <div className="col-lg-6 logout-button">
          <button onClick={logout} className="btn btn-primary logout ">Logout</button>
          {Create_poll()}
        </div>
      </div>
      <div>
        <div className="container mt-5 mb-3">
          <div className="row">
            {
              resuse != null && (
              resuse.map((element, id) => {
                return (
                  
                  <div className='col-lg-4'>
                    <div className="card p-3 mb-2 card3" onClick={() => { handleclick(element.id) }}  >
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                          <div  > <img className='voteicon' src={voteicon} /></div>
                          <div className="ms-2 c-details">
                            <h6 className="mb-0"></h6> <span>{element.createdAt.split("T",1)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 ">   <h6 className="heading ">{element.statement}</h6>
                        <div className="mt-5">
                          <progress id="file" value={element.votesCount} max="100"></progress>
                         <div className="mt-3"> <span className="text1">{element.votesCount} Vote <span className="text2"></span></span> </div>
                        </div>
                      </div>
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
            }
          </div>
        </div>
      </div>

    </div>
  )

}

export default Cards