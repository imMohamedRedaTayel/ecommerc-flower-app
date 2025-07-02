import Headline from "@/components/common/(dashboard)/headline"
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useFormatter, useTranslations } from "next-intl"


export default function CategoriesList({ statistics }: Statistics) {
    const categories = statistics?.categories;

    // Translations
    const t = useTranslations()
    const format = useFormatter();

    // Empty state handling
    if (!categories || categories.length === 0) {
        return (
            <div className="text-pink-900 text-3xl capitalize text-center flex items-center justify-center h-full">
                {t('no-category')}
            </div>
        );
    }

    return (
        <Card className="p-6 border-none h-full">
            {/* Card header */}
            <Headline>{t('all-categories')}</Headline>

            {/* Scrollable list container */}
            <ScrollArea className="h-60 pr-4">
                {categories.map((category) => (
                    <div key={category._id} className="flex flex-col gap-3 mt-2">
                        {/* Category row */}
                        <div className="flex justify-between items-center">
                            <span>{category.name}</span>
                            {/* Product count badge */}
                            <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-sm font-medium text-gray-600">{format.number(category.totalProducts)} {t('products')}</span>
                        </div>
                        <hr />
                    </div>
                ))}
            </ScrollArea>
        </Card>
    )
}
