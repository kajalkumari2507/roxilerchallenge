import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import randomColorGenerator from "../../../Functions/randomColorGenerator";
import getMonth from "../../../Functions/getMonth";
const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const URL = 'http://localhost:8001';
    axios
      .get(`${URL}/getBarChart/${month}`)
      .then((res) => {
        setChartData(getData(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      })
  }, [month]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Number of items sold on different price ranges during the month of ${getMonth(month)}`,
      },
    },
  };

  function getData(salesData) {
    return {
      labels: [
        "0-100",
        "101-200",
        "201-300",
        "301-400",
        "401-500",
        "501-600",
        "601-700",
        "701-800",
        "801-900",
        "901-above",
      ],
      datasets: [
        {
          label: "count",
          data: formatData(salesData),
          backgroundColor: randomColorGenerator(salesData.length),
          borderWidth: 0,
        },
      ],
    };
  }

  function formatData(data) {
    const arr = new Array(10).fill(0);
    data.forEach((data) => {
      const idx = Math.floor(data._id / 100);
      arr[idx] = data.count;
    });
    return arr;
  }
  return (
    <div className="bar-chart">{chartData && <Bar options={options} data={chartData} />}</div>
  );
};

export default BarChart;
