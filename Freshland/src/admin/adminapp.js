import { HashRouter, Routes, Route, Link} from "react-router-dom";

import Mydashboard from "./dashboard";
import Orderlist from "./order";
import Newproduct from "./newproduct";
import Allproduct from "./productlist";


const Adminapp = () =>{
    return(
    <HashRouter>
            <nav className="navbar navbar-expand-sm navbar-dark bg-success p-3">
                <div className="container"><img src="logo.png" width="50px" height="40px"/>
                <a className="navbar-brand fs-3 ms-2"> Freshland Shopping </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item me-4">
                            <Link className="nav-link active" to="/"Link><i className="fa fa-home"></i> Dashboard</Link>
                            </li>
                            <li className="nav-item me-4">
                            <Link className="nav-link active" to="/newproduct"Link><i className="fa fa-plus"></i> Add Product</Link>
                            </li>
                            <li className="nav-item me-4">
                            <Link className="nav-link active" to="/allproduct"Link><i className="fa fa-table"></i> Manage Product</Link>
                            </li>
                            <li className="nav-item me-4">
                            <Link className="nav-link active" to="/order"Link><i className="fa fa-headset"></i> Manage Order</Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active"> 
                                    Welcome : {localStorage.getItem("name")}
                                    <i className="fa fa-power-off text-danger ms-3" onClick={logout}></i>  Logout 
                                </Link>
                            </li>
                            
                        </ul>               
                    </div>
                </div>
            </nav>

        <Routes>
            < Route exact path="/" element={<Mydashboard/>}/>
            < Route exact path="/order" element= {<Orderlist/>}/>
            < Route exact path="/newproduct" element= { <Newproduct/>}/>
            < Route exact path="/allproduct" element= { <Allproduct/>}/>
        </Routes>
   </HashRouter>
    )
}

export default Adminapp;

const logout = () =>{
    localStorage.clear();
    window.location.reload();
}