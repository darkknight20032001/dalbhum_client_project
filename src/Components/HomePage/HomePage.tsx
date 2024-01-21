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

declare global {
  interface Window {
    Razorpay: any;
  }
}
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
  const [venueName, setVenueName] = React.useState<string>("");

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
      const userId = localStorage.getItem("userId");
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
    function loadScript(src: string) {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    }
    async function displayRazorpay() {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // creating a new order
      const userId = localStorage.getItem("userId");
      const result = await axios.post(
        "http://localhost:8080/club/create_order",
        {
          userId: userId,
          amount: selectPrice * getDays,
        }
      );

      console.log(result);

      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      // Getting the order details back
      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: "rzp_test_p6vGRxTr6UPXLw", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Dalbhum Club",
        order_id: order_id,
        handler: async function (response: {
          razorpay_payment_id: any;
          razorpay_order_id: any;
          razorpay_signature: any;
        }) {
          // 1. update order
          const data = {
            orderId: response.razorpay_order_id,
            status: "Paid",
            paymentId: response.razorpay_payment_id,
          };
          const result = await axios.post(
            "http://localhost:8080/club/update_order",
            data
          );

          // 2. add Booking entry
          const bookingData = {
            userName: userId,
            startDate: startDate,
            endDate: endDate,
            amenities: { venueName },
            amount: selectPrice * getDays,
          };

          const bookingResult = await axios.post(
            "http://localhost:8080/club/book",
            bookingData
          );
          console.log(response.razorpay_payment_id);
          console.log(response.razorpay_order_id);
          console.log(response.razorpay_signature);
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }

    postLockedDates();
    displayRazorpay();
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
          <ChooseOption
            venueName={venueName}
            setVenueName={setVenueName}
            setSelectPrice={setSelectPrice}
          />
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
            {selectPrice > 0 && getDays > 0 && (
              <Typography>
                {"Your total amount is " + selectPrice * getDays}
              </Typography>
            )}

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
