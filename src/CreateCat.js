import { useState ,useEffect } from "react";
import { saveCategory } from "./api";
import 'react-notifications/lib/notifications.css';
import {useNavigate,Link,useLocation} from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import { NotificationManager,NotificationContainer } from 'react-notifications'; 
export default function CreateCat(){
    const location =useLocation();
    const navigate =useNavigate();
    useEffect(()=>{
        if(location.state!=null)
        NotificationManager.success(location.state.message,location.state.title)
}, [location.state]) 

    const[category,setCategory]=useState({
        name: ''
    });

    const handleName =(ev)=>{
        setCategory({...category,name: ev.target.value});
    }
    
    const handleForm= async(ev)=>{
        ev.preventDefault();
        const save = await saveCategory(category);
        navigate(0,{ state:{message:save.name+"saved ",title:"Saved!!!!"}});
    }
    return (
        <div className="container mt-5">
        
            <div>
                <form onSubmit={handleForm}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input id="name" type="text" className="form-control" value={category.name} onChange={handleName}/>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Сохранить 
                    </button>
                </form>
            </div>
        </div>
    )
 }