import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { priceList, PriceLists } from "./priceList";
interface ChooseOptionProps {
  setSelectPrice: React.Dispatch<React.SetStateAction<number>>;
}
export default function ChooseOption({ setSelectPrice }: ChooseOptionProps) {
  const [venueName, setVenueName] = React.useState<string>("");
  console.log("Venue Name ", venueName);
  const handleChange = (event: SelectChangeEvent) => {
    setVenueName(event.target.value);
  };
  React.useEffect(() => {
    function getPrice() {
      const venueDetails: PriceLists[] = priceList.filter((item) => {
        return item.venueName === venueName;
      });
      if (venueDetails) {
        console.log(venueDetails[0]?.venuePrice);
        setSelectPrice(venueDetails[0]?.venuePrice);
      }
    }
    getPrice();
  }, [venueName]);

  return (
    <div>
      <FormControl required sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-required-label">
          Select Venue
        </InputLabel>

        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={venueName}
          label="Select Venue"
          onChange={handleChange}
        >
          {priceList.map((item: PriceLists) => {
            return (
              <MenuItem
                key={item.venueName + Math.random()}
                value={item.venueName}
              >
                {item.venueName}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </div>
  );
}
