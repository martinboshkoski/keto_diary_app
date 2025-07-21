import React from 'react';
import { LogOut, Calendar, TrendingUp } from 'lucide-react';
import { DailyTotals } from '../types';

interface HeaderProps {
  dailyTotals: DailyTotals;
  weeklyTotals?: DailyTotals;
  userEmail?: string;
  onLogout?: () => void;
  onShowHistory?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  dailyTotals, 
  weeklyTotals,
  userEmail,
  onLogout,
  onShowHistory
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-900">
          Кето Следач
        </h1>
        <div className="flex items-center gap-2">
          {userEmail && (
            <>
              <button
                onClick={onShowHistory}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Историја"
              >
                <Calendar size={20} />
              </button>
              <button
                onClick={onLogout}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Одјави се"
              >
                <LogOut size={20} />
              </button>
            </>
          )}
        </div>
      </div>

      {userEmail && (
        <div className="text-xs text-gray-500 mb-3">
          Најавен како: {userEmail}
        </div>
      )}
      
      <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
        <h2 className="text-sm font-semibold text-emerald-800 mb-2">
          Денешен внес:
        </h2>
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

      {weeklyTotals && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mt-3">
          <h2 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-1">
            <TrendingUp size={14} />
            Неделен внес:
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Нет јаглехидрати:</span>
              <span className="font-medium text-orange-600">{weeklyTotals.netCarbs.toFixed(1)}г</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Масти:</span>
              <span className="font-medium text-emerald-600">{weeklyTotals.fat.toFixed(1)}г</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Протеини:</span>
              <span className="font-medium text-blue-600">{weeklyTotals.protein.toFixed(1)}г</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Калории:</span>
              <span className="font-medium text-purple-600">{weeklyTotals.calories.toFixed(0)}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};