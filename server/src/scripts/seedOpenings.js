import { prisma } from "../prisma.js";
import { OPENINGS, getVariationSteps } from "../data/openingsSeedData.js";
async function seedOpenings() {
    for (const opening of OPENINGS) {
        const dbOpening = await prisma.opening.upsert({
            where: {
                slug: opening.slug,
            },
            create: {
                slug: opening.slug,
                eco: opening.eco,
                title: opening.title,
                side: opening.side,
                against: opening.against,
                summary: opening.summary,
            },
            update: {
                eco: opening.eco,
                title: opening.title,
                side: opening.side,
                against: opening.against,
                summary: opening.summary,
            },
        });
        const activeVariationKeys = [];
        for (const [variationIndex, variation] of opening.variations.entries()) {
            activeVariationKeys.push(variation.id);
            const dbVariation = await prisma.openingVariation.upsert({
                where: {
                    openingId_key: {
                        openingId: dbOpening.id,
                        key: variation.id,
                    },
                },
                create: {
                    openingId: dbOpening.id,
                    key: variation.id,
                    title: variation.title,
                    subtitle: variation.subtitle,
                    orderIndex: variationIndex,
                },
                update: {
                    title: variation.title,
                    subtitle: variation.subtitle,
                    orderIndex: variationIndex,
                },
            });
            const steps = getVariationSteps(variation);
            await prisma.openingStep.deleteMany({
                where: {
                    variationId: dbVariation.id,
                },
            });
            if (steps.length > 0) {
                await prisma.openingStep.createMany({
                    data: steps.map((step, moveIndex) => ({
                        variationId: dbVariation.id,
                        moveIndex,
                        san: step.san,
                        explanation: step.explanation,
                        arrows: step.arrows,
                        squares: step.squares,
                    })),
                });
            }
        }
        await prisma.openingVariation.deleteMany({
            where: {
                openingId: dbOpening.id,
                key: {
                    notIn: activeVariationKeys,
                },
            },
        });
    }
}
seedOpenings()
    .then(async () => {
    console.log(`Загружено дебютов: ${OPENINGS.length}`);
    await prisma.$disconnect();
})
    .catch(async (error) => {
    console.error("Не удалось загрузить дебюты в БД", error);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seedOpenings.js.map