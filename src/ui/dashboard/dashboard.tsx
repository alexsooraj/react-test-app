import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { DashboardActions } from '../../flux/actions/DashboardActions';
import './dashboard.css';
import { useHistory } from 'react-router-dom';

const Dashboard = (props: any) => {

    const history = useHistory();

    const options = {
        ...props.dashState.chartOptions,
        chart: {
            events: {
                dataPointSelection: (event: any, chartContext: any, config: any) => {
                    onBarClick(config.dataPointIndex);
                }
            }
        }
    };

    const onBarClick = (index: number) => {
        const country = props.dashState.chartSeries[0].data[index].x;
        history.push('/todo?category=' + encodeURIComponent(country));
    }

    useEffect(() => {
        DashboardActions.loadGraphData();
    }, []);

    const formatDate = (date: Date) => {
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    }

    return <div className="container">
        <div className="chart-border">
            <h5>{props.dashState.chartLoading ? 'Loading...' : 'Things todo'}</h5>
            {props.dashState.chartLoading? null : <Chart options={options} type='bar' series={props.dashState.chartSeries} />}
        </div>
    </div>
}

const DashboardWrap = (props: any) => <Dashboard {...props} />;

export default DashboardWrap;
