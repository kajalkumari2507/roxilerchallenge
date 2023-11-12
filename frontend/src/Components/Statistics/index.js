import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
import getMonth from "../../Functions/getMonth";
const Statistics = ({ month }) => {
  const [stats, setStats] = useState(null);


  useEffect(() => {
    const URL = 'http://localhost:8001';

    axios
      .get(`${URL}/statistics/${month}`)
      .then((res) => {
        setStats(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [month]);
  return (
    <div className="stats-card">
      {stats ? (
        <Card
          title={`Statistcs - ${getMonth(month)}`}
          style={{
            width: 300,
          }}
        >
          <table className="stats-table">
            <tbody>
              <tr key='saleAmount'>
                <td key='title' className="title">Total sale amount</td>
                <td key='amount'>{stats.totalSaleAmount}</td>
              </tr>
              <tr key='soldItems'>
                <td key='title' className="title">Total sold items</td>
                <td key='total'>{stats.totalSoldItems}</td>
              </tr>
              <tr key='unsoldItems'>
                <td className="title">Total not sold items</td>
                <td key='total'>{stats.totalUnsoldItems}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Statistics;
