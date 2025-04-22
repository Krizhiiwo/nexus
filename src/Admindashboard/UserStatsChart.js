import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserStatsChart = () => {
  const [userStats, setUserStats] = useState({
    labels: [],
    registered: [],
    deleted: [],
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/users/user-stats")
      .then(res => res.json())
      .then(data => {
        setUserStats({
          labels: data.months,
          registered: data.registered,
          deleted: data.deleted
        });
      })
      .catch(err => console.error("Error fetching user stats:", err));
  }, []);

  const chartData = {
    labels: userStats.labels,
    datasets: [
      {
        label: 'Registered Users',
        data: userStats.registered,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Deleted Users',
        data: userStats.deleted,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Registration vs Deletion (Monthly)',
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>User Stats Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default UserStatsChart;




// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';

// // Register required components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const UserStatsChart = () => {
//   const [useMockData, setUseMockData] = useState(true);
//   const [userStats, setUserStats] = useState({
//     labels: [],
//     registered: [],
//     deleted: [],
//   });

//   const fetchLiveData = () => {
//     fetch("http://localhost:5000/api/users/user-stats")
//       .then(res => res.json())
//       .then(data => {
//         setUserStats({
//           labels: data.months,
//           registered: data.registered,
//           deleted: data.deleted
//         });
//       })
//       .catch(err => console.error("Error fetching user stats:", err));
//   };

//   useEffect(() => {
//     if (useMockData) {
//       // Set mock data to preview chart functionality
//       setUserStats({
//         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//         registered: [5, 10, 7, 12, 3, 8],
//         deleted: [1, 2, 0, 1, 0, 4],
//       });
//     } else {
//       fetchLiveData();
//     }
//   }, [useMockData]);

//   const chartData = {
//     labels: userStats.labels,
//     datasets: [
//       {
//         label: 'Registered Users',
//         data: userStats.registered,
//         backgroundColor: 'rgba(54, 162, 235, 0.6)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1
//       },
//       {
//         label: 'Deleted Users',
//         data: userStats.deleted,
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'User Registration vs Deletion (Monthly)',
//       },
//     },
//   };

//   return (
//     <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
//       <h2 style={{ textAlign: 'center' }}>User Stats Chart</h2>
//       <Bar data={chartData} options={options} />
//       <div style={{ marginTop: '20px', textAlign: 'center' }}>
//         {/* <button onClick={() => setUseMockData(prev => !prev)}>
//           {useMockData ? "Switch to Live Data" : "Switch to Mock Data"}
//         </button> */}
//       </div>
//     </div>
//   );
// };

// export default UserStatsChart;
