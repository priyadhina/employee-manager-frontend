import { Toolbar } from '@material-ui/core';
import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ChartPage = (props) => {
  useEffect(() => {
    axios
      .get('http://localhost:4000/fetchChartData')
      .then((response) => {
        const chartData = response.data.chartData;
        props.fetchData({ chartData });
      })
      .catch((error) => {
        console.log('Unable to fetch chart data');
      });
  }, []);

  const options = {
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    noData: {
      text: 'No Employees joined',
    },
    xaxis: {
      categories: Object.keys(props.chartData),
      position: 'bottom',
      labels: {
        offsetY: 0,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
        offsetY: -35,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val;
        },
      },
    },
    title: {
      text: 'Number of employees joined per year',
      floating: true,
      offsetY: 0,
      align: 'center',
      style: {
        color: '#444',
      },
    },
  };
  const series = [
    {
      name: 'Employee Count',
      data: Object.values(props.chartData),
    },
  ];

  return (
    <>
      <Link to="/home">&lt; Back to Home</Link>
      <Toolbar />
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="300"
      />
    </>
  );
};

export default ChartPage;
