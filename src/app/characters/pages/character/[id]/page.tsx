import axios from "axios"
import { baseUrl } from "@/constants"
import { CharactersInterface } from "@/app/model"
import Image from "next/image"

fetch('url')
const getSingleCharacter = async (id:string) =>{
    const response = await axios(`${baseUrl}/character/${id}`)
    console.log(response)
    return response.data
}

export default async function Character({params}:{params:{id:string}}){
    const {id} = params
    const characterdetails:CharactersInterface[] = await getSingleCharacter(id)
    console.log(characterdetails[0])
    return <div>
        
       <Image src={characterdetails[0].image} width={400} height={600} alt={characterdetails[0].name}/>
       <div>
        <p>{characterdetails[0].actor}</p>
        <p>{characterdetails[0].ancestry}</p> 
        <p>{characterdetails[0].gender}</p>
        <p>{characterdetails[0].hogwartsStaff}</p>
        <p>{characterdetails[0].house}</p>
        <p>{characterdetails[0].dateOfBirth}</p>
        <p>{characterdetails[0].eyeColour}</p>

       </div>
        
    </div>
}