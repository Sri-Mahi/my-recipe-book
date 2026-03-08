import { Recipe } from "@/types/recipe";
import { Trash2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  recipe: Recipe;
  onDelete: (id: string) => void;
}

export default function RecipeCard({ recipe, onDelete }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="rounded-xl border bg-card p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <button
          onClick={() => setOpen(!open)}
          className="flex-1 text-left flex items-center gap-2"
        >
          <h3 className="font-display text-xl font-semibold text-card-foreground">{recipe.title}</h3>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
        <button
          onClick={() => onDelete(recipe.id)}
          className="rounded-lg p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        {recipe.ingredients.length} ingredient{recipe.ingredients.length !== 1 ? "s" : ""}
      </p>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-accent-foreground bg-accent inline-block px-2 py-0.5 rounded-md mb-2">Ingredients</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-card-foreground">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-accent-foreground bg-accent inline-block px-2 py-0.5 rounded-md mb-2">Instructions</h4>
                <p className="text-sm text-card-foreground whitespace-pre-wrap leading-relaxed">{recipe.instructions}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
