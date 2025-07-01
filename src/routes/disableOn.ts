const routeDisableOn: Readonly<Record<string, ReadonlyArray<string>>> = {
  "/learn": ["gameStart", "reviewStart", "winnersAnnounced"],
  "/raffle": ["reviewStart", "winnersAnnounced"],
  "/businesses": ["preGame", "reviewStart", "winnersAnnounced"],
  "/results": [] // Open all the time for the demo.
};

export default routeDisableOn;
