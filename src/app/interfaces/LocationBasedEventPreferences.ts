import { Event } from './Event';

class LocationBasedEventPreferences {
    // Properties for location-based preferences
    private radius: number;
    private preferredLocations: string[] = [];

    constructor(radius: number = 0, preferredLocations: string[] = []) {
        this.radius = radius;
        this.preferredLocations = preferredLocations;
    }

    // Method to update the location preferences
    public updateLocationPreferences(radius: number, locations: string[]): void {
        this.radius = radius;
        this.preferredLocations = locations;
    }

    // Method to get recommended events based on location
    public getRecommendedEventsByLocation(): Event[] {
        return [];
    }
}

export default LocationBasedEventPreferences;
