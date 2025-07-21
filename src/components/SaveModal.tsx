import React from 'react';
import { X, Check, Cloud } from 'lucide-react';
import { MealEntry, DailyTotals } from '../types';

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => Promise<void>;
  entries: MealEntry[];
  dailyTotals: DailyTotals;
  loading?: boolean;
}

export const SaveModal: React.FC<SaveModalProps> = ({
  isOpen,
  onClose,
  onSave,
  entries,
  dailyTotals,
  loading = false
}) => {
  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      await onSave();
      onClose();
    } catch (error) {
      console.error('Error saving meals:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Зачувај во Firebase
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
            <h4 className="font-medium text-emerald-800 mb-2">Вкупно за денес:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Нет јаглехидрати:</span>
                <span className="font-medium text-orange-600">{dailyTotals.netCarbs.toFixed(1)}г</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Масти:</span>
                <span className="font-medium text-emerald-600">{dailyTotals.fat.toFixed(1)}г</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Протеини:</span>
                <span className="font-medium text-blue-600">{dailyTotals.protein.toFixed(1)}г</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Калории:</span>
                <span className="font-medium text-purple-600">{dailyTotals.calories.toFixed(0)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <Cloud size={16} />
              Ќе се зачува во Firebase:
            </h4>
            <div className="text-sm text-blue-700">
              <p>• {entries.length} оброци за денес</p>
              <p>• Вкупно хранливи вредности</p>
              <p>• Датум и време на внесување</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Откажи
          </button>
          <button
            onClick={() => {
              handleSave();
            }}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Check size={16} />
            {loading ? 'Се зачувува...' : 'Зачувај'}
          </button>
        </div>
      </div>
    </div>
  );
};