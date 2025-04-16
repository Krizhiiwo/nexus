import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import './Users.css'; 

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        const formattedUsers = response.data.map((user, index) => ({
          id: index + 1,
          name: user.name,
          email: user.email,
          role: user.role,

        }));
        setUsers(formattedUsers);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Role', width: 150 },
  ];

  return (
    <div style={{ height: 500, width: '100%', maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Registered Users</h2>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight={false}
      />
    </div>
    
  );
}






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { DataGridPro } from '@mui/x-data-grid-pro';
// import './UsersPage.css'; // optional for styling

// function UsersPage() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/users')
//       .then(res => setUsers(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const columns = [
//     { field: '_id', headerName: 'ID', width: 250 },
//     { field: 'email', headerName: 'Email', width: 250 },
//     { field: 'role', headerName: 'Role', width: 150 },
//   ];

//   return (
//     <div style={{ height: 600, width: '100%' }}>
//       <DataGridPro
//         rows={users}
//         columns={columns}
//         getRowId={(row) => row._id}
//       />
//     </div>
//   );
// }

// export default UsersPage;
