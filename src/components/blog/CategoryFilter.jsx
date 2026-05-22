import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  "all",
  "personal finance",
  "investing",
  "budgeting",
  "credit",
  "retirement",
  "taxes",
  "real estate",
  "insurance",
  "debt management",
  "financial planning"
];

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <Button
          key={cat}
          variant="ghost"
          size="sm"
          onClick={() => onChange(cat)}
          className={cn(
            "rounded-full text-xs capitalize transition-all",
            active === cat
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}