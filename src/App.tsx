import { useEffect, useState, useContext } from "react";
import Alert from 'react-popup-alert'
import { Web3Auth } from "@web3auth/modal";
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "./web3RPC"
import "./App.css";
import Card from "./component/card";
import { PollingContext } from "./Listcontext/listcontext";
import SpritleLogo from "./assets/spritle_logo.png"
import PollLogo from "./assets/votelogo.png"
import logins from "./assets/login.png"
import Vote from "./assets/yellow.jpg"
import { useNavigate } from "react-router-dom";

const clientId = process.env.REACT_APP_WEB3AUTH_CLIENTID ? process.env.REACT_APP_WEB3AUTH_CLIENTID : "";
const gcp_secret = process.env.REACT_APP_GCP_CLIENT_SECRET ? process.env.REACT_APP_GCP_CLIENT_SECRET : "";
function App() {
  const poll_question_and_details: {
    poll_question: {
      ques: string;
      option1: string;
      option2: string;
      date: string;
      vote: number;
    }[],

    userDetails: {
      username: string;
      usermail: string;
      rpc: any
    },
  } = useContext(PollingContext);

  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const navigate = useNavigate();
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
            appLogo: process.env.REACT_APP_LOGIN_ADAP_LOGO
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
                clientId: gcp_secret,
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
    //  navigate('/card')
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    navigate('/card')
    console.log(poll_question_and_details.userDetails, "userDetails-----------------------------")

    const user = await web3auth.getUserInfo();
    user_name = user.name ? user.name : "-";

    poll_question_and_details.userDetails.username = user_name;
    console.log(poll_question_and_details.userDetails.username, "username...............................")
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

  const loggedInView = (
    <>
    </>
  );
  const unloggedInView = (
    <div className="container-fluid cardpg">

      <div className="row">
        <div className="col-lg-6 first-first">

          <img src={SpritleLogo} alt="spritlelogo" className="spritle-logo" />
          <img src={Vote} alt="PollLogo " className="yellow" />

          <p className="company_title text">Make your vote count!
          </p>
          <p className="vote1">Feel proud to be a voter anywhere, be ready to vote!</p>
        </div>
        <div className="col-lg-6 login" >
       
          <div className="wel">
          <img src={PollLogo} alt="PollLogo " className="poll-img second" />
            <p className="welcome">Welcome!</p>
            <p className="welcome1">If you don't vote, you can't complain!
            </p>
            <p className="welcome1">
              Vote! Let your voice be heard!
            </p>
            <p className="welcome1">The real power is to vote!</p>
            <input type="button" value="Login" onClick={() => { login() }} className=" btn btn-primary submit1 "></input>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div>
        {unloggedInView}
      </div>
    </>
  );
}

export default App;
