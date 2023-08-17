"use client"
import { ChangeEvent, useState } from "react";
import { CharactersInterface } from "@/app/model";
import HomePage from "@/app/pages/homepage/page";
import { getCharacters } from "@/app/characters/page";

async function fetchCharacters() {
  const characters: CharactersInterface[] = await getCharacters();
  return characters;
}

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [filterCharacters, setFilterCharacters] = useState<CharactersInterface[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const characters = await fetchCharacters();

    const filteredResults = characters.filter(
      (character) =>
        character.name.toLowerCase().includes(search.toLowerCase()) ||
        character.house.toLowerCase().includes(search.toLowerCase())
    );

    setFilterCharacters(filteredResults);
  };

  return (
    <form onSubmit={handleSubmit} >
      <input
        value={search}
        onChange={handleChange}
        type="search"
        placeholder="Search by name or house"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="grid gap-4 mt-4">
        {filterCharacters.map((character) => (
          <HomePage key={character.id} character={character} />
        ))}
      </div>
    </form>
  );
}
