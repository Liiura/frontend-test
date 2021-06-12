import React, { useEffect, useState } from 'react';
import Service from '../../services/service'
import './lessonsCareer.css'
import { useHistory } from 'react-router-dom';
const LessonsCareer=()=> {
    const [data,setData]=useState([])
    const history = useHistory()
    useEffect(()=>{
        asyncRequest()
    },[])
    const asyncRequest=async ()=>{
        try {
            const payload=await Service('student/GetAllCareers','get')
            setData(payload.data.Data)
        } catch (err) {
            alert(err)
        }
    }
    const pushRoute=(nombreclase)=>{
        history.push({
            pathname: '/lessons',
            state: nombreclase
        })
    }
  return (
    <div className='lessons'>
        <h1>Clases</h1>
      <div className="containerCards">
          {data.map((row)=>(
                <div className="card" key={row.nombreclase} id={row.nombreclase} onClick={()=>pushRoute(row.nombreclase)}>
                    <div className="headerCard">
                        <h2>{row.nombrecarrera}</h2>
                    </div>
                    <div className="bottomCard">
                        <h2>Clase: {row.nombreclase}</h2>
                    </div>
                </div>
          ))}
      </div>
    </div>
  );
}

export default LessonsCareer;