import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'
import { BrowserRouter } from 'react-router-dom';
import {Routes,Route} from "react-router-dom"
import Polling from './component/Polling';
import ListProvider from './Listcontext/listcontext';
import Thankpage from './component/Thankpage';
import Cards from './component/card';
import Result from './component/Final';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ListProvider>
    <BrowserRouter>
   <div className='index'>
    <Routes>
      <Route path='/pole' element={<Polling/>}></Route>
      <Route path='' element={<App/>}></Route>  
      <Route path='/thankyou' element={<Thankpage/>}></Route>
      <Route path='/card' element={<Cards/>}></Route>
      <Route path='/result' element={<Result/>}></Route>
    </Routes>
    </div>
    </BrowserRouter>
    </ListProvider>
  </React.StrictMode>
);
reportWebVitals();
