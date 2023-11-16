import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SupplierListQuery } from "../types";

export default function SupplierListPage() {
  const [suppliers, setSuppliers] = useState<SupplierListQuery[]>([]);

  const getSuppliers = async () => {
    try {
      const res = await fetch("/api/suppliers/list"); 
      const data = await res.json()
      setSuppliers(data as SupplierListQuery[])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSuppliers()
  }, []);

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        Suppliers
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>Name</StyledTableHeadCell>
              <StyledTableHeadCell>Address</StyledTableHeadCell>
              <StyledTableHeadCell>Email</StyledTableHeadCell>
              <StyledTableHeadCell>Phone</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow
                key={supplier.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}));
