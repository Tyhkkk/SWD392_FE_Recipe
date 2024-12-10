// import React from "react";
import { Link } from "react-router-dom";

// Import hình ảnh trực tiếp
import BreakfastImg from "../../../src/assets/categorySection/Breakfast.jpg";
import LunchImg from "../../../src/assets/categorySection/Lunch.jpg";
import DessertImg from "../../../src/assets/categorySection/Dessert.jpeg";
import DinnerImg from "../../../src/assets/categorySection/Dinner.jpg";
import BeverageImg from "../../../src/assets/categorySection/Beverage.jpg";
import AppetizerImg from "../../../src/assets/categorySection/Appetizer.jpg";

// Danh mục với đường dẫn hình ảnh tương ứng
const categories = [
  { name: "Breakfast", image: BreakfastImg },
  { name: "Lunch", image: LunchImg },
  { name: "Dessert", image: DessertImg },
  { name: "Dinner", image: DinnerImg },
  { name: "Beverage", image: BeverageImg },
  { name: "Appetizer", image: AppetizerImg },
];

const CategorySection = () => {
  return (
    <div className="bg-orange-200 py-16">
      <h2 className="text-center text-5xl font-bold text-white mb-12">
        Explore By <span className="italic">Category</span>
      </h2>
      <div className="flex justify-center items-center flex-wrap gap-12 px-6">
        {categories.map((category, index) => (
          <Link
            to={`/categories/${category.name.toLowerCase()}`}
            key={index}
            className="relative w-56 h-64 transform rotate-3 hover:rotate-0 transition-transform duration-300 ease-in-out"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg text-black font-semibold text-lg shadow-md">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
