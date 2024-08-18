import Catalog from "../features/catalog/Catalog";
import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <CssBaseline />
        <Header />
        <Container>
          <Outlet />
        </Container>
      </div>
    </>
  );
}

export default App;
