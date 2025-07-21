import React, { useState, useMemo } from 'react';
import { Save, User } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useMeals } from './hooks/useMeals';
import { AuthModal } from './components/AuthModal';
import { HistoryModal } from './components/HistoryModal';
import { Header } from './components/Header';
import { RecipeButtons } from './components/RecipeButtons';
import { RecipeModal } from './components/RecipeModal';
import { CategorySection } from './components/CategorySection';
import { QuantityModal } from './components/QuantityModal';
import { MealEntries } from './components/MealEntries';
import { SaveModal } from './components/SaveModal';
import { foodData, categories } from './data';
import { ketoRecipes } from './data/recipes';
import { Food, MealEntry, DailyTotals, Recipe } from './types';

function App() {
  const { user, loading: authLoading, login, register, logout } = useAuth();
  const { dailyRecords, loading: mealsLoading, saveDailyMeals, deleteDailyRecord, getWeeklyTotals } = useMeals(user?.uid || null);
  
  const [mealEntries, setMealEntries] = useState<MealEntry[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

  const dailyTotals: DailyTotals = useMemo(() => {
    return mealEntries.reduce(
      (totals, entry) => ({
        netCarbs: totals.netCarbs + entry.calculatedNutrition.netCarbs,
        fat: totals.fat + entry.calculatedNutrition.fat,
        protein: totals.protein + entry.calculatedNutrition.protein,
        calories: totals.calories + entry.calculatedNutrition.calories,
      }),
      { netCarbs: 0, fat: 0, protein: 0, calories: 0 }
    );
  }, [mealEntries]);

  const weeklyTotals = useMemo(() => {
    if (!user) return undefined;
    return getWeeklyTotals();
  }, [user, getWeeklyTotals]);

  const handleSaveMeals = async () => {
    if (!user || mealEntries.length === 0) return;
    
    setSaveLoading(true);
    try {
      await saveDailyMeals(mealEntries, dailyTotals);
      setMealEntries([]); // Clear current entries after saving
    } catch (error) {
      console.error('Error saving meals:', error);
      throw error;
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteRecord = async (recordId: string) => {
    try {
      await deleteDailyRecord(recordId);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const calculateRecipeNutrition = (recipe: Recipe): Recipe => {
    let totalNutrition = { netCarbs: 0, fat: 0, protein: 0, calories: 0 };
    
    recipe.ingredients.forEach(ingredient => {
      const food = foodData.find(f => f.id === ingredient.foodId);
      if (food) {
        const multiplier = ingredient.grams / 100;
        totalNutrition.netCarbs += food.netCarbs * multiplier;
        totalNutrition.fat += food.fat * multiplier;
        totalNutrition.protein += food.protein * multiplier;
        totalNutrition.calories += food.calories * multiplier;
      }
    });

    return { ...recipe, totalNutrition };
  };

  const handleRecipeSelect = (mealType: string) => {
    let availableRecipes = ketoRecipes;
    
    if (mealType !== 'random') {
      availableRecipes = ketoRecipes.filter(recipe => recipe.type === mealType);
    }
    
    if (availableRecipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableRecipes.length);
      const selectedRecipe = availableRecipes[randomIndex];
      const recipeWithNutrition = calculateRecipeNutrition(selectedRecipe);
      
      setSelectedRecipe(recipeWithNutrition);
      setIsRecipeModalOpen(true);
    }
  };

  const handleAddRecipeToMeal = () => {
    if (!selectedRecipe) return;

    selectedRecipe.ingredients.forEach(ingredient => {
      const food = foodData.find(f => f.id === ingredient.foodId);
      if (food) {
        const multiplier = ingredient.grams / 100;
        const calculatedNutrition = {
          netCarbs: food.netCarbs * multiplier,
          fat: food.fat * multiplier,
          protein: food.protein * multiplier,
          calories: food.calories * multiplier,
        };

        const newEntry: MealEntry = {
          id: `${Date.now()}-${ingredient.foodId}`,
          food,
          grams: ingredient.grams,
          calculatedNutrition,
          timestamp: new Date(),
        };

        setMealEntries(prev => [...prev, newEntry]);
      }
    });
  };

  const handleFoodSelect = (food: Food) => {
    setSelectedFood(food);
    setIsQuantityModalOpen(true);
  };

  const handleQuantityConfirm = (grams: number) => {
    if (!selectedFood) return;

    const multiplier = grams / 100;
    const calculatedNutrition = {
      netCarbs: selectedFood.netCarbs * multiplier,
      fat: selectedFood.fat * multiplier,
      protein: selectedFood.protein * multiplier,
      calories: selectedFood.calories * multiplier,
    };

    const newEntry: MealEntry = {
      id: Date.now().toString(),
      food: selectedFood,
      grams,
      calculatedNutrition,
      timestamp: new Date(),
    };

    setMealEntries(prev => [...prev, newEntry]);
    setSelectedFood(null);
  };

  const handleDeleteEntry = (id: string) => {
    setMealEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const getFoodsByCategory = (category: string) => {
    return foodData.filter(food => food.category === category);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🥑</div>
          <p className="text-gray-600">Се вчитува...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
          <div className="text-6xl mb-4">🥑</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Кето Дневник
          </h1>
          <p className="text-gray-600 mb-6">
            Следете ги вашите КЕТО оброци и калории
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <User size={20} />
            Најави се / Регистрирај се
          </button>
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={login}
          onRegister={register}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        dailyTotals={dailyTotals}
        weeklyTotals={weeklyTotals}
        userEmail={user.email || undefined}
        onLogout={logout}
        onShowHistory={() => setIsHistoryModalOpen(true)}
      />
      
      <RecipeButtons onRecipeSelect={handleRecipeSelect} />
      
      <main className="pb-24">
        {categories.map(category => (
          <CategorySection
            key={category}
            category={category}
            foods={getFoodsByCategory(category)}
            onFoodSelect={handleFoodSelect}
          />
        ))}

        <MealEntries 
          entries={mealEntries}
          onDeleteEntry={handleDeleteEntry}
        />
      </main>

      {mealEntries.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Зачувај во Firebase
          </button>
        </div>
      )}

      <QuantityModal
        food={selectedFood}
        isOpen={isQuantityModalOpen}
        onClose={() => {
          setIsQuantityModalOpen(false);
          setSelectedFood(null);
        }}
        onConfirm={handleQuantityConfirm}
      />

      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isRecipeModalOpen}
        onClose={() => {
          setIsRecipeModalOpen(false);
          setSelectedRecipe(null);
        }}
        onAddToMeal={handleAddRecipeToMeal}
        foodData={foodData}
      />

      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveMeals}
        entries={mealEntries}
        dailyTotals={dailyTotals}
        loading={saveLoading}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        records={dailyRecords}
        onDeleteRecord={handleDeleteRecord}
        loading={mealsLoading}
      />
    </div>
  );
}

export default App;