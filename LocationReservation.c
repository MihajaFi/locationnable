#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define MAX_LOCATIONS 100
#define MAX_RESERVATIONS 100

typedef enum { VEHICLE, PROPERTY } LocationType;

typedef struct {
    int id;
    char name[100];
    LocationType type;
    int available;
} Location;

typedef struct {
    int locationId;
    struct tm startDate;
    struct tm endDate;
    int durationInDays;
} Reservation;

Location locations[MAX_LOCATIONS];
Reservation reservations[MAX_RESERVATIONS];
int locationCount = 0, reservationCount = 0;

void addLocation(int id, const char *name, LocationType type) {
    if (locationCount < MAX_LOCATIONS) {
        locations[locationCount++] = (Location){id, "", type, 1};
        strcpy(locations[locationCount - 1].name, name);
    }
}

void listLocations() {
    for (int i = 0; i < locationCount; i++) {
        printf("ID: %d, Name: %s, Available: %s\n", locations[i].id, locations[i].name, locations[i].available ? "Yes" : "No");
    }
}

int isReserved(int locationId, struct tm startDate, struct tm endDate) {
    for (int i = 0; i < reservationCount; i++) {
        if (reservations[i].locationId == locationId) {
            if (difftime(mktime(&endDate), mktime(&reservations[i].startDate)) >= 0 &&
                difftime(mktime(&startDate), mktime(&reservations[i].endDate)) <= 0) {
                return 1;
            }
        }
    }
    return 0;
}

void createReservation(int locationId, struct tm startDate, struct tm endDate) {
    for (int i = 0; i < locationCount; i++) {
        if (locations[i].id == locationId && locations[i].available) {
            if (isReserved(locationId, startDate, endDate)) {
                printf("Error: Location already reserved.\n");
                return;
            }

            int duration = (int)difftime(mktime(&endDate), mktime(&startDate)) / (60 * 60 * 24);
            if (duration < 1) {
                printf("Error: Duration must be at least 1 day.\n");
                return;
            }

            reservations[reservationCount++] = (Reservation){locationId, startDate, endDate, duration};
            printf("Reservation confirmed for %s for %d days.\n", locations[i].name, duration);
            return;
        }
    }
    printf("Error: Location not found or unavailable.\n");
}

int main() {
    addLocation(1, "Toyota Corolla", VEHICLE);
    addLocation(2, "Appartement T3", PROPERTY);

    printf("--- Location Manager CLI ---\n");
    listLocations();

    struct tm startDate = {0}, endDate = {0};
    startDate.tm_year = 2025 - 1900; startDate.tm_mon = 4 - 1; startDate.tm_mday = 10;
    endDate.tm_year = 2025 - 1900; endDate.tm_mon = 4 - 1; endDate.tm_mday = 12;

    createReservation(1, startDate, endDate);

    return 0;
}
