
import { useRef } from 'react/cjs/react.production.min'
import gisnetLogo from '../images/gisnetLogo.png'
const MenuLlamados = ({mostrador,setturnoAtencion,sucursal,setred,intervalRef}) => {
    const turnoRef = useRef(null)
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
            clearInterval(intervalRef)
            setturnoAtencion(responseJson)
            setred(true)
        }
        
    }
    const llamadoTurnoEspecifico = async()=>{
      const response = await fetch('../botoneraback/api/llamadoturno?id_sucursal='+sucursal.id+'&tipo_servicio='+mostrador.tipo_servicio+'&clave='+mostrador.clave+"&turno="+turnoRef.current.value,{ 

        method: 'GET',
        mode: 'no-cors', // <---
        cache: 'default',
      })
    
    const responseJson = await response.json()
      if (!Array.isArray(responseJson)){
        clearInterval(intervalRef)
        setturnoAtencion(responseJson)
        setred(true)
      }
    }
  return (
    <header >
            <nav class="navbar navbar-dark  fixed-top d-flex  " style={{background:"#0D529B"}}>
                <div class="container-fluid d-flex  align-items-end " style={{color:"#ffffff"}}>
                    <img src={gisnetLogo} alt="" width="50" height="50" class="  "/>
                    <h2 class="mr-auto  ml-2 " >e-GISfil</h2>
                    <button type="button" className="btn  btn-lg mr-1  " onClick={redireccionar} style={{background:"#0D7E61",color:"white"}}>Siguiente turno</button> 
                    <input type='text' className='m-2 ml-4' ref={turnoRef}/>
                    <button type="button" className="btn  btn-lg mr-1 btn-danger " onClick={llamadoTurnoEspecifico} >Llamar turno</button> 
                    
                     
                </div>      
            </nav>
        </header>
  )
}

export default MenuLlamados