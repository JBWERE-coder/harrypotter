"use client";
import Link from "next/link";
import Image from "next/image";

interface CharactersInterface {
  id: string
  name: string
  alternate_names: string[]
  species: string
  gender: string
  house: string
  dateOfBirth: string
  yearOfBirth: number
  wizard: boolean
  ancestry: string
  eyeColour: string
  hairColour: string
  wand: Wand
  patronus: string
  hogwartsStudent: boolean
  hogwartsStaff: boolean
  actor: string
  alternate_actors: any[]
  alive: boolean
  image: string
}
interface Wand {
  wood: string
  core: string
  length: number
}

export default function HomePage({ character }: any) {
  return (
    <Link href={`pages/character/${character.id}`} className="flex flex-col overflow-hidden rounded-lg border bg-white home">
      <div  className="grouprelative block h-48 overflow-hidden md:h-64 bg-gray-100">
        {/* <img src={character.image} alt={character.name}
        
        /> */}
        <Image 
        src={character.image} 
        alt={character.name} 
        width={500} height={500} 
        />
      
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p>{character.name}</p>
        <p>{character.dateOfBirth}</p>
       </div>
    </Link>
  );
}