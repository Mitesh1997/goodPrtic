import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Custonhook from "./Custonhook";

function App() {
  const [search,setSeacrch]=useState("")
  // const urlPath="http://localhost:3001/api/products?search="+search;
//  const [products,error,loading]= Custonhook("http://localhost:3001/api/products?search="+search)
 
// 
const [products, setProducts] = useState([]);
const [error, setError] = useState(null)
const [loading, setLoading] = useState(null)
useEffect(() => {
  const controller=new AbortController()
  ;(async () => {
  try {
    setError(false)
    setLoading(true)
    
    const response = await axios.get("http://localhost:3001/api/products?search="+search,{
      signal:controller.signal
    });
    console.log(response.data)
    setProducts(response.data)
    setLoading(false)
  }
    catch(error){
      if(axios.isCancel(error)){
        console.log("Req cancel",error.message);
        return
      }
      setError(true)
      setLoading(false)
    }
  })();
  return ()=>{
    controller.abort()
  }
}, [search]);
// 

  if(error){
    return <h1>Something went wrong</h1>
  }
  if(loading){
    return <h1>Loading .....</h1>
  }
  return (
    <>
    {/* <input type="text" placeholder="search"
    value={search}
    onChange={(e)=>setSeacrch(e.target.name)}
    
    /> */}
    <input 
  type="text" 
  placeholder="search"
  value={search}
  onChange={(e) => setSeacrch(e.target.value)}
/>
      <h1>Number of product are : {products.length}</h1>
    </>
    
  );


  // return (
  //   <>
  //     {error && <h1>Something went wrong</h1>}
  //     {loading && <h1>Loading .....</h1>}
  //     {!error && !loading && (
  //       <h1>Number of products are: {products.length}</h1>
  //     )}
  //   </>
  // );
  
}

export default App;   
  