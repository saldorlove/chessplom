import { prisma } from "../prisma.js";
import { OPENING_QUALITY_SEEDS_V2 } from "../data/openingQualitySeedDataV2.js";

async function seedOpeningQualityV2() {
  let openingsTouched = 0;
  let variationsRecreated = 0;
  let stepsCreated = 0;

  for (const openingSeed of OPENING_QUALITY_SEEDS_V2) {
    const opening = await prisma.opening.upsert({
      where: {
        slug: openingSeed.slug,
      },
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

  console.log(`Обновлено дебютов: ${openingsTouched}`);
  console.log(`Пересоздано качественных вариантов: ${variationsRecreated}`);
  console.log(`Создано теоретических ходов: ${stepsCreated}`);
}

seedOpeningQualityV2()
  .catch((error) => {
    console.error("Не удалось применить v2 улучшения базы дебютов", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
