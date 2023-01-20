import React from 'react';
import{Link} from 'react-router-dom';
let NavBar=({children}: React.PropsWithChildren)=>{
    return(
             <React.Fragment>
                <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                    <div className="container">
                        <Link to={'/n'} className="navbar-brand">
                        <i className="fa fa-mobile text-warning"/>Polling <span className='text-warning'>System</ span></Link>
                    </div>
                </nav>
                </React.Fragment>
    )
};
export default NavBar;