import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { Category } from '../constants/categories';

const STORAGE_KEY = '@poll_selected_categories';

export const [CategoryProvider, useCategories] = createContextHook(() => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const saveCategories = useCallback(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCategories));
    } catch (error) {
      console.error('Failed to save categories:', error);
    }
  }, [selectedCategories]);

  useEffect(() => {
    if (isLoaded) {
      saveCategories();
    }
  }, [selectedCategories, isLoaded, saveCategories]);

  const loadCategories = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSelectedCategories(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  };

  const setCategories = (categories: Category[]) => {
    setSelectedCategories(categories);
  };

  return {
    selectedCategories,
    toggleCategory,
    setCategories,
    isLoaded,
  };
});
