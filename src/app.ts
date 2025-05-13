
import { LocationService } from "./services/LocationService";
import { ReservationService } from "./services/ReservationService";
import { LocationType } from "./models/Location";
import * as readline from "readline";
import { LocationNotFoundError, LocationUnavailableError, InvalidReservationDurationError, LocationAlreadyReservedError } from "./utils/error"; // Import des erreurs personnalisées

const locationService = new LocationService();
const reservationService = new ReservationService(locationService);

locationService.addLocation({
  id: 1,
  name: "Toyota Corolla",
  type: LocationType.Vehicle,
  available: true
});
locationService.addLocation({
  id: 2,
  name: "Appartement T3",
  type: LocationType.Property,
  available: true
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mainMenu() {
  console.log("\n🚀 Location Manager CLI");
  console.log("1. Lister les locations");
  console.log("2. Réserver une location");
  console.log("3. Lister les réservations");
  console.log("4. Quitter");
  rl.question("👉 Choisissez une option : ", (option) => {
    switch (option) {
      case "1":
        console.log(locationService.listLocations());
        mainMenu();
        break;
      case "2":
        rl.question("📍 Entrez l'ID de la location à réserver : ", (id) => {
          rl.question("📅 Entrez la date de début (YYYY-MM-DD) : ", (startDateStr) => {
            rl.question("📅 Entrez la date de fin (YYYY-MM-DD) : ", (endDateStr) => {
              const startDate = new Date(startDateStr);
              const endDate = new Date(endDateStr);

              try {
                const message = reservationService.createReservation(
                  parseInt(id),
                  startDate,
                  endDate
                );
                console.log(message);
              } catch (error) {
                if (error instanceof LocationNotFoundError) {
                  console.error(error.message);
                } else if (error instanceof LocationUnavailableError) {
                  console.error(error.message);
                } else if (error instanceof InvalidReservationDurationError) {
                  console.error(error.message);
                } else if (error instanceof LocationAlreadyReservedError) {
                  console.error(error.message);
                } else {
                  console.error("Erreur inconnue :", error);
                }
              }
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
        console.log("👋 Au revoir !");
        rl.close();
        break;
      default:
        console.log("❌ Option invalide.");
        mainMenu();
        break;
    }
  });
}

mainMenu();
