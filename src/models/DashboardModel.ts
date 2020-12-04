import { immerable } from "immer";

export class DashboardModel {
    [immerable] = true;
    chartOptions = {
        dataLabels: {
            enabled: false
        },
        yaxis: [
            {
              labels: {
                formatter: function(val: any) {
                  return val.toFixed(0);
                }
              }
            }
          ]
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
