import { immerable } from "immer";

export class DashboardModel {
    [immerable] = true;
    chartOptions = {
        dataLabels: {
            enabled: false
        }
    }
    chartSeries: {
        name: string,
        data: { x: any, y: any }[]
    }[]
    chartLoading: boolean;
    allData: [];
    constructor() {
        this.chartSeries = [
            { name: 'Cases Reported', data: [] }
        ]
        this.allData = [];
        this.chartLoading = true;
    }
}
