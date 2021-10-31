import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

const App = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    try {
      const data = await axios.get(
        " http://universities.hipolabs.com/search?country=Australia"
      );
      console.log(data.data);
      setProduct(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteLastItem = async () => {
    try {
      const newdata=product;
      newdata.pop();
      console.log("new Data", newdata)
      setProduct([...newdata]);
    } catch (e) {
      console.log(e);
    }
  };

  const addAtLast = () => {
    const firstEntry = product[0];
    product.push(firstEntry);
    console.log("product",product);
    setProduct([...product]);
   }  
  return (
    <div className="App">
      <h1>University Listing</h1>
      
     <Button onClick={()=>getProductData()} style={{backgroundColor: 'grey', color: 'black'}}>Load</Button>
      <Button onClick={()=>deleteLastItem()} style={{backgroundColor: 'blue', color: 'black'}}>Delete</Button>
      <Button onClick={()=>addAtLast()} style={{backgroundColor: 'orange', color: 'black'}}>Add</Button>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Web Pages</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Country</StyledTableCell>
              <StyledTableCell align="right">Domains</StyledTableCell>
              <StyledTableCell align="right">State-Province</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product
             .map((item) => {
                return (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell align="right">
                      {item.web_pages[0]}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.country}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.domains}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.state}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
