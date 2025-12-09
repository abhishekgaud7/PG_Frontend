// Mock data for development - will be replaced with real API calls

// Popular areas by city
export const popularAreasByCity = {
    'Mandi': ['Kamand', 'Paddal', 'Sarkaghat', 'Joginder Nagar', 'Sundar Nagar'],
    'Shimla': ['Mall Road', 'Lakkar Bazaar', 'Sanjauli', 'Totu', 'Summer Hill'],
    'Chandigarh': ['Sector 17', 'Sector 22', 'Sector 35', 'Panjab University', 'Industrial Area'],
    'Delhi': ['Connaught Place', 'Karol Bagh', 'Laxmi Nagar', 'Dwarka', 'Rohini'],
    'Mumbai': ['Andheri', 'Bandra', 'Powai', 'Thane', 'Borivali'],
    'Bangalore': ['Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City', 'HSR Layout']
};

export const mockProperties = [
    {
        id: 1,
        title: 'Sunview Girls PG',
        type: 'PG',
        gender: 'Female',
        city: 'Mandi',
        area: 'Kamand',
        address: 'Near IIT Mandi, Kamand',
        pricePerMonth: 6500,
        deposit: 3000,
        availableBeds: 10,
        amenities: ['WiFi', 'Food', 'Laundry', 'AC', 'Hot Water'],
        description: 'Comfortable and safe PG for girls near IIT Mandi. All modern amenities included with homely food.',
        images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'],
        owner: {
            id: 1,
            name: 'Annu Bhai',
            phone: '+91 98765 43210',
            verified: true
        }
    },
    {
        id: 2,
        title: 'Cozy Guest House',
        type: 'Guest House',
        gender: 'Any',
        city: 'Shimla',
        area: 'Mall Road',
        address: 'Mall Road, Shimla',
        pricePerMonth: 9000,
        deposit: 5000,
        availableBeds: 5,
        amenities: ['WiFi', 'Parking', 'Hot Water', 'TV'],
        description: 'Beautiful guest house in the heart of Shimla with mountain views.',
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
        owner: {
            id: 2,
            name: 'Priya Sharma',
            phone: '+91 98765 43211',
            verified: true
        }
    },
    {
        id: 3,
        title: 'Modern Boys Hostel',
        type: 'PG',
        gender: 'Male',
        city: 'Mandi',
        area: 'Paddal',
        address: 'Paddal, Mandi',
        pricePerMonth: 5500,
        deposit: 2500,
        availableBeds: 15,
        amenities: ['WiFi', 'Food', 'Gym', 'Hot Water', 'Study Room'],
        description: 'Spacious hostel for boys with gym and study facilities.',
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
        owner: {
            id: 1,
            name: 'Harsh Kumar',
            phone: '+91 98765 43210',
            verified: true
        }
    },
    {
        id: 4,
        title: 'Elite Girls Accommodation',
        type: 'PG',
        gender: 'Female',
        city: 'Chandigarh',
        area: 'Sector 17',
        address: 'Sector 17, Chandigarh',
        pricePerMonth: 8500,
        deposit: 4000,
        availableBeds: 8,
        amenities: ['WiFi', 'Food', 'AC', 'Laundry', 'Security'],
        description: 'Premium PG for working women with 24/7 security.',
        images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
        owner: {
            id: 3,
            name: 'Anjali Verma',
            phone: '+91 98765 43212',
            verified: true
        }
    },
    {
        id: 5,
        title: 'Budget Friendly Stay',
        type: 'Guest House',
        gender: 'Any',
        city: 'Mandi',
        area: 'Sarkaghat',
        address: 'Sarkaghat Road, Mandi',
        pricePerMonth: 4500,
        deposit: 2000,
        availableBeds: 12,
        amenities: ['WiFi', 'Parking', 'Hot Water'],
        description: 'Affordable accommodation for students and travelers.',
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'],
        owner: {
            id: 2,
            name: 'Priya Sharma',
            phone: '+91 98765 43211',
            verified: true
        }
    },
    {
        id: 6,
        title: 'Luxury Co-living Space',
        type: 'PG',
        gender: 'Any',
        city: 'Shimla',
        area: 'Lakkar Bazaar',
        address: 'Lakkar Bazaar, Shimla',
        pricePerMonth: 12000,
        deposit: 6000,
        availableBeds: 6,
        amenities: ['WiFi', 'Food', 'AC', 'Gym', 'Laundry', 'Housekeeping'],
        description: 'Premium co-living space with all modern amenities and services.',
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
        owner: {
            id: 3,
            name: 'Anjali Verma',
            phone: '+91 98765 43212',
            verified: true
        }
    }
];

export const mockBookings = [
    {
        id: 1,
        property: mockProperties[0],
        checkInDate: '2026-01-10',
        checkOutDate: '2026-02-10',
        status: 'pending',
        createdAt: '2025-12-05'
    },
    {
        id: 2,
        property: mockProperties[1],
        checkInDate: '2026-01-15',
        checkOutDate: '2026-03-15',
        status: 'confirmed',
        createdAt: '2025-12-01'
    },
    {
        id: 3,
        property: mockProperties[2],
        checkInDate: '2025-12-20',
        checkOutDate: '2026-01-20',
        status: 'cancelled',
        createdAt: '2025-11-25'
    }
];

// Mock users
export const mockUsers = [
    {
        id: 1,
        name: 'Harsh Kumar',
        email: 'harsh@example.com',
        phone: '+91 98765 43210',
        role: 'owner'
    },
    {
        id: 2,
        name: 'Rahul Singh',
        email: 'rahul@example.com',
        phone: '+91 98765 43213',
        role: 'user'
    }
];
