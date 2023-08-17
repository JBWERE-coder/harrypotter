"use client"
import { getCharacters } from "@/app/characters/page"
import { ChangeEvent, useState } from "react"
import { CharactersInterface } from "@/app/model"
import HomePage from "@/app/pages/homepage/page"

export default async function Search(){
    const [search, setSearch] = useState<string>('')
    const [filterCharacters, setFilterCharacters] = useState<CharactersInterface[]>([])
    const characters:CharactersInterface[] = await getCharacters()
    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setSearch(event.target.value)
    }
    const handleSubmit = (e:React.SyntheticEvent) =>{
        e.preventDefault()
        const filteredResults = characters.filter(
            (character) =>
              character.name.toLowerCase().includes(search.toLowerCase()) ||
              character.house.toLowerCase().includes(search.toLowerCase())
          );
          setFilterCharacters(filteredResults);
    }
    return <form onSubmit={handleSubmit}>
        <input value={search} onChange={handleChange} type="search" placeholder="Search by name or house"/>
        {filterCharacters.map((character) =><HomePage key={character.id} character={character}/>)}
    </form>
}