import React from 'react';
import { X, Plus } from 'lucide-react';
import { Recipe, Food } from '../types';

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToMeal: () => void;
  foodData: Food[];
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  isOpen,
  onClose,
  onAddToMeal,
  foodData
}) => {
  if (!isOpen || !recipe) return null;

  const getFoodById = (id: string) => foodData.find(food => food.id === id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">👨‍🍳</span>
            {recipe.name}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200 mb-4">
            <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
              📊 Хранливи вредности (за {recipe.servings} порција):
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Нет јаглехидрати:</span>
                <span className="font-medium text-orange-600">{recipe.totalNutrition.netCarbs.toFixed(1)}г</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Масти:</span>
                <span className="font-medium text-emerald-600">{recipe.totalNutrition.fat.toFixed(1)}г</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Протеини:</span>
                <span className="font-medium text-blue-600">{recipe.totalNutrition.protein.toFixed(1)}г</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Калории:</span>
                <span className="font-medium text-purple-600">{recipe.totalNutrition.calories.toFixed(0)}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              🥘 Состојки:
            </h4>
            <div className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => {
                const food = getFoodById(ingredient.foodId);
                return (
                  <div key={index} className="flex items-center gap-2 text-sm bg-gray-50 rounded-lg p-2">
                    <span className="text-lg">{food?.icon}</span>
                    <span className="flex-1">{food?.name}</span>
                    <span className="font-medium text-gray-600">{ingredient.grams}г</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              📝 Инструкции:
            </h4>
            <ol className="space-y-2">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-2 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Затвори
          </button>
          <button
            onClick={() => {
              onAddToMeal();
              onClose();
            }}
            className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Додај во оброк
          </button>
        </div>
      </div>
    </div>
  );
};