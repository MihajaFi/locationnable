const readline = require("readline");
const LocationService = require("./services/LocationService");
const ReservationService = require("./services/ReservationService");
const { LocationType } = require("./models/Location");

const locationService = new LocationService();
const reservationService = new ReservationService(locationService);

locationService.addLocation({ id: 1, name: "Toyota Corolla", type: LocationType.Vehicle, available: true });
locationService.addLocation({ id: 2, name: "Appartement T3", type: LocationType.Property, available: true });

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function mainMenu() {
  console.log("\n🚀 Location Manager CLI");
  console.log("1. List locations");
  console.log("2. Make a reservation");
  console.log("3. List reservations");
  console.log("4. Quit");
  rl.question("👉 Choose an option: ", (option) => {
    switch (option) {
      case "1":
        console.log(locationService.listLocations());
        mainMenu();
        break;
      case "2":
        rl.question("📍 Location ID: ", (id) => {
          rl.question("📅 Start date (YYYY-MM-DD): ", (start) => {
            rl.question("📅 End date (YYYY-MM-DD): ", (end) => {
              try {
                const message = reservationService.createReservation(parseInt(id), new Date(start), new Date(end));
                console.log(message);
              } catch (e) { console.error(e.message); }
              mainMenu();
            });
          });
        });
        break;
      case "3":
        console.log(reservationService.listReservations());
        mainMenu();
        break;
      case "4":
        rl.close();
        console.log("👋 Goodbye!");
        break;
      default:
        console.log("❌ Invalid option.");
        mainMenu();
    }
  });
}

mainMenu();
