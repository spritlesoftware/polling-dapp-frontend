import React, { createContext,  } from 'react';
import { useEffect, useState ,useContext} from "react";
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
    console.log(userDetails,"userDetails")
    const poll_question = [{ ques: "What kind of place would you prefer for your vacation?",option1:"Beach",option2:"Mountain",date:"22-mar-2022",vote:87},{ ques: "Which of the following outdoor activities would you prefer?",date:"22-jan-2023",option1:"trekking",option2:"swimming",vote:46},{ques: " What kind of Cuisine would you prefer?",date:"22-mar-2022",vote:8,option1:"Indian",option2:"American"}]
    return <PollingContext.Provider value={{poll_question: poll_question, userDetails: userDetails}}>
        {children}
    </PollingContext.Provider>
}

export default ListProvider