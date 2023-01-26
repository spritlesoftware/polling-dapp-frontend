import { Link, } from 'react-router-dom';
import './card.css';
import voteicon from "../assets/voteicon.jpg"
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
import { setuid } from 'process';

const clientId = "BO_fSxnxQUgm7OW9FgRGzU2ID0PPDAfFLgftNxsjFZkDgS-KwasdSt8opMKjB1eY6ouoDvHtv2gl1u7xrlBeksc";

function Cards() {
  const navigate = useNavigate();
  const poll_question_and_details = useContext(PollingContext);
  console.log(poll_question_and_details);
  const [resuse, setResuse] = useState<{ id: number, createdAt: string, creator: string, voted: boolean, votesCount: number, statement: string }[]>([])
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [detail, setDetail] = useState<{ user: { username: string, usermail: string, publickey: string, privatekey: string }, statement: string, candidates: string[] }>({ user: { username: '', usermail: '', publickey: '', privatekey: '' }, statement: '', candidates: [] })
  const [poll_collection, setPoll_collection] = useState<{ statement: string, option: string[] }>({ statement: '', option: [] })
  const [role_id, setRole_id] = useState<null | number>(0)
  const [question, setQuestion] = useState("")
  const [option, setOption] = useState<Record<string, string>>({ '0': '', '1': '' });
  useEffect(() => {
    const opt = Object.values(option)
    setDetail(prev => ({
      ...prev, candidates: opt
    }))
  }, [option])

  useEffect(() => {
    setDetail({ user: { username: poll_question_and_details.userDetails.username, usermail: poll_question_and_details.userDetails.usermail, publickey: "", privatekey: "" }, statement: question, candidates: [] })
  }, [])

  useEffect(() => {
    fetch("https://polling.spritle.com/api/myRole", {
      method: 'POST',
      body: JSON.stringify({
        user: {
          usermail: "mohan.creator.k@gmail.com"
        }
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer 51ca94dc9a4674a334c4c548f9d95c1f8881a776f579487e4afb07c9c5f3b247f9d5198c7852173c3daab0d4de80ed55b03f1badafc3c9900dca6efefb50db210f236d4f5dc7345f21398eb47cf79169d4fed0145879c9e8781997318b1cdc702726c6ae143d6283525e04c3f36e326e013f947cf9f6330787828843528028fc'
      }
    }).then((res) => res.json()).then(data => {
      console.log(data, "PPPPPP")
      setRole_id(data.role_id)
      setResuse(data.polls);
    }).catch(err => console.log(err));
  }, [])

  function clk() {
    fetch("https://polling.spritle.com/api/votingC_newPollDeploy", {
      method: 'POST',
      body: JSON.stringify(
        detail
      ),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer 51ca94dc9a4674a334c4c548f9d95c1f8881a776f579487e4afb07c9c5f3b247f9d5198c7852173c3daab0d4de80ed55b03f1badafc3c9900dca6efefb50db210f236d4f5dc7345f21398eb47cf79169d4fed0145879c9e8781997318b1cdc702726c6ae143d6283525e04c3f36e326e013f947cf9f6330787828843528028fc'
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
          (<b>anonymous userDetails</b>)
        }

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Poll</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" value={option.candidates} onChange={((e: any) => setDetail({ user: { username: poll_question_and_details.userDetails.username, usermail: poll_question_and_details.userDetails.usermail, publickey: "", privatekey: "" }, statement: e.target.value, candidates: [] }))} className='text-area1' placeholder='Enter your question' rows={3} />
              </Form.Group>
            </Form>
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

  var user_name = "";
  var balance = "";
  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x5",
          },
          uiConfig: {
            loginMethodsOrder: ["google"],
            appLogo: "https://www.spritle.com/images/logo.svg"
          },
        });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            network: "testnet",
            uxMode: "popup",
            loginConfig: {

              google: {
                name: "Custom Auth Login",
                verifier: "spritle-google-testnet",
                typeOfLogin: "google",
                clientId: "855467495955-rlbt9fnev9r80j0h0848k05rov9hctmj.apps.googleusercontent.com",
              },

            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);
        setWeb3auth(web3auth);
        await web3auth.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.OPENLOGIN]: {
              label: "openlogin",
              loginMethods: {
                google: {
                  name: "google",
                  showOnModal: true
                },
                linkedin: {
                  name: "linkedin",
                  showOnModal: false
                },
                facebook: {
                  name: "facebook",
                  showOnModal: false
                },
                twitter: {
                  name: "twitter",
                  showOnModal: false
                },
                reddit: {
                  name: "reddit",
                  showOnModal: false
                },
                discord: {
                  name: "discord",
                  showOnModal: false
                },
                twitch: {
                  name: "twitch",
                  showOnModal: false
                },
                apple: {
                  name: "apple",
                  showOnModal: false
                },
                github: {
                  name: "github",
                  showOnModal: false
                },
                wechat: {
                  name: "wechat",
                  showOnModal: false
                },
                line: {
                  name: "line",
                  showOnModal: false
                },
                kakao: {
                  name: "kakao",
                  showOnModal: false
                },
                weibo: {
                  name: "weibo",
                  showOnModal: false
                },
                email_passwordless: {
                  name: "email_passwordless",
                  showOnModal: false
                }
              },
              showOnModal: true,
            },
            [WALLET_ADAPTERS.METAMASK]: {
              label: "metamask",
              showOnModal: false
            },
            [WALLET_ADAPTERS.TORUS_EVM]: {
              label: "torusevm",
              showOnModal: false
            },
            [WALLET_ADAPTERS.WALLET_CONNECT_V1]: {
              label: "wallerconnectv2",
              showOnModal: false
            }
          },
        });

        if (web3auth.provider) {
          setProvider(web3auth.provider);
        };
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);
  const login = async () => {

    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    console.log(poll_question_and_details.userDetails, "userDetails***")

    const user = await web3auth.getUserInfo();
    user_name = user.name ? user.name : "-";

    poll_question_and_details.userDetails.username = user_name;
    console.log(poll_question_and_details.userDetails.username, "username in card")

    poll_question_and_details.userDetails.usermail = user.email ? user.email : "-";

    if (web3authProvider) {
      const rpc = new RPC(web3authProvider);
      balance = await rpc.getBalance();
      poll_question_and_details.userDetails.rpc = rpc;
    }
  };
  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    if (user.name)
      onShowAlert('success', "Name: " + user.name, "User Details");
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    navigate(-1)
  };

  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    onShowAlert('success', chainId, "Chain-ID");
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    onShowAlert('success', String(address), "Public Address");
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    onShowAlert('success', balance, "Balance");
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage("helloworld msg", "mypwd");
    onShowAlert('success', "{msg: \"helloworld msg\", password: \"mypwd\"} is: " + signedMessage, "SignedMessage for");
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    onShowAlert('success', privateKey, "Private Key");
  };
  function Createpoll() {
    return (
      <div>
      </div>
    )
  }

  useEffect(() => {
    console.log(detail, "...............poll_collection")
  }, [detail])

  const loggedInView = (
    <>
      <div className="row card-logout">
        <div className="col-6">
          <img src={SpritleLogo} alt="spritlelogo" className="spritle-logo-card" />
        </div>
        <div className="col-6">
        </div>
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );
  const unloggedInView = (
    <div className="container-fluid cardpg">

      <div className="row">
        <div className="col-lg-6 side">

          <img src={SpritleLogo} alt="spritlelogo" className="spritle-logo" />
          <p className="company_title text">Make your vote count!
          </p>
          <p className="vote1">Feel proud to be a voter anywhere, be ready to vote!</p>
        </div>
        <div className="col-lg-6 login" >
          <div>
            <p className="welcome">Welcome!</p>
            <p className="welcome1">If you don't vote, you can't complain!
            </p>
            <p className="welcome1">
              Vote! Let your voice be heard!
            </p>
            <p className="welcome1">The real power is to vote!</p>
          </div>
          <div className="login-para">
            <input type="button" value="Login" onClick={() => { login() }} className=" btn btn-primary submit1 "></input>
          </div>
        </div>
      </div>
    </div>
  );

  const handleclick = (id: number) => {
    console.log(id, "index")
    navigate('/pole', { state: { id: id } });

  }
  console.log(resuse, "reuse!!!!!!!!!!!!!!!!!!")

  return (
    <div>
      <div className="row">
        <div className="col-lg-6 first">
          <img src={SpritleLogo} alt="spritlelogo" className="spritle-logo1" />
        </div>
        <div className="col-lg-6 logout-button">
          {Create_poll()}
          <button onClick={logout} className="btn btn-primary logout ">Logout</button>
        </div>
      </div>
      <div>
        <div className="container mt-5 mb-3">
          <div className="row">
            {
              resuse.map((element, id) => {
                return (

                  <div className='col-lg-4'>
                    <div className="card p-3 mb-2" onClick={() => { handleclick(element.id) }}  >
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                          <div  > <img className='voteicon' src={voteicon} /></div>
                          <div className="ms-2 c-details">
                            <h6 className="mb-0"></h6> <span>{element.createdAt}</span>
                          

                          </div>
                        </div>
                      </div>
                      <div className="mt-5 ">   <h6 className="heading ">{element.statement}</h6>
                        <div className="mt-5">
                          <progress id="file" value={"element.vote"} max="100"></progress>
                         <div className="mt-3"> <span className="text1">{element.votesCount} Vote <span className="text2"></span></span> </div>
                        </div>
                      </div>
                    </div>
                  </div>

                )
              }
              )
            }
          </div>
        </div>
      </div>

    </div>
  )

}

export default Cards