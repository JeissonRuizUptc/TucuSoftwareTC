import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
const DeliveryChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.stateText),
    datasets: [
      {
        label: 'Procesos de entrega',
        backgroundColor: 'rgb(41, 173, 178)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: data.map((item) => item.count.state),
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const chartContainerStyle = {
    width: '60%',  // Puedes ajustar el ancho según tus necesidades
    height: '300px', // Puedes ajustar la altura según tus necesidades
    margin: 'auto', // Centrar el gráfico
  };

  return (
    <div style={chartContainerStyle}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default DeliveryChart;
