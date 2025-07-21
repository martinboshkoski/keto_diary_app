import React from 'react';
import { mealTypes } from '../data/recipes';

interface RecipeButtonsProps {
  onRecipeSelect: (mealType: string) => void;
}

export const RecipeButtons: React.FC<RecipeButtonsProps> = ({ onRecipeSelect }) => {
  return (
    <div className="px-4 mb-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {mealTypes.map((mealType) => (
          <button
            key={mealType.key}
            onClick={() => onRecipeSelect(mealType.key)}
            className="flex-shrink-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <span className="text-base">{mealType.icon}</span>
            <span className="whitespace-nowrap">{mealType.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};