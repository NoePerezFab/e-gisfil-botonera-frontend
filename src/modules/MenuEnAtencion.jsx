import React from 'react'
import gisnetLogo from '../images/gisnetLogo.png'
const MenuEnAtencion = ({setred,intervalRef,turnoAtencion}) => {
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
  return (
    <header >
            <nav class="navbar navbar-dark  fixed-top d-flex  " style={{background:"#0D529B"}}>
                <div class="container-fluid d-flex  align-items-end " style={{color:"#ffffff"}}>
                    <img src={gisnetLogo} alt="" width="50" height="50" class="  "/>
                    <h2 class="mr-auto  ml-2 " >e-GISfil</h2>    
                    <button type="button" onClick={redireccionar} className="btn  btn-lg mr-1  " style={{background:"#0D7E61",color:"white"}}>Finalizar</button> 
                </div>     
                
            </nav>
        </header>
  )
}

export default MenuEnAtencion