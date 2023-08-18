"use client"
import { ChangeEvent, useRef, useState } from "react";
import { CharactersInterface } from "@/app/model";
import { getCharacters } from "@/app/characters/page";
import { useRouter } from "next/navigation";


async function fetchCharacters() {
  const characters: CharactersInterface[] = await getCharacters();
  return characters;
}

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [resultsVisibility, setResultsVisibility] = useState<boolean>(false);
  const [filterCharacters, setFilterCharacters] = useState<CharactersInterface[]>([]);
  const searchRef = useRef("");
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
    <div className="relative">
      <form onSubmit={handleChange}>
        <input
          ref={searchRef}
          onChange={handleChange}
          type="search"
          placeholder="Search by name or house"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </form>

      {resultsVisibility && (
        <div className="grid gap-4 mt-2 absolute z-10 top-full left-0 w-full bg-white shadow-md rounded-lg">
          {filterCharacters.map((character) => (
            <div
              key={character.id}
              onClick={() => handleNavigate(character.id)}
              className="flex flex-1 flex-col p-4 cursor-pointer"
            >
               <p>{character.name}</p>
              <p>{character.house}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
