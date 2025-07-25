import type {ICategory} from "../types/category.ts";

export const groupByParentCategory = (data: ICategory[]) => {
    const result: Record<string, Record<string, ICategory[]>> = {};
    for (const item of data) {
        const { parent, category } = item;
        if (!result[parent]) result[parent] = {};
        if (!result[parent][category]) result[parent][category] = [];
        result[parent][category].push(item);
    }
    return result;
};
