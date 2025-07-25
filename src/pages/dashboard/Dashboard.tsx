import { useEffect, useState } from "react";
import { fetchMaterials } from "../../services/api";
import { getMonthRange } from "../../utils/dateUtils";
import { groupByParentCategory } from "../../utils/groupData";
import Table from "../../components/Table";
import type {GroupedData, TreeItem} from "../../types/table.ts";

function Dashboard() {
    const [data, setData] = useState<TreeItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const { start, end } = getMonthRange();
            const response = await fetchMaterials(start, end);
            setData(response);
            setLoading(false);
        };
        load();
    }, []);

    if (loading) return <div>Loading...</div>;

    const grouped: GroupedData = groupByParentCategory(data);

    return (
        <div>
            <Table groupedData={grouped} />
        </div>
    );
}

export default Dashboard;
