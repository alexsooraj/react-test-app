import { immerable } from "immer";

export class DetailsModel {
    country: string;
    count: number;
    loading: boolean;
    [immerable] = true;
    constructor() {
        this.country = '';
        this.count = 0;
        this.loading = false;
    }
}