import { Link } from "react-router-dom";
import { Product } from "../../models/product";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import agent from "../../api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../context/StoreContext";

type Props = {
  item: Product;
};

export default function ProductCard({ item }: Props) {
  const [loading, setLoading] = useState(false);
  const { setBasket } = useStoreContext();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{item.name.charAt(0).toUpperCase()}</Avatar>}
        title={item.name}
      ></CardHeader>
      <CardMedia
        sx={{ height: 140 }}
        image={item.pictureUrl}
        title={item.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {item.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.brand} / {item.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          size="small"
          onClick={() => handleAddItem(item.id)}
        >
          Add to cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${item.id}`} size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
