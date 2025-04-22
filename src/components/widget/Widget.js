import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import axios from 'axios';

export default function Widget() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    deletedUsers: 0,
    adminUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/user-total');
        setStats(res.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box display="flex" gap={2} justifyContent="left" mt={2}>
      <Card sx={{ width: 250, height: 120 }}>
        <CardActionArea sx={{ height: '100%' }}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              TOTAL USERS
            </Typography>
            <Typography variant="body1">{stats.totalUsers}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ width: 250, height: 120 }}>
        <CardActionArea sx={{ height: '100%' }}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              DELETED USERS
            </Typography>
            <Typography variant="body1">{stats.deletedUsers}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ width: 250, height: 120 }}>
        <CardActionArea sx={{ height: '100%' }}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              ADMIN
            </Typography>
            <Typography variant="body1">{stats.adminUsers}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}



// import * as React from 'react';
// import { Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';

// export default function Widget() {
//   return (
//     <Box display="flex" gap={2} justifyContent="left" mt={2}>
//       <Card sx={{ maxWidth: 345 }}>
//         <CardActionArea sx={{ height: '100%' }}>
//           <CardContent>
//             <Typography gutterBottom variant="h6" component="div">
//               TOTAL USERS
//             </Typography>
//           </CardContent>
//         </CardActionArea>
//       </Card>

//       <Card sx={{ maxWidth: 345 }}>
//         <CardActionArea sx={{ height: '100%' }}>
//           <CardContent>
//             <Typography gutterBottom variant="h6" component="div">
//               DELETED USERS
//             </Typography>
//           </CardContent>
//         </CardActionArea>
//       </Card>

//       <Card sx={{ maxWidth: 345 }}>
//         <CardActionArea sx={{ height: '100%' }}>
//           <CardContent>
//             <Typography gutterBottom variant="h6" component="div">
//               ADMIN
//             </Typography>
//           </CardContent>
//         </CardActionArea>
//       </Card>
//     </Box>
//   );
// }
