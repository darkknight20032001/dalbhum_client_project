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
import dayjs from "dayjs";
import { monthList } from "./TimeSlot/monthList";

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
  const [startDate, setStartDate] = React.useState<string>(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = React.useState<string>(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [getDays, setGetDays] = React.useState<number>(0);
  const [currMonthCalendar, setCurrMonthCalendar] = React.useState<number>(
    dayjs(new Date()).toDate().getMonth()
  );
  const [currYearCalendar, setCurrYearCalendar] = React.useState<string>(
    dayjs(new Date()).toDate().getFullYear().toString()
  );
  const [availableDates, setAvailableDates] = React.useState<number[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    async function postLockedDates() {
      try {
        const postInfo = await axios.post(
          "http://localhost:8080/club/lock_dates",
          {
            startDate,
            endDate,
          }
        );
        console.log(postInfo);
      } catch (err) {
        console.log(err);
      }
    }
    async function postCreateOrder() {
      const userId: string = JSON.stringify(localStorage.getItem("userId"));
      console.log(userId);
      console.log(selectPrice * getDays);
      const postData = await axios.post(
        "http://localhost:8080/club/create_order",
        {
          userId: userId,
          amount: selectPrice * getDays,
        }
      );
      console.log("Post Data is ", postData);
    }
    postLockedDates();
    postCreateOrder();
  };
  React.useEffect(() => {
    async function postMonthCalendar() {
      const getAvailableDates = await axios.get(
        "http://localhost:8080/club/available_dates?year=" +
          currYearCalendar +
          "&month=" +
          monthList[currMonthCalendar].toUpperCase()
      );
      console.log("The available dates are ", getAvailableDates);
      setAvailableDates(getAvailableDates?.data);
    }
    postMonthCalendar();
  }, [currMonthCalendar, currYearCalendar]);

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
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setGetDays={setGetDays}
            currMonthCalendar={currMonthCalendar}
            setCurrMonthCalendar={setCurrMonthCalendar}
            currYearCalendar={currYearCalendar}
            setCurrYearCalendar={setCurrYearCalendar}
            setAvailableDates={setAvailableDates}
            availableDates={availableDates}
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
