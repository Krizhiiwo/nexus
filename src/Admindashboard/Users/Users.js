import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from "moment";
import { CSVLink } from "react-csv";
import {
  Box,
  Typography,
  useTheme,
  TableCell,
} from "@mui/material";
import { Icon } from '@iconify/react';
import { rgba } from "emotion-rgba";
import Sidebar from "../Sidebar.js";

import {
  MyTable,
  MyTableBody,
  MyTableCell,
  MyTableCheckbox,
  MyTableContainer,
  MyTableHead,
  MyTablePagination,
  MyTableRow,
  MyTableSortLabel,
  MyTableTextField,
  MyTableToolButton,
  MyTableTools,
  SearchBox,
} from "../../styles/mui/tableComponents.js"; 

function TableLoading() {
  const theme = useTheme();
  return (
    <Box
      id="table-loading"
      sx={{
        position: "absolute",
        zIndex: 99,
        height: "100%",
        width: "100%",
        backgroundColor: rgba(theme.palette.background.default, 0.5),
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon
        icon="svg-spinners:gooey-balls-2"
        style={{
          width: "50px",
          height: "50px",
          color: theme.palette.primary.main,
        }}
      />
    </Box>
  );
}

function TableHeader({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  selectable,
  onRequestSort,
  columns,
  rowSelection,
  actions,
  onRequestSearch,
  options,
}) {
  const theme = useTheme();

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <MyTableHead
      id="table-header"
      sx={{
        ...options?.tableHeaderStyle,
      }}
    >
      <MyTableRow
        sx={{
          ...options?.tableHeaderStyle?.rowStyle,
        }}
      >
        {(rowSelection || rowSelection == null) && selectable && (
          <MyTableCell
            id="table-header-cell-1"
            padding="none"
            sx={{
              ...options?.tableHeaderStyle?.cellStyle,
            }}
          >
            <MyTableCheckbox
              icon={
                <Icon
                  icon="fluent:checkbox-unchecked-16-regular"
                  style={{
                    width: "24px",
                    height: "24px",
                    color: rgba(theme.palette.primary.main, 0.7),
                  }}
                />
              }
              checkedIcon={
                <Icon
                  icon="akar-icons:check-box-fill"
                  style={{
                    width: "24px",
                    height: "24px",
                    color: theme.palette.primary.main,
                  }}
                />
              }
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all",
              }}
            />
          </MyTableCell>
        )}
        {actions && actions?.length > 0 && (
          <TableCell
            id="table-header-cell-2"
            align="center"
            sx={{
              ...options?.tableHeaderStyle?.cellStyle,
            }}
            padding="none"
          >
            <Typography variant="body2" fontWeight={600}>
              Actions
            </Typography>
          </TableCell>
        )}
        {columns.map((column, i) => (
          <MyTableCell
            id={`table-header-cell-${i + 3}`}
            sx={options?.tableHeaderStyle?.cellStyle}
            key={i}
            align={column.align}
            padding={column.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === column.field ? order : false}
          >
            {column.sorting == null || column.sorting ? (
              <MyTableSortLabel
                id={`table-header-cell-${i + 3}-sort-label`}
                active={orderBy === column.field}
                direction={orderBy === column.field ? order : "asc"}
                onClick={createSortHandler(column.field)}
                sx={{}}
              >
                {column.title}
              </MyTableSortLabel>
            ) : (
              <Typography
                id={`table-header-cell-${i + 3}-title`}
                variant="body2"
                fontWeight={600}
                color="primary"
              >
                {column.title}
              </Typography>
            )}
            <Box height={1} />
          </MyTableCell>
        ))}
      </MyTableRow>
    </MyTableHead>
  );
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const tableRef = useRef(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(null);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [exportData, setExportData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isExporting, setExporting] = useState(false);
  const theme = useTheme();
  const csvRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, [page, search, rowsPerPage, order, orderBy]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/users');
      let formattedUsers = response.data.map((user) => ({
        _id: user._id,
        email: user.email,
        role: user.role,
      }));

      if (search && searchBy) {
        formattedUsers = formattedUsers.filter(user =>
          user[searchBy].toLowerCase().includes(search.toLowerCase())
        );
      }

      if (orderBy) {
        formattedUsers.sort((a, b) => {
          const aValue = a[orderBy];
          const bValue = b[orderBy];
          if (order === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
      }

      const startIndex = page * rowsPerPage;
      const paginatedUsers = formattedUsers.slice(startIndex, startIndex + rowsPerPage);
      setUsers(paginatedUsers);
      setTotalCount(formattedUsers.length);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const columns = [
    { field: 'email', title: 'Email', width: 250, searchable: true },
    { field: 'role', title: 'Role', width: 150, searchable: true },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRequestSearch = (search, searchBy) => {
    setSearch(search);
    setSearchBy(searchBy);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else {
      newSelected = selected.filter((item) => item !== id);
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExportAllDataCSV = async () => {
    setExporting(true);
    setExportData([]);
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      const allUsers = response.data;

      const tempColumns = columns.filter((column) => column.export !== false);

      const rowData = allUsers.map((row) => {
        return tempColumns.map((column) => {
          return row[column.field];
        });
      });
      setExporting(false);
      setExportData(rowData);
    } catch (error) {
      console.error('Error exporting data:', error);
      setExporting(false);
    }
  };

  useEffect(() => {
    if (exportData.length > 0) {
      csvRef.current.link.click();
    }
  }, [exportData]);

  const options = {
    pageSize: 5,
    pageSizeOptions: [5, 10, 25],
    exportButton: true,
    refreshButton: true,
    pagination: true,
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', padding: '1rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Registered Users</h2>
        <MyTableContainer
          id="my-table-container"
          sx={{
            position: "relative",
            width: "100%",
            ...options?.tableContainerStyle,
          }}
        >
          <MyTableTools
            id="tools"
            sx={{
              ...options?.tableToolbarStyle,
            }}
          >
            <Box
              id="my-table-tools-search"
              sx={{
                height: "100%",
                display: { xs: "none", sm: "block" },
                height: "40px",
              }}
            >
              {columns.filter((column) => column.searchable).length > 0 && (
                <SearchBox
                  id="search"
                  placeholder="Search here"
                  options={columns.filter((column) => column.searchable)}
                  search={search}
                  searchBy={searchBy}
                  setSearchBy={setSearchBy}
                  handleRequestSearch={handleRequestSearch}
                />
              )}
            </Box>
            <Box
              id="tools"
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                alignItems: "center",
              }}
            >
              {options?.exportButton && (
                <>
                  <MyTableToolButton
                    startIcon={
                      <Icon
                        icon={
                          isExporting
                            ? "line-md:downloading-loop"
                            : "tabler:cloud-download"
                        }
                        style={{fontSize: '1rem'}}
                      />
                    }
                    variant="outlined"
                    id="table-export"
                    sx={{ mr: 1 }}
                    disabled={isExporting}
                    onClick={() => {
                      handleExportAllDataCSV();
                    }}
                  >
                    Export
                  </MyTableToolButton>
                </>
              )}
              {options?.refreshButton && (
                <>
                  <MyTableToolButton
                    id="my-table-tools-refresh-button"
                    sx={{
                      mr: 1,
                      height: "100%",
                      minWidth: "0px",
                    }}
                    onClick={() => fetchUsers()}
                  >
                    <Icon
                      icon={
                        isLoading
                          ? "eos-icons:loading"
                          : "ant-design:reload-outlined"
                        }
                      style={{
                        fontSize: "1rem",
                        margin: "4px",
                      }}
                    />
                  </MyTableToolButton>
                </>
              )}
            </Box>
          </MyTableTools>
          <Box
            sx={{
              overflowY: "auto",
              boxSizing: "border-box",
            }}
          >
            <MyTable>
              <TableHeader
                options={options}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                search={search}
                searchBy={searchBy}
                onRequestSearch={handleRequestSearch}
                onSelectAllClick={handleSelectAllClick}
                selectable={true}
                onRequestSort={handleRequestSort}
                rowCount={users.length}
                actions={[]}
                columns={columns}
                rowSelection={options?.rowSelection}
              />
              <MyTableBody>
              {isLoading && (
  <MyTableRow>
    <MyTableCell colSpan={columns.length + 2} align="center">
      <TableLoading />
    </MyTableCell>
  </MyTableRow>
)}
                {/* {isLoading && <TableLoading />}
                {!isLoading && users.length === 0 && (
                  <MyTableRow
                    sx={{
                      ...options?.rowStyle,
                    }}
                  >
                    <TableCell colSpan={columns.length + 1}>
                      <Box
                        className="flex align-center justify-center"
                        mt={2}
                        mb={2}
                      >
                        <Typography
                          variant="body2"
                          color="GrayText"
                          textAlign="center"
                        >
                          No users found.
                        </Typography>
                      </Box>
                    </TableCell>
                  </MyTableRow>
                )} */}
                {users.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <MyTableRow
                      id={`my-table-row-${index}`}
                      hover
                      key={row._id}
                      role="checkbox "
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                      sx={{
                        cursor: "default",
                        ...options?.rowStyle,
                      }}
                    >
                      <MyTableCell
                        id={`my-table-cell-${index}`}
                        padding="none"
                        sx={{
                          ...options?.cellStyle,
                        }}
                      >
                        <MyTableCheckbox
                          icon={
                            <Icon
                              icon="fluent:checkbox-unchecked-16-regular"
                              style={{
                                width: "24px",
                                height: "24px",
                                color: rgba(theme.palette.primary.main, 0.7),
                              }}
                            />
                          }
                          checkedIcon={
                            <Icon
                              icon="akar-icons:check-box-fill"
                              style={{
                                width: "24px",
                                height: "24px",
                                color: theme.palette.primary.main,
                              }}
                            />
                          }
                          checked={isItemSelected}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleClick(event, row._id);
                          }}
                        />
                      </MyTableCell>
                      {columns.map((column, j) => (
                        <MyTableCell
                          id={`my-table-cell-${index}-${j}`}
                          key={`${row._id}-c-${j}`}
                          align={column.align}
                          sx={{
                            ...options?.cellStyle,
                          }}
                        >
                          {row[column.field]}
                        </MyTableCell>
                      ))}
                    </MyTableRow>
                  );
                })}
              </MyTableBody>
            </MyTable>
          </Box>
          {(options?.pagination == null || options?.pagination) && (
            <MyTablePagination
              id="my-table-pagination"
              rowsPerPageOptions={options?.pageSizeOptions ?? [5, 10, 25]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
          <CSVLink
            asyncOnClick={true}
            data={exportData}
            headers={columns
              ?.map((column) => {
                if (column.export !== false) return column.title;
              })
              .filter((column) => column)}
            filename={`users-${moment().format("DD-MM-yyyy")}.csv`}
            className="hidden"
            ref={csvRef}
            target="_blank"
          />
        </MyTableContainer>
      </div>
    </div>
  );
}


// // import MyDataTable from "./components/common/MyTable.js";
// import Iconify from "./components/common/Iconify.js";
// import { MyTableToolButton } from "./styles/mui/tableComponents.js";
// import { useState, useRef, useContext } from "react";
// import moment from "moment";
// import AlertDialog from "./components/common/AlertDialog.js";
// import { useRouter } from "next/router";

// // ==== IMPORT ACTIONS ====
// import { getRegistrations, deleteMultipleRegistrations } from "@/redux/actions/registrationActions";
// import StoreHooks from "@/redux/contextProvider/storeHooks";

// const RegistrationTable = () => {
//   const tableRef = useRef();
//   const storeHooks = useContext(StoreHooks);
//   const router = useRouter();

//   // ==== ALERT STATE ====
//   const [action, setAction] = useState("");
//   const [selectedData, setSelectedData] = useState([]);
//   const [openAlertDialog, setOpenAlertDialog] = useState(false);
//   const [alertTitle, setAlertTitle] = useState("");
//   const [alertMessage, setAlertMessage] = useState("");

//   const handleCloseAlertDialog = () => {
//     setOpenAlertDialog(false);
//     setSelectedData([]);
//   };

//   const dialogAction = async () => {
//     if (action === "MULTIPLE-DELETE") {
//       const res = await deleteMultipleRegistrations({ ids: selectedData }, storeHooks);
//       if (res.status === 200) {
//         tableRef.current.fetchData();
//       }
//     }
//   };

//   return (
//     <>
//       <MyDataTable
//         tableRef={tableRef}
//         title="Registrations"
//         columns={[
//           { title: "Name", field: "name", searchable: true },
//           { title: "Email", field: "email", searchable: true },
//           {
//             title: "Registered At",
//             field: "createdAt",
//             render: (row) => (
//               <span>{moment(row.createdAt).format("DD-MM-YYYY")}</span>
//             ),
//           },
//         ]}
//         data={(query) =>
//           new Promise((resolve, reject) => {
//             getRegistrations(query)
//               .then((response) => response.data)
//               .then((result) => {
//                 resolve({
//                   data: result.data,
//                   page: result.page,
//                   totalCount: result.total,
//                 });
//               })
//               .catch((err) => reject(err));
//           })
//         }
//         actions={[
//           {
//             icon: <Iconify icon="mdi:eye-outline" />,
//             tooltip: "View",
//             onClick: (event, rowData) => {
//               router.push({
//                 pathname: `/admin/registrations/view`,
//                 query: { id: rowData._id },
//               });
//             },
//           },
//         ]}
//         tools={[
//           {
//             title: "Delete",
//             render: (selected) => (
//               <MyTableToolButton
//                 startIcon={<Iconify icon="fluent:delete-12-regular" />}
//                 sx={{ mr: 1 }}
//                 onClick={() => {
//                   if (selected.length > 0) {
//                     setAction("MULTIPLE-DELETE");
//                     setAlertTitle("Delete Registrations");
//                     setAlertMessage(
//                       `Are you sure you want to delete ${
//                         selected.length === 1
//                           ? "this registration"
//                           : `${selected.length} registrations`
//                       }?`
//                     );
//                     setSelectedData(selected);
//                     setOpenAlertDialog(true);
//                   } else {
//                     storeHooks.handleOpenSnackBar(
//                       "Select a registration to delete",
//                       "warning"
//                     );
//                   }
//                 }}
//               >
//                 Delete
//               </MyTableToolButton>
//             ),
//           },
//         ]}
//         options={{
//           refreshButton: true,
//           exportButton: true,
//         }}
//       />

//       <AlertDialog
//         openDialog={openAlertDialog}
//         handleCloseDialog={handleCloseAlertDialog}
//         alertTitle={alertTitle}
//         alertMessage={alertMessage}
//         dialogAction={dialogAction}
//       />
//     </>
//   );
// };

// export default RegistrationTable;
