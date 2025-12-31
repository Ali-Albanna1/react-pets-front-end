import { useState, useEffect } from "react"
import * as PetService from '../../services/petService'
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router"

function PetDetail({findPetToUpdate, deletePet}) {
    const [pet, setPet] =useState(null)
    const {id} = useParams()
    const navigate= useNavigate()
      
    useEffect(()=>{
        const getOnePet = async (id) => {
            const pet = await PetService.show(id)
            console.log(pet)
            setPet(pet)
        }
       if(id) getOnePet(id) //if for saftey to not run by accedient
    },[id])

    const handleDelete= async () =>{
      
      const deletedPet =await PetService.deleteOne(id)
      if(deletedPet){
        deletePet(id)
       navigate('/')
      }else{
         console.log('something went wrong')
      }
    }

    if(!id) return <h1>Loading...</h1>
    if(!pet) return <h1>Loading...</h1>

  return (
    <div>
       <p>PetDetail ID :{id}</p> 
       <p>Name :{pet.name}</p> 
       <p>Age :{pet.age}</p>
       <p>Breed :{pet.breed}</p>
        <div><Link onClick={()=>findPetToUpdate(id)} to={`/pets/${id}/update`}>Edit</Link></div>
        <br />
        <div><Link  to={`/pets/${id}/edit`}>New Edit</Link></div>
        <br />
        <button onClick={handleDelete}>Delete</button>
        </div>
  )
}

export default PetDetail