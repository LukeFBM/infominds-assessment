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
  
  interface EmployeeListQuery {
    id: number;
    firstName: string;
    lastName: string; 
    address: string;
    email: string;
    phone: string;
  }

  interface IFilter {
    firstName: string, 
    lastName: string
  }
  
  export default function EmployeeListPage() {
    const [list, setList] = useState<EmployeeListQuery[]>([]);

    const [filter, setFilter] = useState<IFilter>({
      firstName: "",
      lastName: ""
    })
  
    const getEmployees = async (type: "default" | "filtered" = "default") => {
      const baseUrl = "/api/employees/list"
      const url = type === "filtered" ?  `${baseUrl}?FirstName=${filter.firstName}&LastName=${filter.lastName}` : baseUrl
      try {
        const res = await fetch(url)
        const data = await res.json()
        setList(data as EmployeeListQuery[])
        
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
  console.log(filter)
    return (
      <>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
          Employees
        </Typography>
  
        <TableContainer component={Paper}>
          <Box padding={2}>
            <Typography variant="subtitle2" gutterBottom >
            Filter Employees
          </Typography>
          <Box display={"flex"} gap={2}>
            <TextField name="firstName" value={filter.firstName} placeholder="First Name" variant="outlined" onChange={handleChange} />
            <TextField name="lastName" value={filter.lastName} placeholder="Last Name" variant="outlined" onChange={handleChange} />
            <Button size="large" variant="contained" onClick={() => getEmployees("filtered")}>Search</Button>
          </Box>
          </Box>
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
              {list.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.firstName} {row.lastName}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
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