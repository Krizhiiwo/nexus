import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

export default class MetricsChart extends PureComponent {
  render() {
    return (
      <div style={{ backgroundColor: '#1e1e1e', padding: 20, borderRadius: 10 }}>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#444" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: '#333', borderColor: '#555' }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="uv" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}


// import React, { useState, useEffect } from 'react';
// import ApexCharts from 'react-apexcharts'; // ✅ CORRECT IMPORT

// const Metrics = () => {
//   const [chartData, setChartData] = useState({
//     series: [{
//       name: 'CPU Usage',
//       data: []
//     }],
//     options: {
//       chart: {
//         id: 'cpu-usage',
//         type: 'line',
//         animations: {
//           enabled: true,
//           easing: 'linear',
//           dynamicAnimation: {
//             speed: 1000
//           }
//         },
//         toolbar: {
//           show: false
//         },
//         zoom: {
//           enabled: false
//         }
//       },
//       stroke: {
//         curve: 'smooth'
//       },
//       xaxis: {
//         type: 'datetime',
//         range: 60000,
//       },
//       yaxis: {
//         max: 100,
//         min: 0,
//         tickAmount: 5,
//         labels: {
//           formatter: (val) => `${val}%`
//         }
//       },
//       tooltip: {
//         x: {
//           format: 'HH:mm:ss'
//         }
//       }
//     }
//   });

//   useEffect(() => {
//     const interval = setInterval(async () => {
//       try {
//         const res = await fetch('/api/metrics/cpu');
//         const { cpuUsage } = await res.json();
//         const timestamp = new Date().getTime();

//         setChartData(prev => {
//           const newData = [...prev.series[0].data];
//           if (newData.length > 60) newData.shift();
//           newData.push({ x: timestamp, y: cpuUsage });

//           return {
//             ...prev,
//             series: [{ ...prev.series[0], data: newData }]
//           };
//         });
//       } catch (err) {
//         console.error('Error fetching CPU metrics:', err);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <ApexCharts
//         options={chartData.options}
//         series={chartData.series}
//         type="line"
//         height={350}
//       />
//     </div>
//   );
// };
