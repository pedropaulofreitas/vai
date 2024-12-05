import { Category } from './Category';
import { Event } from './Event';

class CategoryBasedEventPreferences {
    // List of preferred categories for event recommendations
    private preferredCategories: Category[] = [];

    // Method to update the preferred categories
    public updateCategoryPreferences(categories: Category[]): void {
        this.preferredCategories = categories;
    }

    // Method to get recommended events based on preferred categories
    public getRecommendedEventsByCategory(): Event[] {
        return [];
    }
}

export default CategoryBasedEventPreferences;
