import rss from "@astrojs/rss";
import { SITE } from "../config";
import { getRecipes } from "../lib/recipes";

export async function GET(context) {
  const recipes = await getRecipes();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: recipes.map((recipe) => ({
      title: recipe.data.title,
      description: recipe.data.description,
      pubDate: recipe.data.date,
      link: `/recipes/${recipe.id}/`,
    })),
  });
}
