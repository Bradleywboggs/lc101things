let response = {
  message: "My message Name",
  results: [{}],
};

let msg = new Message("My message Name", [
  new Command("MODE_CHANGE", "LOW_POWER"),
]);
