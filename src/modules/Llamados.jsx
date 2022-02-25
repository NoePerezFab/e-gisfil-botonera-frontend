import { useEffect, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import MenuLlamados from "./MenuLlamados"


const Llamados = ({mostrador,setturnoAtencion,sucursal}) => {
    const intervalRef = useRef() 
    const [red, setred] = useState(false)
    const [fecha, setfecha] = useState(null)
    const [menssage, setmenssage] = useState(false)
    const messageref = useRef()
    const convertNumber = (n)=>{
        if(n < 10){
            return "0"+n
        }
        return n

     }

    useEffect(() => {
        const getFecha = () => {
            
            const fechaActual = new Date()
            setfecha({dia : convertNumber(fechaActual.getDate()),
                        mes : convertNumber(fechaActual.getMonth()+1),
                        anio : fechaActual.getFullYear(),
                        hora : convertNumber(fechaActual.getHours()),
                        minutos : convertNumber(fechaActual.getMinutes()),
                        segundos : convertNumber(fechaActual.getSeconds())})
                       
        } 
            intervalRef.current = setInterval(getFecha,1000)
        
        
    }, [])
    const redireccionar = async () =>{
        //Llamado normal
           /* const response = await fetch('../botoneraback/api/llamado?id_sucursal='+sucursal.id+'&tipo_servicio='+mostrador.tipo_servicio+'&clave='+mostrador.clave,{ 

                method: 'GET',
                mode: 'no-cors', // <---
                cache: 'default',
              })*/

        //Llamado por prioridad, tomando en cuenta tiempo maximo de espera
              const response = await fetch('../botoneraback/api/llamadoprioridad?id_sucursal='+sucursal.id+'&tipo_servicio='+mostrador.tipo_servicio+'&clave='+mostrador.clave,{ 

                method: 'GET',
                mode: 'no-cors', // <---
                cache: 'default',
              })
            
            const responseJson = await response.json()
        if(!Array.isArray(responseJson)){
            clearInterval(intervalRef.current)
            setturnoAtencion(responseJson)
            setred(true)
        }else{
            showMessage()
        }
        
    }

    const showMessage = () =>{
            setmenssage(true)
            messageref.current = setInterval(hideMessage,2000)
    }

    const hideMessage = () =>{
        setmenssage(false)
        clearInterval(messageref.current)

    }

    

    return (
        <>
        
        <MenuLlamados mostrador={mostrador} setturnoAtencion={setturnoAtencion} 
        sucursal={sucursal} setred={setred} intervalRef={intervalRef}/>
        
        <h2 className="pt-4 mt-5 text-center">{mostrador.nombre}</h2>
        {fecha !== null ? <h4 className="text-center">{fecha.dia}/{fecha.mes}/{fecha.anio}    {fecha.hora}:{fecha.minutos}:{fecha.segundos}</h4>
        : <></>}
        
        {!red ?
        <div class="d-flex justify-content-center align-items-center flex-column mt-5 ">
            
                <button type="button" onClick={redireccionar} className="btn  btn-lg btn-block p-5 m-5 w-50 " style={{background:"#0D7E61",color:"white",fontSize:"3rem"}}>Llamar siguiente turno</button>
            
        </div>:

        <Navigate to={ "/atencion"}/>}

        {menssage ?
         <div class="alert alert-primary" role="alert">
             No hay turnos en espera
                </div> :
                <></> }
        </>
    )
}

export default Llamados
