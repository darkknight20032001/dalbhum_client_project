// import React from "react";
// import ChooseOption from "./ChooseOption/ChooseOption";
// import TimeSlot from "./TimeSlot/TimeSlot";
// import BookSlot from "./BookSlot/BookSlot";
// import "./HomePage.sass";
// export default function HomePage() {
//   return (
//     <div className="HomePage">

//       <div className="BookBox">
//         <div className='BookBoxCard' id="ChooseBox">
//           <ChooseOption />
//         </div>
//         <div className='BookBoxCard'  id="TimeSlot">
//           <TimeSlot />
//         </div>
//         <div className='BookBoxCard' id="BookSlot">
//           <BookSlot />
//         </div>
//       </div>
//     </div>
//   );
// }
// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// function Copyright(props: any) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.
import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChooseOption from "./ChooseOption/ChooseOption";
import TimeSlot from "./TimeSlot/TimeSlot";
import axios from "axios";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface SignInProps {
  setCheckAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function HomePage({ setCheckAuth }: SignInProps) {
  const [selectPrice, setSelectPrice] = React.useState<number>(0);
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());
  const [getDays, setGetDays] = React.useState<number>(0);

  console.log("selectPrice ", selectPrice);
  console.log("startDate ", startDate);
  console.log("endDate ", endDate);
  console.log("getDays ", getDays);
  console.log("Total amount ", selectPrice * getDays);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const postInfo = await axios.post("http://localhost:8080/payment", {
      userId: localStorage.getItem("userId"),
      startDate: startDate,
      endDate: endDate,
      amount: selectPrice * getDays,
    });
  };

  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ChooseOption setSelectPrice={setSelectPrice} />
          <TimeSlot
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setGetDays={setGetDays}
          />

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              BOOK
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
