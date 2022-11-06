import React, { useState,useEffect } from 'react';

//include images into your bundle


//create your first component
const Home = () => {
	 //POST subir info
  //GET obtener info
  //PUT modificar info
  //DELETE
  const [array, setArray] = useState([])
  const [input, setInput] = useState([""])

  //PARA MOSTRAR LOS ELEMENTOS TENEMOS LA FUNCION getallelements

  useEffect (() =>{
  getallelements ()

   }, [array] )

  const getallelements = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://assets.breatheco.de/apis/fake/todos/user/javierMurillo", requestOptions)
      .then(response => response.json())
      .then(result => setArray(result)) // YA TENEMOS EL RESULTADO DE LA APi
      .catch(error => console.log('error', error));


  }




  //PARA CREAR ELEMENTOS TENEMOS LA FUNCION createElements


  const createElements = () => {
  

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Preguntar porque debo declarar una variable para que me incluya en mi array un nuevo objeto.

    let add = array.concat(
      {
        "label": input,
        "done": false
      }
    );

 

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(add),
      redirect: 'follow'
    };

    fetch("https://assets.breatheco.de/apis/fake/todos/user/javierMurillo", requestOptions)
      .then(response => response.json())
      .then(result => getallelements())
      .catch(error => console.log('error', error));

  }

  // FUNCION 

  const handleChange = (event) => {

    setInput(event.target.value) 
  }


  //Funcion para borrar elemento


  const deleteElements = (index) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    array.splice(index, 1)
                       

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(array),
      redirect: 'follow'
    };

    fetch("https://assets.breatheco.de/apis/fake/todos/user/javierMurillo", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }







  return (
    <div className = "container" >
    <div className="text-center">
    
      <h1 className="text-center" style={{ backgroundColor: "#48BAFB", borderRadius: "25px" }}>Lista de Tareas</h1>

     
      <div className="text-center">
        <input type="text" onChange={handleChange} style= {{backgroundColor: "white"}} ></input>
        <button onClick={createElements} style={{ backgroundColor: "#5EC0F9" , cursor: "pointer" }}>Agregar</button>
       
      </div>

      {array.map((element, index) => <p style={{ backgroundColor: "#9ED6F8" }}>{element.label}   <button onClick={() => deleteElements(index)}><i class="fas fa-eraser"></i></button></p>)}



    </div>
    </div>


  )


}




export default Home;
