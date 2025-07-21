import React from 'react';
import { Food } from '../types';

interface CategorySectionProps {
  category: string;
  foods: Food[];
  onFoodSelect: (food: Food) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ 
  category, 
  foods, 
  onFoodSelect 
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 px-4">
        {category}
      </h3>
      <div className="grid grid-cols-4 gap-1 px-4">
        {foods.map((food) => (
          <button
            key={food.id}
            onClick={() => onFoodSelect(food)}
            className="bg-white rounded-md p-1.5 shadow-sm border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 active:scale-95"
          >
            <div className="text-lg mb-0.5">{food.icon}</div>
            <div className="text-xs font-medium text-gray-800 leading-tight mb-0.5">
              {food.name}
            </div>
            <div className="text-xs text-gray-500">
              {food.netCarbs}г јаглехидрати
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};