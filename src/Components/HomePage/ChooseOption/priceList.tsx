export interface PriceLists {
  venueName: string;
  venuePrice: number;
}
const priceList: PriceLists[] = [
  {
    venueName: "Ground",
    venuePrice: 10,
  },
  {
    venueName: "Hall",
    venuePrice: 20,
  },
  {
    venueName: "Both",
    venuePrice: 25,
  },
];
export { priceList };
