import React, { useEffect, useState } from 'react'
import axios from "axios";

const Custonhook = (urlPath) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    useEffect(() => {
      (async () => {
      try {
        setError(false)
        setLoading(true)
        
        const response = await axios.get(urlPath);
        console.log(response.data)
        setProducts(response.data)
        setLoading(false)
      }
        catch(error){
          setError(true)
          setLoading(false)
        }
      })();
    }, []);
    return([products,error,loading])
}

export default Custonhook
