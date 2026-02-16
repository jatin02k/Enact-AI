import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ExtractionSchema = z.object({
  core_principle: z.string().describe('The primary psychological or philosophical lesson from this text.'),
  tasks: z.array(
    z.object({
      title: z.string().describe('A concise, actionable task name.'),
      description: z.string().describe('Detailed context or steps extracted from the image.'),
      estimated_xp: z.number().describe('XP value based on complexity (e.g., 10-100).'),
      category: z.enum(['Mindset', 'Productivity', 'Health', 'Finance']).describe('Category of the task. Must be one of: Mindset, Productivity, Health, or Finance.'),
    })
  )
});

// Normalize category to match database constraints
export function normalizeCategory(category: string): 'Mindset' | 'Productivity' | 'Health' | 'Finance' {
  const normalized = category.toLowerCase();
  const categoryMap: Record<string, 'Mindset' | 'Productivity' | 'Health' | 'Finance'> = {
    'mindset': 'Mindset',
    'productivity': 'Productivity',
    'health': 'Health',
    'finance': 'Finance',
    'mental': 'Mindset',
    'work': 'Productivity',
    'fitness': 'Health',
    'money': 'Finance',
  };
  return categoryMap[normalized] || 'Mindset'; // Default to Mindset if unknown
}
