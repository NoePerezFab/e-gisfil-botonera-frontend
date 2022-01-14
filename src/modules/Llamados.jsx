import { useEffect, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import Menu from "./Menu"


const Llamados = ({mostrador}) => {
    const intervalRef = useRef() 
    const [red, setred] = useState(false)
    const [fecha, setfecha] = useState(null)

    const convertNumber = (n)=>{
        if(n < 10){
            return "0"+n
        }
        return n

     }

    useEffect(() => {
        const getFecha = () => {
            
            const fechaActual = new Date()
            console.log(fechaActual);
            setfecha({dia : convertNumber(fechaActual.getDate()),
                        mes : convertNumber(fechaActual.getMonth()+1),
                        anio : fechaActual.getFullYear(),
                        hora : convertNumber(fechaActual.getHours()),
                        minutos : convertNumber(fechaActual.getMinutes()),
                        segundos : convertNumber(fechaActual.getSeconds())})
                       
        } 
            intervalRef.current = setInterval(getFecha,1000)
        
        
    }, [])
    const redireccionar = () =>{
        clearInterval(intervalRef.current)
        setred(true)
    }

    return (
        <>
        
        <Menu/>
        
        <h2 className="pt-4 mt-5 text-center">{mostrador.nombre}</h2>
        {fecha !== null ? <h4 className="text-center">{fecha.dia}/{fecha.mes}/{fecha.anio}    {fecha.hora}:{fecha.minutos}:{fecha.segundos}</h4>
        : <></>}
        
        {!red ?
        <div class="d-flex justify-content-center align-items-center flex-column mt-5 ">
            
                <button type="button" onClick={redireccionar} className="btn  btn-lg btn-block p-5 m-5 w-50 " style={{background:"#0D7E61",color:"white",fontSize:"3rem"}}>Llamar siguiente turno</button>
            
        </div>:

        <Navigate to={ "/atencion"}/>}
        </>
    )
}

export default Llamados
