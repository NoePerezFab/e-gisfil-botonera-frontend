import { useEffect, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import MenuEnAtencion from "./MenuEnAtencion"


const Atencion = ({mostrador,turnoAtencion}) => {
    const intervalRef = useRef() 
    const [red, setred] = useState(false)
    const [time, settime] = useState(0)
    
    
    useEffect(() => {
        const timer = () =>{
           settime((secs) => secs + 1)
        }
        intervalRef.current = setInterval(timer,1000)
    }, [])
    const redireccionar = async () =>{
            const bodyJson = JSON.stringify(turnoAtencion)
            const response = await fetch('../botoneraback/api/finalizarturno',{ 
                headers : { 'Content-Type': 'application/json' },
                method: 'POST',
                mode: 'cors', // <---
                body : bodyJson,
                cache: 'default',
              })
            const responseJson = await response.json()
            console.log(responseJson);

        clearInterval(intervalRef.current)
        setred(true)
    }
    const formattime = (timer) =>{
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }

   
    return (
       <>
        
        <MenuEnAtencion setred={setred} intervalRef={intervalRef} turnoAtencion={turnoAtencion}/>
        
        <h2 className="pt-4 mt-5 text-center">{mostrador.nombre}</h2>
         <h4 className="text-center"> {formattime(time)}</h4>
         <h4 className="text-center"> Atendiendo turno : {turnoAtencion.turno}</h4>
       
        
        {!red ?
        <div class="d-flex justify-content-center align-items-center flex-column mt-5 ">
            
                <button type="button" onClick={redireccionar} className="btn  btn-lg btn-block p-5 m-5 w-50 " style={{background:"#0D7E61",color:"white",fontSize:"3rem"}}>Finalizar llamado</button>
            
        </div>:

        <Navigate to={ "/llamados"}/>}
        </> 
    )
}

export default Atencion
