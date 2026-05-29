import { prisma } from "../prisma.js";
import {
  OPENING_QUALITY_SEEDS,
  OPENING_VARIATIONS_TO_REMOVE,
} from "../data/openingQualitySeedData.js";

async function seedOpeningQuality() {
  let removedVariations = 0;
  let openingsTouched = 0;
  let variationsRecreated = 0;
  let stepsCreated = 0;

  for (const removal of OPENING_VARIATIONS_TO_REMOVE) {
    const opening = await prisma.opening.findUnique({
      where: { slug: removal.openingSlug },
      select: { id: true },
    });

    if (!opening) continue;

    const result = await prisma.openingVariation.deleteMany({
      where: {
        openingId: opening.id,
        key: removal.variationKey,
      },
    });

    removedVariations += result.count;
  }

  for (const openingSeed of OPENING_QUALITY_SEEDS) {
    const opening = await prisma.opening.upsert({
      where: { slug: openingSeed.slug },
      update: {
        eco: openingSeed.eco,
        title: openingSeed.title,
        side: openingSeed.side,
        against: openingSeed.against,
        summary: openingSeed.summary,
      },
      create: {
        slug: openingSeed.slug,
        eco: openingSeed.eco,
        title: openingSeed.title,
        side: openingSeed.side,
        against: openingSeed.against,
        summary: openingSeed.summary,
      },
    });

    openingsTouched += 1;

    for (const variationSeed of openingSeed.variations) {
      await prisma.openingVariation.deleteMany({
        where: {
          openingId: opening.id,
          key: variationSeed.key,
        },
      });

      await prisma.openingVariation.create({
        data: {
          openingId: opening.id,
          key: variationSeed.key,
          title: variationSeed.title,
          subtitle: variationSeed.subtitle,
          orderIndex: variationSeed.orderIndex,
          steps: {
            create: variationSeed.steps.map((step, index) => ({
              moveIndex: index,
              san: step.san,
              explanation: step.explanation,
              arrows: step.arrows ?? [],
              squares: step.squares ?? [],
            })),
          },
        },
      });

      variationsRecreated += 1;
      stepsCreated += variationSeed.steps.length;
    }
  }

  console.log(`Удалено дублей вариантов: ${removedVariations}`);
  console.log(`Обновлено дебютов: ${openingsTouched}`);
  console.log(`Пересоздано качественных вариантов: ${variationsRecreated}`);
  console.log(`Создано теоретических ходов: ${stepsCreated}`);
}

seedOpeningQuality()
  .catch((error) => {
    console.error("Не удалось улучшить базу дебютов", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
