import './card.css';
import voteicon from "../assets/vvote.png"
import React from "react";
import { useContext } from "react";
import { PollingContext } from "../Listcontext/listcontext";
import { useLocation, useNavigate } from "react-router-dom";
import SpritleLogo from "../assets/spritle_logo.png";
import { useEffect, useState, } from "react";
import { Web3Auth } from "@web3auth/modal";
import { SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../web3RPC";
import Amount from '../assets/Amount1.png'
import Email from '../assets/Email.png'
import Key from '../assets/Key.png'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Remove from "../assets/Close.png";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import Spinner from 'react-bootstrap/Spinner';
import toastr from "toastr";
import Header from '../Header';

function Cards() {
  const navigate = useNavigate();
  const poll_question_and_details = useContext(PollingContext);
  const [resuse, setResuse] = useState<{ id: number, createdAt: string, creator: string, voted: boolean, votesCount: number, expiring: string, statement: string }[]>([])
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [detail, setDetail] = useState<{ user: { username: string, usermail: string, publickey: string, privatekey: string, balance: any, profile: any }, statement: string, candidates: string[], expiring: string }>({ user: { username: '', usermail: '', publickey: '', privatekey: '', balance: poll_question_and_details.userDetails.balance, profile: poll_question_and_details.userDetails.profile }, statement: '', candidates: [], expiring: '' })
  const [role_id, setRole_id] = useState<null | number>(0)
  const [question, setQuestion] = useState("")
  const [option, setOption] = useState<Record<string, string>>({ '0': '', '1': '' });
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [notification, setNotification] = useState(false)
  const { state } = useLocation()
 
  const [expiry_load, setExpiry_load] = useState(true)
  useEffect(() => {
    const opt = Object.values(option)
    setDetail(prev => ({
      ...prev, candidates: opt
    }))
  }, [option])

  useEffect(() => {
    setDetail({ user: { username: poll_question_and_details.userDetails.username, usermail: poll_question_and_details.userDetails.usermail, publickey: poll_question_and_details.userDetails.publickey, privatekey: poll_question_and_details.userDetails.privatekey, balance: poll_question_and_details.userDetails.balance, profile: poll_question_and_details.userDetails.profile }, statement: question, candidates: [], expiring: "" })
  }, [])
  const length: number = resuse.length

  const myrole = async () => {
    if (process.env.REACT_APP_BLOCKCHAIN_ACCOUNT === "true") {
      detail.user.privatekey = poll_question_and_details.userDetails.privatekey;
      detail.user.publickey = poll_question_and_details.userDetails.publickey;
      detail.user.balance = poll_question_and_details.userDetails.balance;
    }

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
    }
    )
      .then(res => res.json())
      .then(data => {
        setRole_id(data.role_id);
        setResuse(data.polls);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    myrole();
  }, []);



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
                      {<img src={Remove} alt="remove" onClick={removeInputFields} className="remove" />}
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

  const User_detail = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <img crossOrigin="anonymous" src={poll_question_and_details.userDetails.profile} className="profile-img" onClick={handleShow} alt="img" />
        <Modal show={show} onHide={handleClose}>
          <ModalHeader closeButton>
            <Modal.Title>{detail.user.username}</Modal.Title>
          </ModalHeader>
          <ModalBody>
            <p>
              <img src={Email} className="Email" /> {detail.user.usermail}
            </p>
            <p>
              <img src={Key} className="Key" /> {detail.user.publickey}
            </p>
            <p>
              <img src={Amount} className="Email" /> {poll_question_and_details.userDetails.balance}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="btn btn-primary" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  };
  const handleclick1 = (elements: any) => {
    navigate('/result', { state: { winner: elements.result } })
  }

  function Expired_poll() {
    navigate('/expired')

  }

  function Create_poll() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function Save() {

      setLoading(true);
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
        setDetail(({ user: { username: '', usermail: '', publickey: '', privatekey: '', balance: poll_question_and_details.userDetails.balance, profile: poll_question_and_details.userDetails.profile }, statement: '', candidates: [], expiring: '' }))
        setOption(({ '0': '', '1': '' }))
        setNotification(true)


        if (notification == true) {
          toastr.options.positionClass = "toast-top-center";
          toastr.success("Successfully created!")
        }

        myrole();

      }).catch(err => console.log(err));
      handleClose();
    }

    return (
      <>
        {
          role_id === 1 &&
          (<Button className='btn btn-primary createbtn' onClick={handleShow}>Create Poll</Button>)
        }

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Poll</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" value={option.candidates} onChange={((e: any) => setQuestion(e.target.value))} className='text-area1' placeholder='Enter your question' rows={3} />
              </Form.Group>
            </Form>
            <div>
              <input type="date" className='date' onChange={((e: any) => setDetail({ user: { username: poll_question_and_details.userDetails.username, usermail: poll_question_and_details.userDetails.usermail, publickey: poll_question_and_details.userDetails.publickey, privatekey: poll_question_and_details.userDetails.privatekey, balance: poll_question_and_details.userDetails.balance, profile: poll_question_and_details.userDetails.profile }, statement: question, candidates: [], expiring: e.target.value }))} />
            </div>
            {AddRemoveInputField()}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={Save}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

  }


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
    try {
      localStorage.removeItem('openlogin_store');
      localStorage.removeItem('Web3Auth-cachedAdapter');
      navigate('/');
    } catch (err) { console.log(err) };
  };

  const getChainId = async (_provider: SafeEventEmitterProvider) => {
    const rpc = new RPC(_provider);
    const chainId = await rpc.getChainId();
    onShowAlert('success', chainId, "Chain-ID");
  };

  const getAccounts = async (_provider: SafeEventEmitterProvider) => {
    const rpc = new RPC(_provider);
    const address = await rpc.getAccounts();
    onShowAlert('success', String(address), "Public Address");
  };

  const getBalance = async (_provider: SafeEventEmitterProvider) => {
    const rpc = new RPC(_provider);
    const balance = await rpc.getBalance();
    onShowAlert('success', balance, "Balance");

  };

  const sendTransaction = async (_provider: SafeEventEmitterProvider) => {
    const rpc = new RPC(_provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async (_provider: SafeEventEmitterProvider) => {
    const rpc = new RPC(_provider);
    const signedMessage = await rpc.signMessage("helloworld msg", "mypwd");
    onShowAlert('success', "{msg: \"helloworld msg\", password: \"mypwd\"} is: " + signedMessage, "SignedMessage for");
  };

  const getPrivatekey = async (_provider: SafeEventEmitterProvider) => {
    const rpc = new RPC(_provider);
    const privateKey = await rpc.getPrivateKey();
    onShowAlert('success', privateKey, "Private Key");
  };

  const handleclick = (elements: any) => {
    if (poll_question_and_details.userDetails.balance <= 0) {
      navigate('/nobalance')
    }
    else if (elements.voted || elements.creator == poll_question_and_details.userDetails.usermail) {
      navigate('/result', { state: { id: elements.id, date: elements.expiring, role_id: role_id, creator: elements.creator } })
    }
    else {
      navigate('/pole', { state: { id: elements.id, date: elements.expiring } })
    }
  }

  return (
    <div>
      <div>
        <div className="row  cards1">
          <div className="col-lg-6 first">
            <Header />
          </div>
          <div className="col-lg-2">
            {Create_poll()}
          </div>
          <div className="col-lg-4">
            <Button className='btn btn-primary' onClick={Expired_poll}>Expired Poll</Button>
            <button onClick={logout} className="btn btn-primary card-logout">Logout</button>
            {User_detail()}
          </div>
        </div>
        <div>
          <div className="container mt-5 mb-3">
            <div className="row">
              {
                loading ? (
                  <div className='loader'>
                    <Spinner animation="border" />
                  </div>
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
                              <div className="badge">
                                <span style={{
                                  color: element.voted ? 'red' : (element.creator === poll_question_and_details.userDetails.usermail ? 'green' : 'blue')
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
    </div>
  )
}

export default Cards