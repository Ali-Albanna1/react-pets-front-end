import { useEffect, useState } from 'react'
import { Routes,Route } from 'react-router'
import { Link } from 'react-router'


// services
import * as petService from './services/petService'

//component
import PetList from './components/PetList/PetList'
import PetDetail from './components/PetDetail/PetDetail'
import PetForm from './components/PetForm/PetForm'

import './App.css'
import EditPetForm from './components/V2/EditPetForm/EditPetForm'



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

  const deletePet =  (id) =>{
    const newPetList = pets.filter( pet => pet._id !== id)
    setPets(newPetList)
  }

  const updateOnePet = (updatedPet) =>{

    const newUpdatedPetList = pets.map((onePet) => {

      if (onePet._id === updatedPet._id){
        return updatedPet

      }else{
        return onePet
      }
    })

    setPets(newUpdatedPetList)
  }

  // this function just used to determine what pet in 
  // the detail page i clicked on (onClick function)
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

      {/* <Route path='/' element={<PetListV2 pets={pets}/>}/>  ejs style */}

      <Route path='/pets/:id' element={<PetDetail findPetToUpdate={findePetToUpdate} deletePet={deletePet}/>}/>

      <Route path='/pets/new' element={<PetForm updatePets={updatePets}/>}/> 

      <Route path='/pets/:id/update' element={<PetForm petToUpdate={petToUpdate} updatePets={updatePets} updateOnePet={updateOnePet}/>}/> 

      <Route path='/pets/:id/edit' element={<EditPetForm updateOnePet={updateOnePet}/>}/> {/* ejs style */}

      {/* Lift state style */}
    </Routes>
      
    </>
  )
}

export default App
