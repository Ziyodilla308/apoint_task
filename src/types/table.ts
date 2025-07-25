export interface TreeItem {
    id: string | number;
    material_id?: string | number;
    name: string;
    remind_end_amount: number;
    remind_end_sum: number;
    remind_income_amount: number;
    remind_income_sum: number;
    remind_outgo_amount: number;
    remind_outgo_sum: number;
    remind_start_amount: number;
    remind_start_sum: number;
}

export type CategoryGroup = Record<string, TreeItem[]>;
export type GroupedData = Record<string, CategoryGroup>;
