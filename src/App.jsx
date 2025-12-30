import { useEffect, useState } from 'react'
import { Routes,Route } from 'react-router'
import { Link } from 'react-router'

// services
import * as petService from './services/petService'

//component
import PetList from './components/PetList'
import PetDetail from './components/PetDetail/PetDetail'
import PetForm from './components/PetForm/PetForm'

import './App.css'



function App() {

  const [pets, setPets] = useState([])

  const [petToUpdate, setPetToUpdate] =useState(null)

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

  const updatePets = (pet) => {
    setPets([...pets, pet])
  }

  const findePetToUpdate = (petId) => {

    const foundPet = pets.find( pet => pet._id === petId)

    setPetToUpdate(foundPet)
  }

  return(
    <>
    <div>
      <Link to={'/'}>Home</Link> | {' '}
      <Link to={'/pets/new'}>Create Pet</Link>
    </div>

    <Routes>

      <Route path='/' element={<PetList pets={pets}/>}/>

      <Route path='/pets/:id' element={<PetDetail findPetToUpdate={findePetToUpdate}/>}/>

      <Route path='/pets/new' element={<PetForm updatePets={updatePets}/>}/> 

      <Route path='/pets/:id/update' element={<PetForm petToUpdate={petToUpdate} updatePets={updatePets}/>}/> 
    </Routes>
      
    </>
  )
}

export default App
