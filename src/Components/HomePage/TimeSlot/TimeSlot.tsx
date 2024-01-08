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
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setGetDays: React.Dispatch<React.SetStateAction<number>>;
  currMonthCalendar: number;
  setCurrMonthCalendar: React.Dispatch<React.SetStateAction<number>>;
  currYearCalendar: string;
  setCurrYearCalendar: React.Dispatch<React.SetStateAction<string>>;
  setAvailableDates: React.Dispatch<React.SetStateAction<number[]>>;
  availableDates: number[];
}
export default function TimeSlot({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setGetDays,
  currMonthCalendar,
  currYearCalendar,
  setCurrMonthCalendar,
  setCurrYearCalendar,
  setAvailableDates,
  availableDates,
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
      setStartDate(dayjs(fromDate.toDate()).format("YYYY-MM-DD"));
      setEndDate(dayjs(toDate.toDate()).format("YYYY-MM-DD"));
    }

    calculateDays();
  }, [fromDate, toDate]);

  function disableDates(day: dayjs.Dayjs, position: "start" | "end") {
    const disabledDates: dayjs.Dayjs[] = [];
    availableDates?.forEach((myDate: number) => {
      const formattedDate: string = `${currYearCalendar}-${(
        currMonthCalendar + 1
      )
        .toString()
        .padStart(2, "0")}-${myDate.toString().padStart(2, "0")}`;
      disabledDates.push(dayjs(formattedDate));
    });
    // Check if the current day is in the disabled dates array
    const isDisabled = disabledDates.some((disabledDate) =>
      day.isSame(disabledDate)
    );

    const formattedDate: string = `${currYearCalendar}-${(currMonthCalendar + 1)
      .toString()
      .padStart(2, "0")}-${availableDates[0]?.toString().padStart(2, "0")}`;

    if (
      position === "start" &&
      isDisabled &&
      day.isAfter(dayjs(formattedDate))
    ) {
      return true;
    }

    return isDisabled;
  }
  const [definedValue, setDefinedValue] = React.useState<dayjs.Dayjs[]>([
    dayjs(new Date()),
    dayjs(new Date()),
  ]);
  function checkDateRange(firstDay: dayjs.Dayjs, lastDay: dayjs.Dayjs) {
    const availability: number[] = availableDates.filter((myDate: number) => {
      return (
        myDate >= Number(firstDay?.date().toString()) &&
        myDate <= Number(lastDay?.date().toString())
      );
    });
    if (
      availability?.length > 0 ||
      availability?.includes(Number(firstDay?.date().toString())) ||
      availability.includes(Number(lastDay?.date().toString()))
    ) {
      alert("The dates are already booked");
      setDefinedValue([dayjs(new Date()), dayjs(new Date())]);
    }
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["MobileDateRangePicker"]}>
        <DemoItem
          label="Select Your Booking Slot"
          component="MobileDateRangePicker"
        >
          <MobileDateRangePicker
            value={[definedValue[0], definedValue[1]]}
            onMonthChange={(newMonth: dayjs.Dayjs) => {
              console.log("The new month is ", newMonth);
              setCurrMonthCalendar(newMonth.toDate().getMonth());
              setCurrYearCalendar(newMonth.toDate().getFullYear().toString());
            }}
            onChange={(newValue: DateRange<dayjs.Dayjs> | null) => {
              if (
                newValue !== null &&
                newValue[0] !== null &&
                newValue[1] !== null
              ) {
                setFromDate(newValue[0]);
                setToDate(newValue[1]);
                checkDateRange(newValue[0], newValue[1]);
              } else {
                setFromDate(dayjs(new Date()));
                setToDate(dayjs(new Date()));
              }
            }}
            shouldDisableDate={disableDates}
            onAccept={(newValue) => {
              if (
                newValue !== null &&
                newValue[0] !== null &&
                newValue[1] !== null
              ) {
                checkDateRange(newValue[0], newValue[1]);
              }
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
