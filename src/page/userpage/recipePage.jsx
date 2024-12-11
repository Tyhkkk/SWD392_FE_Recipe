// import React from "react";
import IngredientFilter from "../../component/recipe/IngredientFilter";
import RecipeDisplay from "../../component/recipe/RecipeDisplay";

const RecipePage = () => {
  return (
    <div className="flex flex-row w-full min-h-screen bg-[#fdf5e6]">
      {/* Thành phần bên trái */}
      <div className="w-3/12 p-4 border-r border-gray-300">
        <IngredientFilter />
      </div>

      {/* Thành phần bên phải */}
      <div className="w-9/12 p-6">
        <RecipeDisplay />
      </div>
    </div>
  );
};

export default RecipePage;
