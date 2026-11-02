import { getCollection, type CollectionEntry } from "astro:content";

export type Recipe = CollectionEntry<"recipes">;

export async function getRecipes(): Promise<Recipe[]> {
  const all = await getCollection(
    "recipes",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function tagSlug(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getTags(recipes: Recipe[]) {
  const tags = new Map<string, { name: string; slug: string; count: number }>();
  for (const recipe of recipes) {
    for (const name of recipe.data.tags) {
      const slug = tagSlug(name);
      const existing = tags.get(slug);
      if (existing) existing.count += 1;
      else tags.set(slug, { name, slug, count: 1 });
    }
  }
  return [...tags.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

export function totalMinutes(recipe: Recipe): number | undefined {
  const { prepTime, cookTime } = recipe.data;
  if (prepTime === undefined && cookTime === undefined) return undefined;
  return (prepTime ?? 0) + (cookTime ?? 0);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
