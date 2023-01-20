import { useEffect, useState,useContext } from "react";
import Alert from 'react-popup-alert'
import { Web3Auth } from "@web3auth/modal";
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "../web3RPC";
import "../App.css";
import Card from "../component/card";
import {Routes,Route} from "react-router-dom"
import { PollingContext } from "../Listcontext/listcontext";
import Polling from "../component/Polling";

const clientId = "BO_fSxnxQUgm7OW9FgRGzU2ID0PPDAfFLgftNxsjFZkDgS-KwasdSt8opMKjB1eY6ouoDvHtv2gl1u7xrlBeksc";

function HomePage() {
  const poll_question: {ques:string,date:string,vote:number}[] = useContext(PollingContext);
  console.log(poll_question,".........................................")
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

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
            // rpcTarget: "https://goerli.infura.io/v3/",
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
              // Add login configs corresponding to the providers on modal
              // Google login
              google: {
                name: "Custom Auth Login",
                verifier: "spritle-google-testnet",
                typeOfLogin: "google",
                clientId: "855467495955-rlbt9fnev9r80j0h0848k05rov9hctmj.apps.googleusercontent.com",
              },
              // Facebook login
              /*facebook: {
                name: "Custom Auth Login",
                verifier: "YOUR_FACEBOOK_VERIFIER_NAME", // Please create a verifier on the developer dashboard and pass the name here
                typeOfLogin: "facebook", // Pass on the login provider of the verifier you've created
                clientId: "FACEBOOK_CLIENT_ID_1234567890", // Pass on the clientId of the login provider here - Please note this differs from the Web3Auth ClientID. This is the JWT Client ID
              },*/
              // Add other login providers here
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);
        setWeb3auth(web3auth);

        // await web3auth.initModal();

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
              // setting it to false will hide all social login methods from modal.
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

    console.log(web3authProvider);

    // -------- //
    const user = await web3auth.getUserInfo();
    user_name = user.name ? user.name : "-";

    if (web3authProvider) {
      const rpc = new RPC(web3authProvider);
      balance = await rpc.getBalance();
      console.log("RPC",rpc)

      //***********START */
      /*var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer e4ebae7f8a55e13bd9a967f45f60b8671ba27511bec9598364b65d9c440e693a6a299331018c1285a88044166ffa9baedda0bcbc5114b8a3629af80af875f225a9f494474172c3eca759ac287976ddd806bd5aa57883aa75394cda1a0677b555f9d0852818d34be2539ca1a2c2de1deab2a5e53156b30e986878b5659a40ffad");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "localUser": false,
        "user": {
          "username": user_name,
          "usermail": user.email,
          "publickey": String(await rpc.getAccounts()),
          "privatekey": await rpc.getPrivateKey(),
        }
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };

      fetch("http://192.168.1.52:1337/api/signerInit", requestOptions)
        .then(response => response.text())
        .then(result => console.log("==== " + result))
        .catch(error => console.log('==== error', error));*/
      //***********END ***/
    }

    onShowAlert("success", "Name: " + user_name + ", Balance: " + balance, "User Details");
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

  const loggedInView = (
    <>
     
      <div className="alert">
        <Alert
          header={alert.header}
          btnText={'Close'}
          text={alert.text}
          type={alert.type}
          show={alert.show}
          onClosePress={onCloseAlert}
          pressCloseOnOutsideClick={true}
          showBorderBottom={false}
          alertStyles={{}}
          headerStyles={{}}
          textStyles={{}}
          buttonStyles={{}}
        />
      </div>
      {/* <button onClick={getUserInfo} className="card">
        Get User Info
      </button>
      <button onClick={getChainId} className="card">
        Get Chain ID
      </button>
      <button onClick={getAccounts} className="card">
        Get Accounts
      </button>
      <button onClick={getBalance} className="card">
        Get Balance
      </button>
      <button onClick={sendTransaction} className="card">
        Send Transaction
      </button>
      <button onClick={signMessage} className="card">
        Sign Message
      </button>
      <button onClick={getPrivateKey} className="card">
        Get Private Key
      </button> */}
      <Card questions={poll_question} />
      {/* <Polling question={poll_question} /> */}
      <button onClick={logout} className="card">
        Log Out
      </button>

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <>
    
    <div className="container">
     
      <h1 className="title">
        <a target="_blank" href="http://web3auth.io/" rel="noreferrer">
          Web3Auth 
        </a>
          &nbsp;with ReactJS Example
      </h1>

      {/* <div className="grid">{provider ? loggedInView : unloggedInView}</div> */}
      
      
    </div>


  
    </>
  );
}

export default HomePage;