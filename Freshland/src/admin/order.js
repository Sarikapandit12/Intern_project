import { useState, useEffect} from "react";

const Orderlist = () =>{   
    let[allorder, updateOrder] = useState( [] );
   
   const getOrder = () =>{
    fetch("http://localhost:1234/order")
    .then(response=>response.json())
    .then(orderArray=>{
        updateOrder( orderArray.reverse());
    })
}

   useEffect(()=>{      
       getOrder();
   }, []);

        return(
        <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h1>{allorder.length} : Order Management</h1>
                    </div>        
                </div>
            {
                allorder.map((order, index)=>{
                    return(
                        <div className="row mb-5" key={index}>
                            <h4 className="col-lg-12 text-center text-danger"> Order Id : {order.id}</h4>
                             <div className="col-lg-4">
                                <p> Customer : {order.fullname}</p>
                                <p> Customer : {order.mobile}</p>
                                <p> Customer : {order.email}</p>
                                <p> Customer : {order.address}</p>
                               
                             </div>
                             <div className="col-lg-8">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th> Product</th>
                                            <th> Price</th>
                                            <th> Quantity</th>
                                            <th> Photo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.itemlist.map((product, index2)=>{
                                               return(
                                                <tr key={index2}>
                                                    <td> {product.name}</td>
                                                    <td> {product.price}</td>
                                                    <td> {product.qty}</td>
                                                    <td> <img src={product.photo} height="30" width="60" alt=""/> </td>
                                                </tr>
                                               ) 
                                            })
                                        }
                                    </tbody>
                                </table>
                             </div>
                        </div>
                    )
                })
            }
        </div>
        )
}

export default Orderlist ;