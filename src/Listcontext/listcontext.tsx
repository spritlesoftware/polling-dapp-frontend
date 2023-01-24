import React, { createContext,  } from 'react';
import { useEffect, useState ,useContext} from "react";
import "../App.css";
const clientId = "BO_fSxnxQUgm7OW9FgRGzU2ID0PPDAfFLgftNxsjFZkDgS-KwasdSt8opMKjB1eY6ouoDvHtv2gl1u7xrlBeksc";

interface pollingContextInterface {poll_question: {
        ques: string;
        option1: string;
        option2: string;
        date: string;
        vote: number;
    }[],
        setPoll_question:Function,
        userDetails: {username:string;usermail:string;rpc:any}}
    
    export const PollingContext = createContext<pollingContextInterface>({poll_question: [],setPoll_question: () => {},
     userDetails: {username: '', usermail: '', rpc:{}},})
    
    const ListProvider = ({children}: React.PropsWithChildren) => {
        const userDetails={  username: "", usermail: "", rpc: {}}
        console.log(userDetails,"userDetails")
        const [poll_question,setPoll_question] = useState([])
        const [poll_collection,setPoll_collection]=useState({})
        return <PollingContext.Provider value={{poll_question: poll_question,setPoll_question, userDetails: userDetails}}>
            {children}
        </PollingContext.Provider>
    }
    
    export default ListProvider