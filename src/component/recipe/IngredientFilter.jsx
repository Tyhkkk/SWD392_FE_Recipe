import  { useEffect, useState } from "react";
import { getAllIngredients } from "../../lib/recipeApi/ingredientApi";

const IngredientFilter = () => {
  const [ingredients, setIngredients] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch toàn bộ dữ liệu từ API
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const allIngredients = await getAllIngredients();
        setIngredients(allIngredients);
      } catch (error) {
        console.error("Failed to fetch ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  // Lọc theo từ khóa
  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(search.toLowerCase())
  );

  // Nhóm theo `type`
  const groupedIngredients = filteredIngredients.reduce((groups, ingredient) => {
    const { type } = ingredient;
    if (!groups[type]) groups[type] = [];
    groups[type].push(ingredient);
    return groups;
  }, {});

  return (
    <div className="bg-[#e5e4c8] p-4 h-full">
      <h2 className="text-2xl font-bold text-black mb-2">Pantry</h2>
      <p className="text-sm text-gray-700 mb-4">
        You have 0 Ingredients, <a href="#" className="text-blue-500">View here</a>
      </p>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Find ingredients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none"
        />
        <svg
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="20"
          height="20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 18l6-6m0 0l-6-6m6 6H4"
          />
        </svg>
      </div>

      <h3 className="text-lg font-bold text-black mb-2">Choose Your Ingredients:</h3>
      
      <div className="overflow-y-auto h-auto pr-2">
        {Object.keys(groupedIngredients).map((type) => (
          <div key={type} className="mb-6">
            <h3 className="text-md font-semibold text-black mb-2">{type}</h3>
            <div className="flex flex-wrap gap-2">
              {groupedIngredients[type].map((ingredient) => (
                <button
                  key={ingredient.id}
                  className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition text-sm"
                >
                  {ingredient.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientFilter;
