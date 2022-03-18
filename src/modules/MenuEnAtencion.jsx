import React from 'react'
import gisnetLogo from '../images/gisnetLogo.png'
const MenuEnAtencion = ({setred,intervalRef,turnoAtencion}) => {
    const finalizar = async () =>{
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

  const abandono = async() =>{
    const bodyJson = JSON.stringify(turnoAtencion)
        const response = await fetch('../botoneraback/api/abandonoturno',{ 
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

  const espera = async() =>{
    const bodyJson = JSON.stringify(turnoAtencion)
        const response = await fetch('../botoneraback/api/ponerturnoenespera',{ 
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
                    <button type="button" onClick={finalizar} className="btn  btn-lg mr-3  " style={{background:"#0D7E61",color:"white"}}>Finalizar</button> 
                    <button type="button" onClick={abandono} className="btn  btn-lg mr-3 btn-danger  " >Abandono de turno</button> 
                    <button type="button"  onClick={espera}className="btn  btn-lg mr-1 btn-info " >Poner en espera</button> 
                </div>     
                
            </nav>
        </header>
  )
}

export default MenuEnAtencion