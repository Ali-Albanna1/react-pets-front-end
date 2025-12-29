import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

const index = async () => { 

    try{

         const response = await axios.get(BASE_URL)
     console.log(response)
         return response.data.pet

    }catch(error){
        console.log(error)
   
    }


}

export {
    index
}