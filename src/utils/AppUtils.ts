
export class AppUtils {
    static formatForBarchart(data: any[]): { x: any, y: any }[] {
        const counts = {};
        for (let item of data) {
            (counts as any)[item.category] === undefined ? (counts as any)[item.category] = 1 : (counts as any)[item.category]++
        }
        const results = [];
        for (let row in counts) {
            results.push({x: row, y: (counts as any)[row]});
        }
        // return data.map(item => ({ x: item.country, y: item.count }));
        return results;
    }
}
