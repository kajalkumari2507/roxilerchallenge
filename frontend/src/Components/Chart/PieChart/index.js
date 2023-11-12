import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import randomColorGenerator from "../../../Functions/randomColorGenerator";
import getMonth from "../../../Functions/getMonth";
const PieChart = ({ month }) => {
  const [chartData, setChartData] = useState(null);


  useEffect(() => {
    const URL = 'http://localhost:8001';



    axios
      .get(`${URL}/getPieChart/${month}`)
      .then((res) => {
        setChartData(getData(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [month]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Number of items sold from different categories during the month of ${getMonth(month)}`,
      },
    },
  };

  function getData(salesData) {
    return {
      labels: salesData.map(data => data._id),
      datasets: [
        {
          label: "",
          data: salesData.map(data => data.count),
          backgroundColor: randomColorGenerator(salesData.length),
          borderWidth: 0,
        },
      ],
    };
  }


  return <div className="pie-chart"> {chartData && <Pie options={options} data={chartData}/>}</div>;
};

export default PieChart;
