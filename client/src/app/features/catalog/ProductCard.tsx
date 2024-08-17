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

type Props = {
  item: Product;
};

export default function ProductCard({ item }: Props) {
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
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
