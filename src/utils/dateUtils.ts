export const getMonthRange = (): { start: string; end: string } => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0],
    };
};
