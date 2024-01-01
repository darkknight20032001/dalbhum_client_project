// import * as React from "react";
// import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

// export default function TimeSlot() {
//   const [fromDate, setFromDate] = React.useState<dayjs.Dayjs>(
//     dayjs(new Date())
//   );
//   const [toDate, setToDate] = React.useState<dayjs.Dayjs>(dayjs(new Date()));
//   const [getDays, setGetDays] = React.useState<number>(0);
//   React.useEffect(() => {
//     function calculateDays() {
//       let timeDiff: number =
//         toDate.toDate().getTime() - fromDate.toDate().getTime();
//       timeDiff /= 1000 * 60 * 60 * 24;
//       console.log("The time difference is ", Math.round(timeDiff));
//       setGetDays(Math.round(timeDiff));
//     }
//     calculateDays();
//   }, [fromDate, toDate]);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       {getDays !== 0 && <p>The days are : {getDays}</p>}
//       <DemoContainer
//         components={["DatePicker", "DesktopDatePicker", "MobileDatePicker"]}
//       >
//         <DemoItem label="FROM">
//           <MobileDatePicker
//             defaultValue={dayjs(new Date())}
//             value={fromDate}
//             onChange={(newDate: dayjs.Dayjs | null) => {
//               if (newDate) {
//                 setFromDate(newDate);
//               } else {
//                 setFromDate(dayjs(new Date()));
//               }
//             }}
//           />
//         </DemoItem>
//         <DemoItem label="TO">

//           <MobileDatePicker
//             defaultValue={dayjs(new Date())}
//             value={toDate}
//             onChange={(newDate: dayjs.Dayjs | null) => {
//               if (newDate) {
//                 setToDate(newDate);
//               } else {
//                 setToDate(dayjs(new Date()));
//               }
//             }}
//           />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

// export default function TimeSlot() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DateRangePicker']}>
//         <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { MobileDateRangePicker } from "@mui/x-date-pickers-pro/MobileDateRangePicker";
import { DateRange } from "@mui/x-date-pickers-pro";
interface TimeSlotProps {
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  setGetDays: React.Dispatch<React.SetStateAction<number>>;
}
export default function TimeSlot({
  setStartDate,
  setEndDate,
  setGetDays,
}: TimeSlotProps) {
  const [fromDate, setFromDate] = React.useState<dayjs.Dayjs>(
    dayjs(new Date())
  );
  const [toDate, setToDate] = React.useState<dayjs.Dayjs>(dayjs(new Date()));
  React.useEffect(() => {
    function calculateDays() {
      let timeDiff: number =
        toDate.toDate().getTime() - fromDate.toDate().getTime();
      timeDiff /= 1000 * 60 * 60 * 24;
      console.log("The time difference is ", Math.round(timeDiff));
      setGetDays(Math.round(timeDiff));
      setStartDate(fromDate.toDate());
      setEndDate(toDate.toDate());
    }
    calculateDays();
  }, [fromDate, toDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["MobileDateRangePicker"]}>
        <DemoItem
          label="Select Your Booking Slot"
          component="MobileDateRangePicker"
        >
          <MobileDateRangePicker
            defaultValue={[dayjs(new Date()), dayjs(new Date())]}
            onChange={(newValue: DateRange<dayjs.Dayjs> | null) => {
              if (
                newValue !== null &&
                newValue[0] !== null &&
                newValue[1] !== null
              ) {
                setFromDate(newValue[0]);
                setToDate(newValue[1]);
              } else {
                setFromDate(dayjs(new Date()));
                setToDate(dayjs(new Date()));
              }
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}