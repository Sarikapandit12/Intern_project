import { HashRouter, Routes, Route, Link} from "react-router-dom";



import Mycart from "./cart";
import Myhome from "./home";
import Mylogin from "./login";
import Myfooter from "./footer";



const UserApp = () =>{
    return(
        
    < HashRouter>
            

        <nav className="navbar navbar-expand-sm navbar-dark bg-success sticky-top">
            <div className="container" href=""> 
              <img src="logo.png" width="50px" height="40px"/>
                <a className="navbar-brand fs-3 ms-3">  Freshland Shopping   </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item me-4">
                    <Link className="nav-link active" to="/"Link><i className="fa fa-home"></i> Shopping</Link>
                    </li>
                    <li className="nav-item me-4">
                    <Link className="nav-link active" to="/cart"Link><i className="fa fa-shopping-cart"></i> Mycart</Link>
                    </li>
                    <li className="nav-item me-4">
                    <Link className="nav-link active" to="/login"Link><i className="fa fa-lock"></i> Seller Login</Link>
                    </li>
                </ul>
                
                </div>
            </div>
        </nav>

           <Routes>
            <Route exact path="/" element =  {<Myhome/>}/>
            <Route exact path="/cart" element =  {<Mycart/>}/>
            <Route exact path="/login" element =  {<Mylogin/>}/> 
            </Routes>

            <Myfooter/>
        </HashRouter>
    )
}

export default UserApp;