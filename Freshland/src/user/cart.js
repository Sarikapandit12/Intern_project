import {useState, useEffect} from "react";
import swal from "sweetalert";

const Mycart = () =>{
    let[allproduct, updateProduct] = useState( [] );
    const getProduct = () =>{
        fetch("http://localhost:1234/cart")
        .then(response=>response.json())
        .then(productArray=>{
            updateProduct( productArray.reverse());
        })
    }

    useEffect(()=>{
        getProduct();
    }, []);

    const delproduct = (id) =>{
        let url = "http://localhost:1234/cart/"+id;
        let postData = {method:"delete"};
        fetch(url, postData)
        .then(response=>response.json())
        .then(emptyres=>{
            getProduct(); // Reload the list after delete
        })
    }

    const updateqty = (product, action) =>{
       if(action==="A")
       {
        product["qty"] = product.qty + 1;
       }else{
        product["qty"] = product.qty - 1;
       }

       if(product.qty===0){
        delproduct(product.id);
       }

       let url = "http://localhost:1234/cart/"+product.id;
       let postData = {
        headers:{'Content-Type' : 'application/json'},
        method:'put',
        body:JSON.stringify(product)
       }
       fetch(url, postData)
       .then(response=>response.json())
        .then(serverres=>{
            getProduct();// Reload the list after quantity update
        })
    }

    let [fullname, pickNmae] = useState("");
    let [mobile, pickMobile] = useState("");
    let [email, pickEmail] = useState("");
    let [address, pickAddress] = useState("");

     const save = () =>{
        let url = "http://localhost:1234/order";
        let orderdata = {fullname:fullname, mobile:mobile, email:email, address:address, itemlist:allproduct}
        let postData = {
         headers:{'Content-Type' : 'application/json'},
         method:'post',
         body:JSON.stringify(orderdata)
        }
        fetch(url, postData)
        .then(response=>response.json())
         .then(serverres=>{
            swal("Order Recieved", "Hi, We have recievec your order !" ,"Success" );
         })     
     }
     

    return(
        <div className="container mt-5 mb-5">     
            <div className="row">
                <div className="col-lg-12 text-center">
                <h1> {allproduct.length} : Item in My Cart </h1>
                </div>
            </div>
            <div  className="row mt-4">
                <div className="col-lg-4">
                    <h3 className="text-center text-info mb-4"> Customer Details</h3>
                    <div className="mb-4">
                        <label> Full Name</label>
                        <input type="text" className="form-control" onChange={obj=>pickNmae(obj.target.value)}/>
                    </div>
                    <div className="mb-4">
                        <label> Mobile Number</label>
                        <input type="text" className="form-control" onChange={obj=>pickMobile(obj.target.value)}/>
                    </div>
                    <div className="mb-4">
                        <label> E-mail Id</label>
                        <input type="text" className="form-control" onChange={obj=>pickEmail(obj.target.value)}/>
                    </div>
                    <div className="mb-4">
                        <label> Delevery Address</label>
                        <textarea type="text" className="form-control" onChange={obj=>pickAddress(obj.target.value)}></textarea>
                    </div>
                    <div className="text-center">
                    <button className="btn btn-danger btn-lg" onClick={save}> Place Order</button>
                    </div>
                </div>

             <div className="col-lg-8">
                <table className="table table-borderd">
                    <thead>
                    <tr>
                        <th> Product</th>
                        <th>Price</th>
                        <th> Quantity</th>
                        <th>Total</th>
                        <th> Photo</th>
                        <th> Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        allproduct.map((product, index)=>{
                            return(
                                <tr key={index}>
                                    <td> {product.name} </td>
                                    <td> { product.price } </td>

                                    <td> 
                                        <button className="btn btn-warning btn-sm me-2" onClick={updateqty.bind(this, product, "B")}> - </button>
                                        { product.qty }
                                        <button className="btn btn-info btn-sm ms-2" onClick={updateqty.bind(this, product, "A")}> + </button>
                                    </td>
                                    <td> {product.price * product.qty} </td>
                                    <td> <img src={product.photo} height ="40" width="60"/> </td>
                                    <td>
                                        <i className="fa fa-trash fa-lg text-danger" onClick={delproduct.bind(this, product.id)}> </i>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>           
             </div>
           </div>
        </div>     
        
    )
}

export default Mycart ;