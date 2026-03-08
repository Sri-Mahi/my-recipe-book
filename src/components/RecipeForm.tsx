import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onSubmit: (data: { title: string; ingredients: string[]; instructions: string }) => void;
}

export default function RecipeForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");

  const addIngredient = () => {
    const trimmed = ingredient.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients((prev) => [...prev, trimmed]);
      setIngredient("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || ingredients.length === 0 || !instructions.trim()) return;
    onSubmit({ title: title.trim(), ingredients, instructions: instructions.trim() });
    setTitle("");
    setIngredients([]);
    setInstructions("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1.5">Recipe Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Grandmother's Tomato Soup"
          className="font-display text-lg bg-background"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1.5">Ingredients</label>
        <div className="flex gap-2">
          <Input
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="e.g. 2 cups flour"
            className="bg-background"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addIngredient();
              }
            }}
          />
          <Button type="button" size="icon" variant="outline" onClick={addIngredient}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <AnimatePresence>
          {ingredients.length > 0 && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 flex flex-wrap gap-2"
            >
              {ingredients.map((ing, i) => (
                <motion.li
                  key={ing}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                >
                  {ing}
                  <button
                    type="button"
                    onClick={() => setIngredients((prev) => prev.filter((_, j) => j !== i))}
                    className="ml-1 rounded-full p-0.5 hover:bg-muted transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1.5">Instructions</label>
        <Textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Describe the cooking steps..."
          rows={5}
          className="bg-background"
        />
      </div>

      <Button type="submit" className="w-full">Save Recipe</Button>
    </form>
  );
}
