import { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Call the onSearch callback if provided
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative`}>
      <div
        className={`
        relative flex items-center w-full
        bg-white border rounded-lg shadow-sm transition-all duration-200
        ${
          isFocused
            ? "border-orange-300 ring-2 ring-orange-100 shadow-md"
            : "border-gray-300 hover:border-gray-400"
        }
      `}
      >
        {/* Search Icon */}
        <div className="absolute left-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            w-full pl-10 pr-10 py-3 text-sm text-gray-900 placeholder-gray-500
            bg-transparent border-none rounded-lg focus:outline-none
          "
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="
              absolute right-3 flex items-center justify-center
              w-5 h-5 text-gray-400 hover:text-gray-600
              transition-colors duration-200
            "
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
