export interface Activity {
    id: string;
    name: string;
    description: string;
    type: "sightseeing" | "food" | "adventure" | "relax" | "transport" | "accommodation" | "other";
    city: string;
    country: string;
    price: number;
    priceCategory: "$" | "$$" | "$$$";
    image: string;
    rating: number;
}

export const ACTIVITIES: Activity[] = [
    // Paris Activities
    { id: "1", name: "Eiffel Tower Visit", description: "Iconic iron lattice tower with stunning city views", type: "sightseeing", city: "Paris", country: "France", price: 30, priceCategory: "$$", image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
    { id: "2", name: "Louvre Museum Tour", description: "World's largest art museum and historic monument", type: "sightseeing", city: "Paris", country: "France", price: 20, priceCategory: "$", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
    { id: "3", name: "Seine River Cruise", description: "Romantic boat ride through the heart of Paris", type: "relax", city: "Paris", country: "France", price: 45, priceCategory: "$$", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800", rating: 4.7 },
    { id: "4", name: "French Cooking Class", description: "Learn to cook authentic French cuisine", type: "food", city: "Paris", country: "France", price: 120, priceCategory: "$$$", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800", rating: 4.9 },

    // Tokyo Activities
    { id: "5", name: "Tokyo Skytree", description: "Tallest structure in Japan with panoramic views", type: "sightseeing", city: "Tokyo", country: "Japan", price: 25, priceCategory: "$$", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
    { id: "6", name: "Sushi Making Workshop", description: "Master the art of sushi with expert chefs", type: "food", city: "Tokyo", country: "Japan", price: 80, priceCategory: "$$", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
    { id: "7", name: "Mount Fuji Day Trip", description: "Guided tour to Japan's iconic mountain", type: "adventure", city: "Tokyo", country: "Japan", price: 150, priceCategory: "$$$", image: "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?auto=format&fit=crop&q=80&w=800", rating: 5.0 },
    { id: "8", name: "Traditional Tea Ceremony", description: "Experience authentic Japanese tea culture", type: "relax", city: "Tokyo", country: "Japan", price: 40, priceCategory: "$$", image: "https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&q=80&w=800", rating: 4.7 },

    // New York Activities
    { id: "9", name: "Statue of Liberty Tour", description: "Visit America's iconic symbol of freedom", type: "sightseeing", city: "New York", country: "USA", price: 35, priceCategory: "$$", image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
    { id: "10", name: "Broadway Show", description: "World-class theater performance", type: "relax", city: "New York", country: "USA", price: 150, priceCategory: "$$$", image: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
    { id: "11", name: "Central Park Bike Tour", description: "Explore NYC's famous urban park on two wheels", type: "adventure", city: "New York", country: "USA", price: 50, priceCategory: "$$", image: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?auto=format&fit=crop&q=80&w=800", rating: 4.6 },
    { id: "12", name: "Food Tour in Brooklyn", description: "Taste the best of Brooklyn's food scene", type: "food", city: "New York", country: "USA", price: 90, priceCategory: "$$", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800", rating: 4.8 },

    // Rome Activities
    { id: "13", name: "Colosseum & Forum Tour", description: "Ancient Rome's most iconic landmarks", type: "sightseeing", city: "Rome", country: "Italy", price: 40, priceCategory: "$$", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
    { id: "14", name: "Vatican Museums", description: "World-renowned art collection and Sistine Chapel", type: "sightseeing", city: "Rome", country: "Italy", price: 30, priceCategory: "$$", image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
    { id: "15", name: "Pasta Making Class", description: "Learn traditional Italian pasta techniques", type: "food", city: "Rome", country: "Italy", price: 75, priceCategory: "$$", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
    { id: "16", name: "Vespa Tour", description: "Explore Rome like a local on a classic Vespa", type: "adventure", city: "Rome", country: "Italy", price: 100, priceCategory: "$$$", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800", rating: 4.7 },

    // London Activities
    { id: "17", name: "Tower of London", description: "Historic castle and Crown Jewels", type: "sightseeing", city: "London", country: "UK", price: 35, priceCategory: "$$", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800", rating: 4.7 },
    { id: "18", name: "Afternoon Tea Experience", description: "Traditional British tea with scones and sandwiches", type: "food", city: "London", country: "UK", price: 60, priceCategory: "$$", image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
    { id: "19", name: "Thames River Cruise", description: "Scenic boat ride past London's landmarks", type: "relax", city: "London", country: "UK", price: 30, priceCategory: "$", image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&q=80&w=800", rating: 4.6 },
    { id: "20", name: "Harry Potter Studio Tour", description: "Behind-the-scenes of the magical film series", type: "sightseeing", city: "London", country: "UK", price: 55, priceCategory: "$$", image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&q=80&w=800", rating: 5.0 },

    // Barcelona Activities
    { id: "21", name: "Sagrada Familia Tour", description: "Gaudí's masterpiece basilica", type: "sightseeing", city: "Barcelona", country: "Spain", price: 35, priceCategory: "$$", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
    { id: "22", name: "Tapas Cooking Class", description: "Learn to make authentic Spanish tapas", type: "food", city: "Barcelona", country: "Spain", price: 70, priceCategory: "$$", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
    { id: "23", name: "Beach Day at Barceloneta", description: "Relax on Barcelona's famous beach", type: "relax", city: "Barcelona", country: "Spain", price: 0, priceCategory: "$", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=800", rating: 4.5 },
    { id: "24", name: "Park Güell Walking Tour", description: "Explore Gaudí's colorful park", type: "sightseeing", city: "Barcelona", country: "Spain", price: 15, priceCategory: "$", image: "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?auto=format&fit=crop&q=80&w=800", rating: 4.7 },

    // Dubai Activities
    { id: "25", name: "Burj Khalifa Observation Deck", description: "World's tallest building with stunning views", type: "sightseeing", city: "Dubai", country: "UAE", price: 50, priceCategory: "$$", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
    { id: "26", name: "Desert Safari", description: "Thrilling dune bashing and camel rides", type: "adventure", city: "Dubai", country: "UAE", price: 100, priceCategory: "$$$", image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
    { id: "27", name: "Dubai Mall Shopping", description: "Luxury shopping at the world's largest mall", type: "relax", city: "Dubai", country: "UAE", price: 0, priceCategory: "$", image: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?auto=format&fit=crop&q=80&w=800", rating: 4.6 },
    { id: "28", name: "Traditional Emirati Dinner", description: "Authentic UAE cuisine experience", type: "food", city: "Dubai", country: "UAE", price: 80, priceCategory: "$$", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800", rating: 4.7 },
];

export function getUniqueTypes(): string[] {
    return Array.from(new Set(ACTIVITIES.map(a => a.type)));
}

export function getUniqueCities(): string[] {
    return Array.from(new Set(ACTIVITIES.map(a => a.city))).sort();
}
