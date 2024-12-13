import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../../store/filtersSlice";

const TitleSearchInput = () => {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.filters.title); // Get current title from Redux
  const [localTitle, setLocalTitle] = useState(title);

  const handleSearch = (e) => {
    const value = e.target.value;
    setLocalTitle(value);

    // Dispatch the new title to Redux
    dispatch(updateFilters({ title: value.trim() }));
  };

  return (
    <input
      type="text"
      placeholder="Find recipe..."
      value={localTitle}
      onChange={handleSearch}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
    />
  );
};

export default TitleSearchInput;
