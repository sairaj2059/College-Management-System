import React from "react";
import ReactApexChart from "react-apexcharts";

function PieChart({ chartData, chartOptions }) {
  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="pie"
      width="100%"
      height="100%"
    />
  );
}

export default PieChart;
