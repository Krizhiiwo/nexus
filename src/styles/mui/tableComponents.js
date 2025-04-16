import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Button,
  Box,
  Badge,
  IconButton,
  Select,
  MenuItem,
  styled,
  Checkbox,
} from '@mui/material';

export const MyTable = styled(Table)(({ theme }) => ({
 
}));

export const MyTableBody = styled(TableBody)(({ theme }) => ({
  
}));

export const MyTableCell = styled(TableCell)(({ theme }) => ({

}));

export const MyTableContainer = styled(TableContainer)(({ theme }) => ({

  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
}));

export const MyTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
}));

export const MyTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const MyTablePagination = styled(TablePagination)(({ theme }) => ({

}));

export const MyTableSortLabel = styled(TableSortLabel)(({ theme }) => ({

}));

export const MyTableTextField = styled(TextField)(({ theme }) => ({

}));

export const MyTableToolButton = styled(Button)(({ theme }) => ({

}));

export const MyTableTools = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

export const SearchBox = ({ search, searchBy, setSearchBy, handleRequestSearch, options }) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      size="small"
      value={search}
      onChange={(e) => handleRequestSearch(e.target.value, searchBy)}
      select={options && options.length > 0}
      SelectProps={{
        native: true,
      }}
      sx={{ marginRight: '10px' }}
    >
      {options && options.map((option) => (
        <option key={option.field} value={option.field}>
          {option.title}
        </option>
      ))}
    </TextField>
  );
};

export const MyPrimarySelect = styled(Select)(({ theme }) => ({

}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
 
}));

export const MyTableBadge = styled(Badge)(({ theme }) =>({
    
}));

export const MyTableIconButton = styled(IconButton)(({theme})=>({
  
}));

export const MyTableFilterMenu = styled(Box)(({theme})=>({
  
}));

export const MyTableCheckbox = styled(Checkbox)(({theme})=>({

}));