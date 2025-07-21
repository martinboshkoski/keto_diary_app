import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Food } from '../types';

interface QuantityModalProps {
  food: Food | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (grams: number) => void;
}

export const QuantityModal: React.FC<QuantityModalProps> = ({
  food,
  isOpen,
  onClose,
  onConfirm
}) => {
  const [grams, setGrams] = useState('');

  useEffect(() => {
    if (isOpen) {
      setGrams('');
    }
  }, [isOpen]);

  if (!isOpen || !food) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gramsNumber = parseFloat(grams);
    if (gramsNumber > 0) {
      onConfirm(gramsNumber);
      onClose();
    }
  };

  const calculateNutrition = (grams: number) => {
    const multiplier = grams / 100;
    return {
      netCarbs: food.netCarbs * multiplier,
      fat: food.fat * multiplier,
      protein: food.protein * multiplier,
      calories: food.calories * multiplier
    };
  };

  const gramsNumber = parseFloat(grams) || 0;
  const preview = calculateNutrition(gramsNumber);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-t-2xl p-6 transform transition-transform duration-300 translate-y-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Внеси количина
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <span className="text-2xl">{food.icon}</span>
          <div>
            <div className="font-medium text-gray-900">{food.name}</div>
            <div className="text-sm text-gray-500">на 100г</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Количина (грамови)
            </label>
            <input
              type="number"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
              placeholder="0"
              min="0"
              step="0.1"
              autoFocus
            />
          </div>

          {gramsNumber > 0 && (
            <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="text-sm font-medium text-emerald-800 mb-2">
                Хранливи вредности за {grams}г:
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Нет јаглехидрати:</span>
                  <span className="font-medium text-orange-600">{preview.netCarbs.toFixed(1)}г</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Масти:</span>
                  <span className="font-medium text-emerald-600">{preview.fat.toFixed(1)}г</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Протеини:</span>
                  <span className="font-medium text-blue-600">{preview.protein.toFixed(1)}г</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Калории:</span>
                  <span className="font-medium text-purple-600">{preview.calories.toFixed(0)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Откажи
            </button>
            <button
              type="submit"
              disabled={!grams || parseFloat(grams) <= 0}
              className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Додај
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};