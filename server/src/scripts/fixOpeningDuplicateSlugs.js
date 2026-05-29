import { prisma } from "../prisma.js";
import { OPENING_QUALITY_SEEDS_V2 } from "../data/openingQualitySeedDataV2.js";
const DUPLICATE_SLUG_FIXES = [
    {
        duplicateSlug: "spanish-game",
        targetSlug: "ruy-lopez",
        targetTitle: "Испанская партия",
    },
    {
        duplicateSlug: "slav-defense",
        targetSlug: "slavic-defense",
        targetTitle: "Славянская защита",
    },
];
async function applyDuplicateSlugFixes() {
    let targetOpeningsUpdated = 0;
    let variationsMoved = 0;
    let duplicateOpeningsDeleted = 0;
    for (const fix of DUPLICATE_SLUG_FIXES) {
        const duplicateSeed = OPENING_QUALITY_SEEDS_V2.find((opening) => opening.slug === fix.duplicateSlug);
        if (!duplicateSeed) {
            console.warn(`Seed для ${fix.duplicateSlug} не найден, пропускаем`);
            continue;
        }
        const targetOpening = await prisma.opening.upsert({
            where: {
                slug: fix.targetSlug,
            },
            update: {
                eco: duplicateSeed.eco,
                title: fix.targetTitle,
                side: duplicateSeed.side,
                against: duplicateSeed.against,
                summary: duplicateSeed.summary,
            },
            create: {
                slug: fix.targetSlug,
                eco: duplicateSeed.eco,
                title: fix.targetTitle,
                side: duplicateSeed.side,
                against: duplicateSeed.against,
                summary: duplicateSeed.summary,
            },
        });
        targetOpeningsUpdated += 1;
        for (const variationSeed of duplicateSeed.variations) {
            await prisma.openingVariation.deleteMany({
                where: {
                    openingId: targetOpening.id,
                    key: variationSeed.key,
                },
            });
            await prisma.openingVariation.create({
                data: {
                    openingId: targetOpening.id,
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
            variationsMoved += 1;
        }
        const deleteResult = await prisma.opening.deleteMany({
            where: {
                slug: fix.duplicateSlug,
            },
        });
        duplicateOpeningsDeleted += deleteResult.count;
    }
    console.log(`Обновлено целевых дебютов: ${targetOpeningsUpdated}`);
    console.log(`Перенесено/пересоздано вариантов: ${variationsMoved}`);
    console.log(`Удалено дублей дебютов: ${duplicateOpeningsDeleted}`);
}
applyDuplicateSlugFixes()
    .catch((error) => {
    console.error("Не удалось исправить дубли slug дебютов", error);
    process.exitCode = 1;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=fixOpeningDuplicateSlugs.js.map