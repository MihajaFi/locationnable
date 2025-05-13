
use std::collections::HashMap;
use std::io::{self, Write};
use chrono::{NaiveDate, Duration};

#[derive(Debug, Clone, PartialEq)]
enum LocationType {
    Vehicle,
    Property,
}

#[derive(Debug, Clone)]
struct Location {
    id: u32,
    name: String,
    location_type: LocationType,
    available: bool,
}

#[derive(Debug, Clone)]
struct Reservation {
    location_id: u32,
    start_date: NaiveDate,
    end_date: NaiveDate,
    duration: i64,
}

struct LocationManager {
    locations: HashMap<u32, Location>,
    reservations: Vec<Reservation>,
}

impl LocationManager {
    fn new() -> Self {
        Self { locations: HashMap::new(), reservations: Vec::new() }
    }

    fn add_location(&mut self, id: u32, name: &str, location_type: LocationType) {
        self.locations.insert(id, Location {
            id,
            name: name.to_string(),
            location_type,
            available: true,
        });
    }

    fn list_locations(&self) {
        for location in self.locations.values() {
            println!("ID: {}, Name: {}, Available: {}", location.id, location.name, location.available);
        }
    }

    fn create_reservation(&mut self, location_id: u32, start_date: NaiveDate, end_date: NaiveDate) -> Result<(), String> {
        if let Some(location) = self.locations.get(&location_id) {
            if !location.available { return Err("Location not available.".to_string()); }

            for res in &self.reservations {
                if res.location_id == location_id &&
                   (start_date <= res.end_date && end_date >= res.start_date) {
                    return Err("Location already reserved in this period.".to_string());
                }
            }

            let duration = (end_date - start_date).num_days();
            if duration < 1 { return Err("Duration must be at least 1 day.".to_string()); }

            self.reservations.push(Reservation { location_id, start_date, end_date, duration });
            Ok(())
        } else {
            Err("Location not found.".to_string())
        }
    }
}

fn main() {
    let mut manager = LocationManager::new();

    manager.add_location(1, "Toyota Corolla", LocationType::Vehicle);
    manager.add_location(2, "Appartement T3", LocationType::Property);

    println!("--- Location Manager CLI ---");
    manager.list_locations();

    let start_date = NaiveDate::from_ymd_opt(2025, 4, 10).unwrap();
    let end_date = NaiveDate::from_ymd_opt(2025, 4, 12).unwrap();

    match manager.create_reservation(1, start_date, end_date) {
        Ok(_) => println!("Reservation confirmed."),
        Err(e) => println!("Error: {}", e),
    }
}
