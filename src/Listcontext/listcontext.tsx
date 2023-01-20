import React, { createContext,  } from 'react';
import { useEffect, useState ,useContext} from "react";
import Alert from 'react-popup-alert'
import { Web3Auth } from "@web3auth/modal";
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
// import RPC from "./web3RPC";
import RPC from "../web3RPC"
import "../App.css";
const clientId = "BO_fSxnxQUgm7OW9FgRGzU2ID0PPDAfFLgftNxsjFZkDgS-KwasdSt8opMKjB1eY6ouoDvHtv2gl1u7xrlBeksc";

export const PollingContext = createContext<{poll_question: {
    ques: string;
    option1: string;
    option2: string;
    date: string;
    vote: number;
}[], userDetails: {username:string;usermail:string;rpc:any}}>({poll_question: [], userDetails: {username: '', usermail: '', rpc:{}}})

const ListProvider = ({children}: React.PropsWithChildren) => {
    const [userDetails,setUserDetails]=useState({  username: "", usermail: "", rpc: {}})
    const poll_question = [{ ques: "Are you ok?",option1:"Yes",option2:"No",date:"22-mar-2022",vote:87},{ ques: "Do you know spritle birthday?",date:"22-jan-2023",option1:"Yes",option2:"No",vote:46},{ques: " Do you have middle name?",date:"22-mar-2022",vote:8,option1:"Yes",option2:"No"}]
    return <PollingContext.Provider value={{poll_question: poll_question, userDetails: userDetails}}>
        {children}
    </PollingContext.Provider>
}

export default ListProvider