import React, { useState } from 'react'
import * as petService from '../../services/petService'
import { useNavigate } from 'react-router'

const PetForm = (props) => {
    const {updatePets, petToUpdate} =props

    const navigate=useNavigate()

    const [formState, setFormState] = useState(petToUpdate ? petToUpdate : {
        name:'', age:0, breed:''
    })
  
    // if u  have any function start with handle always pass event/evt
    const handleChange = (evt) =>{
     
        let {name, value} = evt.target

        if(name === "age"){
            value= Number(value)
        } // make age number and continue

        const newFormState = {...formState, [name]: value}


        setFormState(newFormState)

    }

    const handleSubmit = async (evt) => {
   
        evt.preventDefault()

    // another way to make sure that the age is number before its sented SAME AS THE ONE IN handlechange 
    //    const payload= {...formState}

    //    payload.age =Number(payload.age) 


    if(petToUpdate){

        const updatePet = await petService.update(petToUpdate._id, formState)
        
        if(updatePet){
            navigate('/')
        }
    }else{
           console.log("something went wrong")
    }
     
       const data = await petService.create(formState)

       if(data) {
        updatePets(data)
        navigate('/')

       }else{
        console.log("something went wrong")
       }
    }

    

  return (
    <div>
        <h1>Pet Form</h1>

        <form onSubmit={handleSubmit}> 
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name"  value={formState.name} onChange={handleChange}/>

            <label htmlFor="age">Age:</label>
            <input type="number" name="age" id="age" min={0} value={formState.age} onChange={handleChange}/>

            <label htmlFor="breed">Breed:</label>
            <input type="text" name="breed" id="breed" value={formState.breed} onChange={handleChange}/>

            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default PetForm