import { useState } from "react";
import swal from "sweetalert";

const Mylogin = () =>{
    let[username, pickUsername] = useState("");
    let[password, pickPassword] = useState("");

    const loginCheck = () =>{
        if(username ==="" || password ==="")
        {
            swal("Sorry", "Empty Username or Password ", "warning!");
        }else{
         let url = "http://localhost:1234/account?email="+username+"&password="+password;
         fetch(url)
         .then(response=>response.json())
         .then(userinfo=>{
            if( userinfo.length>0 )
            {
                localStorage.setItem("id", userinfo[0].id);
                localStorage.setItem("name", userinfo[0].fullname);
                window.location.reload(); // To refresh the current page login success.
            }else{
                swal("Login Fail !"," Invalid username or password", "Warning");
            }
         })
        }
    }
    return(
        
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-lg-4"> </div>
                <div className="col-lg-4">
                    <div className="card border-0 shadow-lg">
              
                        <div className="card-header bg-danger text-white">
                            <i className="fa fa-lock fa-lg"></i>Login
                        </div>

                        <div className="card-body">
                            <div className="mb-4">
                                <label for="">E-mail Id</label>
                                <input type="email" className="form-control"
                                onChange={obj=>pickUsername(obj.target.value)}/>
                            </div>
                            <div className="mb-4">
                                <label for="">Password</label>
                                <input type="password" className="form-control"
                                onChange={obj=>pickPassword(obj.target.value)}/>
                            </div>
                            
                        </div>

                        <div className="card-footer text-center">
                            <button className="btn btn-primary" onClick={loginCheck}> Login <i className="fa fa-arrow-right"></i></button>
                        </div>
                    </div>
            
                </div>
            <div className="col-lg-4"></div>
        </div>
    </div>

  )
}

export default Mylogin ;

