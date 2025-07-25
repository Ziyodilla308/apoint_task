import { useState, Fragment } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type {TreeItem} from "../types/table.ts";

const keys = [
    "remind_end_amount",
    "remind_end_sum",
    "remind_income_amount",
    "remind_income_sum",
    "remind_outgo_amount",
    "remind_outgo_sum",
    "remind_start_amount",
    "remind_start_sum",
] as const;

type Key = typeof keys[number];

type CategoryGroup = Record<string, TreeItem[]>;
type GroupedData = Record<string, CategoryGroup>;

interface TreeTableProps {
    groupedData: GroupedData;
}

function calculateTotals(data: TreeItem[]): Record<Key, number> {
    const totals = {} as Record<Key, number>;
    keys.forEach((k) => (totals[k] = 0));
    for (const item of data) {
        keys.forEach((k) => {
            const val = Number(item[k]);
            totals[k] += isNaN(val) ? 0 : val;
        });
    }
    return totals;
}

function formatNumber(val: number) {
    return val.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function TreeTable({ groupedData }: TreeTableProps) {
    const [openParents, setOpenParents] = useState<Record<string, boolean>>({});
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    const toggleParent = (key: string) => {
        setOpenParents((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleCategory = (key: string) => {
        setOpenCategories((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const allItems: TreeItem[] = Object.values(groupedData).flatMap((catGroup) =>
        Object.values(catGroup).flat()
    );

    const grandTotal = calculateTotals(allItems);

    return (
        <div className="overflow-x-auto p-6">
            <div className="border border-gray-200 rounded-xl shadow-sm bg-white">
                <table className="min-w-full text-sm text-gray-800">
                    <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                    <tr>
                        <th className="px-6 py-3 text-left font-semibold tracking-wide">Name</th>
                        {keys.map((k) => (
                            <th key={k} className="px-4 py-3 text-right capitalize">
                                {k.replace(/_/g, " ")}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-gray-50 font-bold text-gray-900 border-t border-gray-200">
                        <td className="pl-6 py-3">Grand Total</td>
                        {keys.map((k) => (
                            <td key={`grand-${k}`} className="text-right px-4 py-3">
                                {formatNumber(grandTotal[k])}
                            </td>
                        ))}
                    </tr>

                    {Object.entries(groupedData).map(([parent, categories]) => {
                        const parentItems = Object.values(categories).flat();
                        const parentTotals = calculateTotals(parentItems);
                        const isParentOpen = openParents[parent];

                        return (
                            <Fragment key={`parent-${parent}`}>
                                <tr
                                    className="bg-gray-100 border-t border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer"
                                    onClick={() => toggleParent(parent)}
                                >
                                    <td className="pl-6 py-3 flex items-center gap-2 font-semibold text-gray-800">
                                        {isParentOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                        {parent}
                                    </td>
                                    {keys.map((k) => (
                                        <td key={`parent-${parent}-${k}`} className="text-right px-4 py-3 font-medium">
                                            {formatNumber(parentTotals[k])}
                                        </td>
                                    ))}
                                </tr>

                                {isParentOpen &&
                                    Object.entries(categories).map(([category, items]) => {
                                        const categoryKey = `${parent}-${category}`;
                                        const isCategoryOpen = openCategories[categoryKey];
                                        const categoryTotals = calculateTotals(items);

                                        return (
                                            <Fragment key={`category-${categoryKey}`}>
                                                <tr
                                                    className="bg-white hover:bg-gray-50 transition-colors cursor-pointer border-t"
                                                    onClick={() => toggleCategory(categoryKey)}
                                                >
                                                    <td className="pl-10 py-3 flex items-center gap-2 italic text-gray-700">
                                                        {isCategoryOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                                        {category}
                                                    </td>
                                                    {keys.map((k) => (
                                                        <td key={`cat-${categoryKey}-${k}`} className="text-right px-4 py-3 text-gray-600">
                                                            {formatNumber(categoryTotals[k])}
                                                        </td>
                                                    ))}
                                                </tr>

                                                {isCategoryOpen &&
                                                    items.map((item, idx) => (
                                                        <tr key={`item-${item.material_id ?? idx}`} className="border-t hover:bg-gray-50">
                                                            <td className="pl-16 py-2 text-gray-800">{item.name ?? "-"}</td>
                                                            {keys.map((k) => (
                                                                <td key={`item-${item.id}-${k}`} className="text-right px-4 py-2 text-gray-700">
                                                                    {formatNumber(Number(item[k]) || 0)}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                            </Fragment>
                                        );
                                    })}
                            </Fragment>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TreeTable;
