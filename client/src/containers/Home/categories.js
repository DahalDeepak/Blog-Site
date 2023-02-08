import {
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  
} from "@mui/material";
import React from "react";
import { categoriesList } from "../../constants/data";
const StyledTable = styled(Table)`
    border: 1px solid #C1C1C1;
`;
const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #4681f4;
    color: white;
    text-decoration: none;
`;
    
// const StyledLink = styled(Link)`
//     text-decoration: none;
//     color: inherit;
// `;

const Categories = () => {
  return (
    <>
      <StyledButton variant="contained">Create Blog</StyledButton>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>All Categories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categoriesList.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
