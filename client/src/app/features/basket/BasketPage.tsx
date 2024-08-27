import { useEffect, useState } from "react";
import agent from "../../api/agent";
import LoadingComponent from "../../layout/LoadingComponent";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useStoreContext } from "../../context/StoreContext";

export default function BasketPage() {
  const { basket } = useStoreContext();
  // function handleDelteItem(productId: number, quantity?: number) {
  //   setloading(true);
  //   if (!quantity) quantity = 9999;
  //   agent.Basket.removeItem(productId, quantity)
  //     .catch((error) => console.log(error))
  //     .finally(() => setloading(false));
  // }

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <TableContainer component={Paper}>
      <Typography variant="h3">{basket.buyerId}</Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">
                ${(item.price / 100).toFixed(2)}
              </TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">
                ${((item.price * item.quantity) / 100).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
