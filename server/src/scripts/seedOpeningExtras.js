import { prisma } from "../prisma.js";
import { EXTRA_OPENINGS } from "../data/openingExtraSeedData.js";
async function upsertExtraOpenings() {
    let openingsTouched = 0;
    let variationsTouched = 0;
    let stepsCreated = 0;
    for (const openingSeed of EXTRA_OPENINGS) {
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
                            explanation: step.explanation ??
                                "Этот ход продолжает дебютную идею выбранного варианта.",
                            arrows: step.arrows ?? [],
                            squares: step.squares ?? [],
                        })),
                    },
                },
            });
            variationsTouched += 1;
            stepsCreated += variationSeed.steps.length;
        }
    }
    console.log(`Обновлено дебютов: ${openingsTouched}`);
    console.log(`Добавлено/обновлено вариантов: ${variationsTouched}`);
    console.log(`Создано теоретических ходов: ${stepsCreated}`);
}
upsertExtraOpenings()
    .catch((error) => {
    console.error("Не удалось добавить расширенную базу дебютов", error);
    process.exitCode = 1;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seedOpeningExtras.js.map