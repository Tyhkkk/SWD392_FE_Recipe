import { useEffect, useState } from "react";
import { getAllIngredients } from "../../lib/recipeApi/ingredientApi";
import { useDispatch } from "react-redux";
import { updateFilters } from "../../store/filtersSlice";

const IngredientFilter = () => {
  const [groupedIngredients, setGroupedIngredients] = useState({});
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();

  // Fetch and group ingredients
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getAllIngredients();

        // Group ingredients by type
        const grouped = data.reduce((acc, ingredient) => {
          const type = ingredient.type || "Others";
          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push(ingredient);
          return acc;
        }, {});
        setGroupedIngredients(grouped);
      } catch (error) {
        console.error("Failed to fetch ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  // Handle ingredient selection
  const handleIngredientClick = (ingredient) => {
    let updatedSelectedIngredients;

    if (selectedIngredients.some((item) => item.id === ingredient.id)) {
      updatedSelectedIngredients = selectedIngredients.filter(
        (item) => item.id !== ingredient.id
      );
    } else {
      updatedSelectedIngredients = [...selectedIngredients, ingredient];
    }

    setSelectedIngredients(updatedSelectedIngredients);

    dispatch(
      updateFilters({
        ingredients: updatedSelectedIngredients.map((item) => item.id),
      })
    );
  };

  return (
    <div className="bg-gray-100 p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Pantry</h2>
      <p className="text-sm text-gray-600 mb-4">
        You have {selectedIngredients.length} Ingredients selected.
      </p>

      <div className="overflow-y-auto h-auto pr-2">
        {Object.keys(groupedIngredients).map((type) => (
          <div key={type} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{type}</h3>
            <div className="flex flex-wrap gap-2">
              {groupedIngredients[type].map((ingredient) => (
                <button
                  key={ingredient.id}
                  onClick={() => handleIngredientClick(ingredient)}
                  className={`px-3 py-1 rounded-md text-sm font-medium border ${
                    selectedIngredients.some((item) => item.id === ingredient.id)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  } transition`}
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
