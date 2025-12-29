import { useEffect, useState } from 'react'
import * as petService from './services/petService'
import PetList from './components/PetList'
import './App.css'

function App() {

  const [pets, setPets] = useState([])


  // we only want to fetch the pets list
  // ONCE, When the component first ( e.g. on page landing)

  useEffect(()=>{

    
  
    const getAllPets = async () =>{

    try{
      
    const pets = await petService.index()
      
    setPets(pets)}

    catch(error){
      console.log(error)
      
    }
    
    } 

    getAllPets()


  },[])

  return <PetList pets={pets}/>
}

export default App
