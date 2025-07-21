import React from 'react';
import { X, Trash2, Calendar } from 'lucide-react';
import { DailyMealRecord } from '../hooks/useMeals';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: DailyMealRecord[];
  onDeleteRecord: (recordId: string) => void;
  loading: boolean;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  records,
  onDeleteRecord,
  loading
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('mk-MK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="text-emerald-600" size={24} />
            Историја на оброци
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-500">Се вчитува...</div>
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-500">Сеуште нема зачувани оброци</p>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map((record) => (
              <div key={record.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {formatDate(record.date)}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {record.meals.length} оброци
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteRecord(record.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Избриши"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Нет јаглехидрати:</span>
                    <span className="font-medium text-orange-600">
                      {record.dailyTotals.netCarbs.toFixed(1)}г
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Масти:</span>
                    <span className="font-medium text-emerald-600">
                      {record.dailyTotals.fat.toFixed(1)}г
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Протеини:</span>
                    <span className="font-medium text-blue-600">
                      {record.dailyTotals.protein.toFixed(1)}г
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Калории:</span>
                    <span className="font-medium text-purple-600">
                      {record.dailyTotals.calories.toFixed(0)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-2">
                  <h5 className="text-xs font-medium text-gray-700 mb-1">Оброци:</h5>
                  <div className="flex flex-wrap gap-1">
                    {record.meals.map((meal, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded text-xs text-gray-600"
                      >
                        <span>{meal.food.icon}</span>
                        <span>{meal.food.name}</span>
                        <span className="text-gray-400">({meal.grams}г)</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Затвори
          </button>
        </div>
      </div>
    </div>
  );
};