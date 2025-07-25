export const groupByParentCategory = (data: any[]) => {
    const result: Record<string, Record<string, any[]>> = {};
    for (const item of data) {
        const { parent, category } = item;
        if (!result[parent]) result[parent] = {};
        if (!result[parent][category]) result[parent][category] = [];
        result[parent][category].push(item);
    }
    return result;
};
