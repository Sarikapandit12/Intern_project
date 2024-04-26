   import { useState, useEffect} from "react";

   
   
const Mydashboard = () =>{
    let[allproduct, updateProduct] = useState( [] );
    let[allorder, updateOrder] = useState( [] );
   

   const getProduct = () =>{
       fetch("http://localhost:1234/productlist")
       .then(response=>response.json())
       .then(productArray=>{
           updateProduct( productArray.reverse());
       })
   }

   const getOrder = () =>{
    fetch("http://localhost:1234/order")
    .then(response=>response.json())
    .then(orderArray=>{
        updateOrder( orderArray.reverse());
    })
}

   useEffect(()=>{
       getProduct();
       getOrder();
   }, []);

    return(
        <div className="container mt-5">
            <div className="row">
                <h1 className="col-lg-12 text-center mb-5"> Seller Dashboard </h1>
                <div className="col-lg-2"></div>
                <div className="col-lg-4">
                    <div className="p-4 text-center text-primary border rounded">
                        <i className="fa fa-suitcase fa-4x mb-3"></i>
                        <h3> Total Product <br/> { allproduct.length } </h3>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="p-4 text-center text-success border rounded">
                        <i className="fa fa-headset fa-4x mb-3"></i>
                        <h3> Total Order <br/> { allorder.length } </h3>
                    </div>
                </div>
                <div className="col-lg-2"></div>
            </div>
        </div>
        
    )
}

export default Mydashboard ;