import { ItemModel } from "../models/ItemModel";

export class AppUtils {
    static formatForBarchart(data: ItemModel[]): { x: any, y: any }[] {
        return data.map(item => ({ x: item.country, y: item.count }));
    }
}
