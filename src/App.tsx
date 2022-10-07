import React, { Suspense, lazy } from "react";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import DemoAppBar from "./AppBar";

const DemoTable = lazy(() => import("./Table"));

const DemoTableLoading = () => {
  return <Skeleton variant="rectangular" width="100%" height="400px" />;
};

export default function App() {
  return (
    <div>
      <DemoAppBar />
      <Container
        sx={{
          mt: "2rem",
        }}
      >
        <Suspense fallback={<DemoTableLoading />}>
          <DemoTable />
        </Suspense>
      </Container>
    </div>
  );
}

App.loadAllData = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('APP FAKE LOAD DATA')
      resolve(true);
    }, 5000)
  })
}