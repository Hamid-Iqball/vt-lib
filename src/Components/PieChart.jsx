import React, { useState } from "react";
import Chart from "react-apexcharts";

const PieChart = () => {
  const [chartData] = useState({
    series: [60, 40, 10],
    options: {
      chart: {
        type: "donut",
        background: "#333",
        events: {
          mounted: function (chart) {
            // Access the SVG element and reposition data labels manually
            const labels = document.querySelectorAll('.apexcharts-datalabels text');
            labels.forEach((label, index) => {
              const offset = index === 0 ? 25 : -20; // Adjust left/right for the label
              label.setAttribute('x', parseFloat(label.getAttribute('x')) + offset);
              label.setAttribute('y', parseFloat(label.getAttribute('y')) - 10); // Adjust vertical position
            });
          },
        },
      },
      labels: ["Complete", "Overdue", "Pending"],
      legend: {
        position: "top",
        horizontalAlign: "left",
        labels: {
          colors: "#fff",
        },
        fontSize: "13px",
      },
      colors: ["#00E396", "#FF4560", "ccc"],
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(0)}%`,
        style: {
          fontSize: "16px",
          colors: ["#fff"],
        },
        position: "outside", // Force labels outside
        offsetX: 0, // Allow the event handler to take care of positioning
        // offsetY: -20,
        dropShadow: {
          enabled: false,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "80%", // Increase the donut size
          },
        },
      },
        stroke: {
            show: false, // Hide the border (stroke)
            width: 0, // Set border width to 0
        },
      tooltip: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400, // Increase chart width for smaller screens
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div style={{ background: "#333", padding: "20px", borderRadius: "8px" }}>
      <Chart options={chartData.options} series={chartData.series} type="donut" width="500" />
    </div>
  );
};

export default PieChart;
