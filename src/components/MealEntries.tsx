import React from 'react';
import { Trash2 } from 'lucide-react';
import { MealEntry } from '../types';

interface MealEntriesProps {
  entries: MealEntry[];
  onDeleteEntry: (id: string) => void;
}

export const MealEntries: React.FC<MealEntriesProps> = ({ entries, onDeleteEntry }) => {
  if (entries.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-gray-500">
        <div className="text-4xl mb-2">🍽️</div>
        <p>Сеуште нема додадени оброци</p>
        <p className="text-sm">Одбери храна од категориите погоре</p>
      </div>
    );
  }

  return (
    <div className="px-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Денешни оброци
      </h3>
      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-lg p-3 shadow-sm border border-gray-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xl">{entry.food.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {entry.food.name}
                  </div>
                  <div className="text-xs text-gray-500 mb-1">
                    {entry.grams}г
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className="text-orange-600">
                      {entry.calculatedNutrition.netCarbs.toFixed(1)}г јаглехидрати
                    </div>
                    <div className="text-emerald-600">
                      {entry.calculatedNutrition.fat.toFixed(1)}г масти
                    </div>
                    <div className="text-blue-600">
                      {entry.calculatedNutrition.protein.toFixed(1)}г протеини
                    </div>
                    <div className="text-purple-600">
                      {entry.calculatedNutrition.calories.toFixed(0)} кал
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onDeleteEntry(entry.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};