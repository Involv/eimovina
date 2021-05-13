import React, { FC, useState } from "react";
import { SearchIcon, SearchCircleIcon } from "@heroicons/react/outline";

interface SearchBarProps {
  onSearchSubmit: (value: string) => void;
}
export const SearchBar: FC<SearchBarProps> = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <div className="flex">
      <input
        className="w-full bg-white rounded-full py-3 px-4 border-gray-200"
        type="text"
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setSearchTerm(e.currentTarget.value)
        }
        placeholder="Pretrazi po listu nepokretnosti ili broju parcele"
      />
      <div
        className="flex items-center justify-center"
        onClick={() => onSearchSubmit(searchTerm)}
      >
        <SearchIcon className="w-8 block lg:hidden ml-2 text-blue-300" />
        <button
          className="bg-blue-400 hover:bg-blue-300 rounded text-white p-2 px-8 ml-5 hidden lg:block"
          disabled={!searchTerm}
        >
          <p className="font-semibold text-lg text-uppercase">Pretraži</p>
        </button>
      </div>
    </div>
  );
};
