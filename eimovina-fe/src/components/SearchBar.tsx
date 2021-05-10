import React, { FC, useState } from "react";

interface SearchBarProps {
  onSearchSubmit: (value: string) => void;
}
export const SearchBar: FC<SearchBarProps> = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <div className="bg-white shadow p-4 flex">
      <input
        className="w-full rounded p-2 dipslay-block"
        type="text"
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setSearchTerm(e.currentTarget.value)
        }
        placeholder="Pretrazi po listu nepokretnosti ili broju parcele"
      />
      <button
        className="bg-blue-400 hover:bg-blue-300 rounded text-white p-2 pl-4 pr-4 ml-3"
        disabled={!searchTerm}
        onClick={() => onSearchSubmit(searchTerm)}
      >
        <p className="font-semibold text-s text-uppercase">Opa</p>
      </button>
    </div>
  );
};
