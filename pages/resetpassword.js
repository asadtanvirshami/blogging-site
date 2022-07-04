import {React,useEffect,useState} from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

export const resetPassword = () => {
  
  useEffect(() => {
    let req = axios.get(process.env.NEXT_PUBLIC_FP_PAGINATED_BLOGS).then((x)=>{
     console.log(x.data)
    })
   }, [])
   
  return (
    <div className="container">
      <div>
      </div>
    </div>
  );
};
export default resetPassword;
