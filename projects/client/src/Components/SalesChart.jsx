import React from 'react';
import {
    Chart as ChartJS,
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
} from 'chart.js';
import { 
    Line
} from 'react-chartjs-2';
ChartJS.register(
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
)

function SalesChart() {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Sales for 2023 (M)',
            data: [65, 59, 80, 81, 56, 55, 40, 90, 120, 54],
            fill: false,
            borderColor: "red",
            tension: 0.1,
          }
        ]
      };

    return ( 
        <div>
            <Line data={data} />
        </div> 
    );
}

export default SalesChart;