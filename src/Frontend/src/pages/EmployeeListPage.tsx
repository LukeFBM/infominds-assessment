import {
  Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    styled,
    tableCellClasses,
  } from "@mui/material";
  import { useEffect, useState } from "react";
import { downloadFile } from "../lib/utils";
import { EmployeeListFilter, EmployeeListQuery } from "../types";
 
  
  export default function EmployeeListPage() {
    const [employees, setEmployees] = useState<EmployeeListQuery[]>([]);

    const [filter, setFilter] = useState<EmployeeListFilter>({
      firstName: "",
      lastName: ""
    })
  
    const getEmployees = async (type: "default" | "filtered" = "default") => {
      const baseUrl = "/api/employees/list"
      const url = type === "filtered" ?  `${baseUrl}?FirstName=${filter.firstName}&LastName=${filter.lastName}` : baseUrl
      try {
        const res = await fetch(url)
        const data = await res.json()
        setEmployees(data as EmployeeListQuery[])
        
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
    getEmployees()
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter({
        ...filter, 
        [e.target.name]: e.target.value
      })
    }

    return (
      <>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
          Employees
        </Typography>
  
        <Box  display={"flex"} justifyContent={"space-between"} alignItems={"end"} paddingY={2}>
          <Box>
          <Typography variant="subtitle2" gutterBottom >
            Filter Employees
          </Typography>
          <Box display={"flex"} gap={2}>
            <TextField name="firstName" value={filter.firstName} placeholder="First Name" variant="outlined" onChange={handleChange} />
            <TextField name="lastName" value={filter.lastName} placeholder="Last Name" variant="outlined" onChange={handleChange} />
            <Button size="large" variant="contained" onClick={() => getEmployees("filtered")}>Search</Button>
          </Box>
          </Box>
          <Button variant="outlined" onClick={() => downloadFile(employees)}>Export</Button>
        </Box>
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
              {employees.map((employee) => (
                <TableRow
                  key={employee.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                  <TableCell>{employee.address}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
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