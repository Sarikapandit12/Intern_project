import { useState, useEffect} from "react";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";

const Allproduct = () =>{
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

    const delproduct = (id) =>{
        let url = "http://localhost:1234/productlist/"+id;
        let postData = {'method':'delete'};
        fetch(url, postData)
        .then(response=>response.json())
        .then(serverinfo=>{
            swal("Deleted", "Product Details Deleted Successfully", "info");
            getProduct();
        })
    }

    let [keyword, pickKeyword] = useState("");
    const PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);
    

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-12 text-center">
                  <h3>Available Products : {allproduct.length}</h3>
                </div>
               
                

                <div class="form-outline mb-5">
                    <input type="text" class="form-control ps-4" placeholder="search..." onChange={obj=>pickKeyword(obj.target.value)} />
                    <i class="fas fa-search ms-2"></i>
                </div>
           
                             

                {
                    allproduct.slice(offset, offset + PER_PAGE).map((product, index)=>{
                        if(product.name.toLowerCase().match(keyword.toLocaleLowerCase()) 
                        || product.price.toString().match(keyword))
                        return(
                            <div className="col-lg-2 mb-4 text-center" key={index}>
                                <h5> {product.name} </h5>
                                <p>Rs. {product.price} </p>
                                <img src={product.photo} height="100" width="90%" alt=""/>
                                <p className="m-2"> {product.details} </p>
                                <button className="btn btn-danger btn-sm mt-2"
                                onClick={delproduct.bind(this, product.id)}> 
                                
                                    <i className="fa fa-trash fa-lg"></i>
                                </button>
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
    )
}

export default Allproduct;