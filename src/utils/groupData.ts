import type {GroupedData, TreeItem} from "../types/table.ts";

export const groupByParentCategory = (data: TreeItem[]): GroupedData => {
    const result: GroupedData = {};
    for (const item of data) {
        const { parent, category } = item;
        if (!result[parent]) result[parent] = {};
        if (!result[parent][category]) result[parent][category] = [];
        result[parent][category].push(item);
    }
    return result;
};
