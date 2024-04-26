import { useState } from "react";
import swal  from "sweetalert";

const Newproduct = () =>{
    let[pname, pickName] = useState("");
    let[pprice, pickPrice] = useState("");
    let[pphoto, pickPhoto] = useState("");
    let[pdetails, pickDetails] = useState("");

    const save = () =>{
        let pinfo = {name:pname, price:pprice, photo:pphoto, details:pdetails};
        let url = "http://localhost:1234/productlist";
        let postData = {
           headers:{'Content-Type':'application/json'},
           method:"POST",
           body:JSON.stringify(pinfo)
        }
        fetch(url, postData)
        .then(response=>response.json())
        .then(pdata=>{
             swal(pname, "Save Successfully", "success");
             pickName("");
             pickPhoto("");
             pickPrice("");
             pickDetails("");
        })
     }

    return(
       <div className="container mt-5">
          <div className="row"> 
                <div className="col-lg-12 text-center mb-4">
                    <h2> Enter Product Details</h2>
                </div>

                <div className="col-lg-4 mb-4">
                    <label>  Product Name</label>
                    <input type="text" className="form-control"  
                  value={pname}  onChange={obj=>pickName(obj.target.value)}/>
                </div>

                <div className="col-lg-4 mb-4">
                    <label>  Product Price</label>
                    <input type="text" className="form-control"  
                   value={pprice} onChange={obj=>pickPrice(obj.target.value)}/>
                </div>

                <div className="col-lg-4 mb-4">
                    <label>  Product Photo</label>
                    <input type="text" className="form-control" 
                   value={pphoto}  onChange={obj=>pickPhoto(obj.target.value)}/>
                </div>
                <div className="col-lg-4 mb-4">
                    <label>  Product Description</label>
                    <input type="text" className="form-control"  
                   value={pdetails} onChange={obj=>pickDetails(obj.target.value)}/>
                </div>
                <div className="col-lg-4 mb-4 text-center">
                <br/>               
                <button  className="btn btn-success" onClick={save}> Save Product </button>          
                </div>
            </div>
       </div>
    )
}

export default Newproduct ;