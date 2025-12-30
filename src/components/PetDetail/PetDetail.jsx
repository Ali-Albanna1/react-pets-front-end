import { useState, useEffect } from "react"
import * as PetService from '../../services/petService'
import { useParams } from "react-router"

function PetDetail() {
    const [pet, setPet] =useState(null)
    const {id} = useParams()
      
    useEffect(()=>{
        const getOnePet = async (id) => {
            const pet = await PetService.show(id)
            console.log(pet)
            setPet(pet)
        }
       if(id) getOnePet(id) //if for saftey to not run by accedient
    },[id])

    if(!id) return <h1>Loading...</h1>
    if(!pet) return <h1>Loading...</h1>

  return (
    <div>
       <p>PetDetail ID :{id}</p> 
       <p>Name :{pet.name}</p> 
       <p>Age :{pet.age}</p>
       <p>Breed :{pet.breed}</p>
        
        </div>
  )
}

export default PetDetail