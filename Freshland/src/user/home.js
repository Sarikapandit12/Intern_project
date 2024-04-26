import {useState, useEffect} from "react";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";



const Myhome = () =>{

    let[allproduct, updateProduct] = useState( [] );

    const getProduct = () =>{
        fetch("http://localhost:1234/productlist")
        .then(response=>response.json())
        .then(productArray=>{
            updateProduct( productArray.reverse());
        })
    }

    useEffect(()=>{
        getProduct();
    }, []);
    
    let [keyword, pickKeyword] = useState("");
    const PER_PAGE = 8;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);

    const addtocart = (product) =>{
        product["qty"] = 1;
        let url = "http://localhost:1234/cart";
        let postData = {
           headers:{'Content-Type':'application/json'},
           method:"POST",
           body:JSON.stringify(product)
        }
        fetch(url, postData)
        .then(response=>response.json())
        .then(pdata=>{
             swal(product.name, "Added IN Your Cart", "success");          
        })
    }


    return(
        < >
           <section id="banner"> </section>
           <div className="container mt-4">
            <div className="row mb-4">
                <div className=" col-lg-4">  </div>
                <div className="col-lg-4">
                <input type="text" className="form-control"  placeholder = "Search...."
                 onChange={obj=>pickKeyword(obj.target.value)} 
                 />  
                </div>
                
                
                </div>
                
            <div className="row">
               {
                allproduct.slice(offset, offset+PER_PAGE).map((product, index)=>{
                    if(product.name.toLowerCase().match(keyword.toLocaleLowerCase()) 
                    || product.price.toString().match(keyword))
                    return(
                        <div className="col-lg-3 mb-4" key={index}>
                          <div className="p-3 text-center">
                              <h4 className="text-primary mb-2">{product.name}</h4>
                              <img src={ product.photo } height="150" width="100%" alt=""/>
                              <p> Rs. { product.price } </p>
                              <p> { product.details }</p>
                              <p className="text-center">
                                <button className="btn btn-danger btn-sm" onClick={addtocart.bind(this, product)}>
                                    <i className="fa fa-shopping-cart"></i> Add To Cart
                                </button>
                              </p>
                          </div>
                        </div>
                    )
                })
               }
            </div>
            <div className="mb-4 mt-4">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination  justify-content-center"}
                    pageClassName={"page-item "}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active primary"}
                />
         </div>
           </div>
        </>
    )
}

export default Myhome ;