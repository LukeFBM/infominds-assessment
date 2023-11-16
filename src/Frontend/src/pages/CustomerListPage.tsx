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
  import { CustomerListFilter, CustomerListQuery } from "../types";
   
    
    export default function CustomerListPage() {
      const [customers, setCustomers] = useState<CustomerListQuery[]>([]);
  
      const [filter, setFilter] = useState<CustomerListFilter>({
        name: "",
        email: ""
      })
    
      const getCustomers = async (type: "default" | "filtered" = "default") => {
        const baseUrl = "/api/customers/list"
        const url = type === "filtered" ?  `${baseUrl}?Name=${filter.name}&Email=${filter.email}` : baseUrl
        try {
          const res = await fetch(url)
          const data = await res.json()
          setCustomers(data as CustomerListQuery[])
          
        } catch (error) {
          console.log(error)
        }
      }
  
      useEffect(() => {
      getCustomers()
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
            Customers
          </Typography>
    
          <Box  display={"flex"} justifyContent={"space-between"} alignItems={"end"} paddingY={2}>
            <Box>
            <Typography variant="subtitle2" gutterBottom >
              Filter Customers
            </Typography>
            <Box display={"flex"} gap={2}>
              <TextField name="name" value={filter.name} placeholder="Name" variant="outlined" onChange={handleChange} />
              <TextField name="email" value={filter.email} placeholder="Email" variant="outlined" onChange={handleChange} />
              <Button size="large" variant="contained" onClick={() => getCustomers("filtered")}>Search</Button>
            </Box>
            </Box>
            <Button variant="outlined" onClick={() => downloadFile(customers)}>Export</Button>
          </Box>
          <TableContainer component={Paper}>
            
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell>Name</StyledTableHeadCell>
                  <StyledTableHeadCell>Address</StyledTableHeadCell>
                  <StyledTableHeadCell>Email</StyledTableHeadCell>
                  <StyledTableHeadCell>Phone</StyledTableHeadCell>
                  <StyledTableHeadCell>Iban</StyledTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.iban}</TableCell>
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