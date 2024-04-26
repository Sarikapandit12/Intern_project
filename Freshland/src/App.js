import Adminapp from "./admin/adminapp";
import UserApp from "./user/userapp";


function App() {
  let loginStatus = localStorage.getItem("id");

  if(loginStatus != null)
  {
    return( <Adminapp/>)
  }else{
    return(<UserApp/>
    )
  }
 
 
}

export default App;