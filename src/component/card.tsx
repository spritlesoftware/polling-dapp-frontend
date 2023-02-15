import './card.css';
import voteicon from "../assets/vvote.png"
import React from "react";
import { useContext } from "react";
import { PollingContext } from "../Listcontext/listcontext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, } from "react";
import Amount from '../assets/Amount1.png'
import Email from '../assets/Email.png'
import Key from '../assets/Key.png'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Remove from "../assets/Close.png";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import Spinner from 'react-bootstrap/Spinner';
import Header from './Header';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cards() {
  const navigate = useNavigate();
  const poll_question_and_details = useContext(PollingContext);
  const [card_detail, setCard_detail] = useState<{ id: number, createdAt: string, creator: string, voted: boolean, votesCount: number, expiring: string, statement: string }[]>([])
  const [detail, setDetail] = useState<{ user: { username: string, usermail: string, publickey: string, privatekey: string, balance: any, profile: any }, statement: string, candidates: string[], expiring: string }>({ user: { username: '', usermail: '', publickey: '', privatekey: '', balance: poll_question_and_details.userDetails.balance, profile: poll_question_and_details.userDetails.profile }, statement: '', candidates: [], expiring: '' })
  const [role_id, setRole_id] = useState<null | number>(0)
  const [question, setQuestion] = useState("")
  const [option, setOption] = useState<Record<string, string>>({ '0': '', '1': '' });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  
  useEffect(() => {
    const opt = Object.values(option)
    setDetail(prev => ({
      ...prev, candidates: opt
    }))
  }, [option])
  
  useEffect(() => {
    setDetail({ user: { username: poll_question_and_details.userDetails.username, usermail: poll_question_and_details.userDetails.usermail, publickey: poll_question_and_details.userDetails.publickey, privatekey: poll_question_and_details.userDetails.privatekey, balance: poll_question_and_details.userDetails.balance, profile: poll_question_and_details.userDetails.profile }, statement: '', candidates: [], expiring: "" })
  }, [])

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
        setCard_detail(data.polls);
        setLoading(false);
        if (detail.statement) {
          setNotification(true);
        }
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

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <div className="col-sm-12">
              <div className="row">
              </div>
            </div>
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
        <img crossOrigin="anonymous" referrerPolicy="no-referrer" src={poll_question_and_details.userDetails.profile} className="profile-img" onClick={handleShow} alt="img" />
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

  function Expired_poll() {
    navigate('/expired')
  }

  function Create_poll() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function save() {

      if (detail.statement && detail.expiring && option['0'] && option['1']) {
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

          myrole();

          if (loading === false) {
            toast.success("Poll successfully created!", {
              position: toast.POSITION.TOP_CENTER
            })
          }

          setDetail(({ user: { username: '', usermail: '', publickey: '', privatekey: '', balance: poll_question_and_details.userDetails.balance, profile: poll_question_and_details.userDetails.profile }, statement: '', candidates: [], expiring: '' }))
          setOption(({ '0': '', '1': '' }))
          setQuestion("")

        }).catch(err =>
          toast.error("Poll creation Failed!", {
            position: toast.POSITION.TOP_CENTER
          }))
        handleClose();
      }
    }
    return (
      <>
        {
          role_id === 1 &&
          (<Button className='btn btn-primary createbtn' onClick={handleShow}>Create Poll</Button>)
        }
        <ToastContainer />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Poll</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form onSubmit={(evt) => {
                evt.preventDefault()
                handleSubmit(data => console.log({ data }))
             
              }}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Control as="textarea" required {...register} value={question} onChange={e => setQuestion(e.target.value)} className="text-area1" placeholder="Enter your question" rows={3} />
                </Form.Group>
                <input type="date" className="date" required {...register}
                  value={detail.expiring} onChange={e => setDetail({
                    user: {
                      username: poll_question_and_details.userDetails.username,
                      usermail: poll_question_and_details.userDetails.usermail,
                      publickey: poll_question_and_details.userDetails.publickey,
                      privatekey: poll_question_and_details.userDetails.privatekey,
                      balance: poll_question_and_details.userDetails.balance,
                      profile: poll_question_and_details.userDetails.profile,
                    },
                    statement: question, candidates: [], expiring: e.target.value
                  })
                  }
                />(Expiry date)
                <input type="text" className="form-control option-one" placeholder="Option " required {...register} value={option['0']} onChange={((e: React.ChangeEvent<HTMLInputElement>) => setOption(prev => ({ ...prev, '0': e.target.value })))} />
                <input type="text" className="form-control option-two" placeholder="Option " required {...register} value={option['1']} onChange={((e: React.ChangeEvent<HTMLInputElement>) => setOption(prev => ({ ...prev, '1': e.target.value })))} />
                {AddRemoveInputField()}
                <ModalFooter>
                  <Button type='submit' variant="primary" onClick={(evt) => {save()}}>
                    Save
                  </Button>
                </ModalFooter>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );

  }

  const logout = async () => {
    try {
      localStorage.removeItem('openlogin_store');
      localStorage.removeItem('Web3Auth-cachedAdapter');
      navigate('/');
       window.location.reload();
    } catch (err) { console.log(err) };
  };

  const handleclick = (elements: any) => {

    if (poll_question_and_details.userDetails.balance <= 0 && process.env.REACT_APP_BLOCKCHAIN_ACCOUNT === "true" ) {
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
                    <Spinner animation="border" /> Loading...
                  </div>
                ) : (
                  card_detail.map((element, id) => {
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
          card_detail == null && (
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