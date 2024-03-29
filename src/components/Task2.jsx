import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

function Task2() {
  const [populationData, setPopulationData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
        );
        // Extract population data from the response
        const populationData = response.data.data.map((item) => ({
          nation: item.Nation,
          population: item.Population,
        }));
        setPopulationData(populationData);
      } catch (error) {
        console.error("Error fetching population data:", error);
      }
    };

    fetchData();
  }, []);      // Empty dependency array ensures useEffect runs only once

  useEffect(() => {
    let chartInstance = null;

    const renderChart = () => {
      if (populationData) {
        // Extract nation names and population values for the chart
        const nationNames = populationData.map((item) => item.nation);
        const populationValues = populationData.map((item) => item.population);

        // Get the canvas element to render the chart
        const ctx = document.getElementById("populationChart").getContext("2d");

        // Destroy existing chart instance if it exists
        if (chartInstance) {
          chartInstance.destroy();
        }

        // Create the chart
        chartInstance = new Chart(ctx, {
          type: "bar",
          data: {
            labels: nationNames,
            datasets: [
              {
                label: "Population",
                data: populationValues,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Population",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Nation",
                },
              },
            },
          },
        });
      }
    };

    renderChart(); // Initial render

    const handleResize = () => {
      renderChart(); // Re-render on window resize
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener and destroy chart instance on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [populationData]);


  return (
    <div>
      <h2>Population Data by Nation</h2>
      <div className="cont" style={{ width: "100%", maxWidth: "800px" }}>
        <canvas id="populationChart" ></canvas>
      </div>
    </div>
  );
}

export default Task2;
