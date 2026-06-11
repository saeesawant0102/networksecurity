import { useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend
} from "recharts";

import "./App.css";

function App() {

  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const uploadFile = async () => {

    if (!file) {
      alert("Select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );

      console.log(response.data);

      setData(response.data.data);

    }

    catch (error) {

      console.error(error);

      alert("Prediction Failed");

    }

  };

  const totalRecords = data.length;

  const suspiciousCount = data.filter(
    (row) =>
      row.prediction === 1 ||
      row.predicted_column === 1 ||
      row.prediction === -1 ||
      row.predicted_column === -1
  ).length;

  const safeCount = totalRecords - suspiciousCount;

  const threatPercentage =
    totalRecords > 0
      ? ((suspiciousCount / totalRecords) * 100).toFixed(1)
      : 0;

  const chartData = [
    {
      name: "Suspicious",
      value: suspiciousCount
    },
    {
      name: "Safe",
      value: safeCount
    }
  ];

  const COLORS = [
    "#ef4444",
    "#22c55e"
  ];

  return (

    <div className="main-container">

      <div className="dashboard-container">

        <h1 className="title">
        Network Security
        <br />
        Threat Detector
      </h1>

        <p className="subtitle">
          REAL-TIME INTRUSION ANALYSIS DASHBOARD
        </p>

        <div className="dashboard-card upload-card">

          <h3>
            Upload Network Traffic Dataset
          </h3>

          <input
            type="file"
            className="form-control mt-3"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <button
            className="btn btn-primary mt-3"
            onClick={uploadFile}
          >
            Analyze Traffic
          </button>

        </div>

        <div className="row g-4">

          <div className="col-md-3">

            <div className="dashboard-card">

              <div className="metric-title">
                Total Records
              </div>

              <div className="metric-value">
                {totalRecords}
              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="dashboard-card">

              <div className="metric-title">
                Suspicious Traffic
              </div>

              <div className="metric-value">
                {suspiciousCount}
              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="dashboard-card">

              <div className="metric-title">
                Safe Traffic
              </div>

              <div className="metric-value">
                {safeCount}
              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="dashboard-card">

              <div className="metric-title">
                Threat Rate
              </div>

              <div className="metric-value">
                {threatPercentage}%
              </div>

            </div>

          </div>

        </div>

        {
          data.length > 0 && (

            <div
              className="dashboard-card chart-card"
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >

              <h3>
                Threat Distribution
              </h3>

              <PieChart
                width={500}
                height={350}
              >

                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >

                  {
                    chartData.map(
                      (entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index]}
                        />
                      )
                    )
                  }

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </div>

          )
        }

        {
          data.length > 0 && (

            <div
              className="dashboard-card results-section"
            >

              <h2 className="results-title">
                Threat Analysis Results
              </h2>

              <div className="table-wrapper">

                <table className="table table-dark table-hover">

                  <thead>

                    <tr>

                      {
                        Object.keys(data[0]).map(
                          (key) => (
                            <th key={key}>
                              {key}
                            </th>
                          )
                        )
                      }

                    </tr>

                  </thead>

                  <tbody>

                    {
                      data.map((row, index) => (

                        <tr key={index}>

                          {

                            Object.values(row).map(
                              (value, i) => {

                                let displayValue = value;
                                let className = "";

                                if (
                                  value === 1 ||
                                  value === -1
                                ) {

                                  displayValue =
                                    "Suspicious";

                                  className =
                                    "danger-cell";

                                }

                                else if (
                                  value === 0
                                ) {

                                  displayValue =
                                    "Safe";

                                  className =
                                    "safe-cell";

                                }

                                return (

                                  <td
                                    key={i}
                                    className={
                                      className
                                    }
                                  >
                                    {displayValue}
                                  </td>

                                );

                              }
                            )

                          }

                        </tr>

                      ))
                    }

                  </tbody>

                </table>

              </div>

            </div>

          )
        }

      </div>

    </div>

  );

}

export default App;