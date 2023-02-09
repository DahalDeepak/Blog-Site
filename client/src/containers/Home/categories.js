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
import { Link, useSearchParams } from "react-router-dom";
import { categoriesList } from "../../constants/data";
const StyledTable = styled(Table)`
  border: 1px solid #c1c1c1;
`;
const StyledButton = styled(Button)`
  margin: 20px;
  width: 85%;
  background: #4681f4;
  color: white;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Categories = () => {
  const [serchParams] = useSearchParams();
  const category = serchParams.get("category");
  return (
    <>
      <StyledLink
        to={`/create?category=${category || ""}`}
     
      >
        <StyledButton variant="contained">Create Blog</StyledButton>
      </StyledLink>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to="/">All Categories</StyledLink>{" "}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categoriesList.map((category) => (
            <TableRow key={category.id}>
              <StyledLink to={`/?category=${category.type}`}>
                <TableCell>{category.type}</TableCell>
              </StyledLink>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
