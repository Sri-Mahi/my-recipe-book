import { useState, useEffect } from "react";
import { Recipe } from "@/types/recipe";

const STORAGE_KEY = "recipes";

function loadRecipes(): Recipe[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(loadRecipes);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (data: Omit<Recipe, "id" | "createdAt">) => {
    const recipe: Recipe = { ...data, id: crypto.randomUUID(), createdAt: Date.now() };
    setRecipes((prev) => [recipe, ...prev]);
  };

  const deleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return { recipes, addRecipe, deleteRecipe };
}
