import { useRecipes } from "@/hooks/useRecipes";
import RecipeForm from "@/components/RecipeForm";
import RecipeCard from "@/components/RecipeCard";
import { AnimatePresence } from "framer-motion";
import { CookingPot } from "lucide-react";

const Index = () => {
  const { recipes, addRecipe, deleteRecipe } = useRecipes();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-20">
        <header className="mb-10 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
            <CookingPot className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Recipe Keeper</h1>
          <p className="mt-2 text-muted-foreground">Your personal cookbook, always at hand.</p>
        </header>

        <section className="rounded-2xl border bg-card p-6 shadow-sm mb-10">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">Add a Recipe</h2>
          <RecipeForm onSubmit={addRecipe} />
        </section>

        {recipes.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Your Recipes <span className="text-muted-foreground font-normal">({recipes.length})</span>
            </h2>
            <div className="space-y-4">
              <AnimatePresence>
                {recipes.map((r) => (
                  <RecipeCard key={r.id} recipe={r} onDelete={deleteRecipe} />
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}

        {recipes.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No recipes yet — add your first one above!</p>
        )}
      </div>
    </div>
  );
};

export default Index;
