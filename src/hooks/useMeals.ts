import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  deleteDoc,
  doc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { MealEntry, DailyTotals } from '../types';

export interface DailyMealRecord {
  id: string;
  userId: string;
  date: string;
  meals: MealEntry[];
  dailyTotals: DailyTotals;
  timestamp: Timestamp;
}

export const useMeals = (userId: string | null) => {
  const [dailyRecords, setDailyRecords] = useState<DailyMealRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setDailyRecords([]);
      setLoading(false);
      return;
    }

    const mealsRef = collection(db, 'meals');
    const q = query(
      mealsRef,
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const records: DailyMealRecord[] = [];
      snapshot.forEach((doc) => {
        records.push({
          id: doc.id,
          ...doc.data()
        } as DailyMealRecord);
      });
      setDailyRecords(records);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  const saveDailyMeals = async (meals: MealEntry[], dailyTotals: DailyTotals) => {
    if (!userId) throw new Error('User not authenticated');

    const today = new Date().toISOString().split('T')[0];
    
    try {
      await addDoc(collection(db, 'meals'), {
        userId,
        date: today,
        meals: meals.map(meal => ({
          ...meal,
          timestamp: Timestamp.fromDate(meal.timestamp)
        })),
        dailyTotals,
        timestamp: Timestamp.now()
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteDailyRecord = async (recordId: string) => {
    try {
      await deleteDoc(doc(db, 'meals', recordId));
    } catch (error) {
      throw error;
    }
  };

  const getWeeklyTotals = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weeklyRecords = dailyRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= oneWeekAgo;
    });

    return weeklyRecords.reduce(
      (totals, record) => ({
        netCarbs: totals.netCarbs + record.dailyTotals.netCarbs,
        fat: totals.fat + record.dailyTotals.fat,
        protein: totals.protein + record.dailyTotals.protein,
        calories: totals.calories + record.dailyTotals.calories,
      }),
      { netCarbs: 0, fat: 0, protein: 0, calories: 0 }
    );
  };

  return {
    dailyRecords,
    loading,
    saveDailyMeals,
    deleteDailyRecord,
    getWeeklyTotals
  };
};