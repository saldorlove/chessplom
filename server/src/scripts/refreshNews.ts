import { prisma } from "../prisma.js";
import { fetchChampionatNews } from "../services/championatNews.js";
import { saveNewsArticles } from "../services/newsStorage.js";

async function main() {
  const articles = await fetchChampionatNews();
  const savedCount = await saveNewsArticles(articles);

  console.log(`Загружено новостей: ${savedCount}`);
}

main()
  .catch((error) => {
    console.error("Не удалось загрузить новости в БД", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
