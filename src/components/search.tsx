"use client"
import { ChangeEvent, useRef, useState } from "react";
import { CharactersInterface } from "@/app/model";
import HomePage from "@/app/pages/homepage/page";
import { getCharacters } from "@/app/characters/page";
import { useRouter } from "next/navigation";
import Link from "next/link";

async function fetchCharacters() {
  const characters: CharactersInterface[] = await getCharacters();
  return characters;
}

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [resultsVisibility, setResultsVisibility] = useState<boolean>(false);
  const [filterCharacters, setFilterCharacters] = useState<CharactersInterface[]>([]);
  const searchRef = useRef("");

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSearch(event.target.value);
  // };

  const handleChange = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if(searchRef.current.value !==''){
      // setResultsVisibility(false);
      const characters = await fetchCharacters();
  
      const filteredResults = characters.filter(
        (character) =>
          character.name.toLowerCase().includes(searchRef?.current.value.toLowerCase()) ||
          character.house.toLowerCase().includes(searchRef?.current.value.toLowerCase())
      );
  
      setFilterCharacters(filteredResults);
      setResultsVisibility(true);
      return;
    }

    setFilterCharacters([]);
    setResultsVisibility(false);

  };
  const router = useRouter();
  const handleNavigate = (navigate:string) => {
     router.push(`/pages/character/${navigate}`);
    searchRef.current.value = '';
    setResultsVisibility(false);
}

  return (
    <form onSubmit={handleChange} >
      <input
        ref={searchRef}
      //  value={search}
        onChange={handleChange}
        type="search"
        placeholder="Search by name or house"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {filterCharacters?.length >0 && (
        <div className="grid gap-4 mt-4 absolute top-6">
          {filterCharacters.map((character) => (
          // <HomePage key={character.id} character={character} />
          <div onClick={()=> handleNavigate(character.id)} className="flex flex-1 flex-col p-4 bg-white shadow-md rounded-lg" >
          <p>{character.name}</p>
          <p>{character.house}</p>
        </div>
          ))}
        </div>

      )}
    </form>
  );
}
