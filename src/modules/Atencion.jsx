import { useEffect, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import Menu from "./Menu"


const Atencion = ({mostrador,sucursal}) => {
    const intervalRef = useRef() 
    const [red, setred] = useState(false)
    const [time, settime] = useState({mins : 0, secs : 0})
    
    
    useEffect(() => {
        const timer = () =>{
            let tiempo = time
            console.log(tiempo);
            tiempo.secs = tiempo.secs + 1
            if(tiempo.secs === 60 ){
                tiempo.secs = 0
                tiempo.mins = tiempo.mins + 1
            }
            settime(tiempo)
        }
        intervalRef.current = setInterval(timer,1000)
    }, [])
    const redireccionar = () =>{
        setred(true)
    }

    return (
       <>
        
        <Menu/>
        
        <h2 className="pt-4 mt-5 text-center">{mostrador.nombre}</h2>
         <h4 className="text-center"> {time.mins}:{time.secs}</h4>
       
        
        {!red ?
        <div class="d-flex justify-content-center align-items-center flex-column mt-5 ">
            
                <button type="button" onClick={redireccionar} className="btn  btn-lg btn-block p-5 m-5 w-50 " style={{background:"#0D7E61",color:"white",fontSize:"3rem"}}>Finalizar llamado</button>
            
        </div>:

        <Navigate to={ "/llamados"}/>}
        </> 
    )
}

export default Atencion
