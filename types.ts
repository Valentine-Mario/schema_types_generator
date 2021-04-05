
type hotel_bookingsProp = { 
type: string;
start_date: Date;
end_date: Date;
duration: number;
hotel_id: hotelsProp;
price: number;
roomType: string;
user: string;
no_of_rooms: number;
__v: number;
_id: string;
}

type reviewsProp = { 
comment: string;
hotel: string;
rating: number;
user: usersProp;
date: Date;
__v: number;
_id: string;
}

type receiptsProp = { 
images: Array<string>;
location: string;
date: Date;
user: usersProp;
__v: number;
_id: string;
}

type flightsProp = { 
destination_from: string;
destination_to: string;
departure_date: Date;
arrival_date: Date;
departure_time: string;
arrival_time: string;
airline: airlinesProp;
class: string;
price: string;
__v: number;
departure_airport: string;
arrival_airport: string;
_id: string;
}

type invited_usersProp = { 
password: string;
date_created: Date;
limit: string;
limit_amount: null;
user: usersProp;
email: string;
name: string;
__v: number;
_id: string;
}

type user_bookingsProp = { 
type: string;
start_date: Date;
end_date: Date;
duration: number;
hotel_id: hotelsProp;
price: number;
roomType: string;
user: string;
no_of_rooms: number;
car_id: null;
quantity: string;
venue_id: null;
flight_id: null;
no_of_people: string;
pending: boolean;
declined: boolean;
__v: number;
_id: string;
}

type carsProp = { 
info: Array<string>;
requirements: Array<string>;
rates: Array<any>;
name: string;
image: string;
price: string;
supplier_location: string;
description: string;
__v: number;
_id: string;
}

type car_reviewsProp = { 
comment: string;
car: string;
rating: number;
user: usersProp;
date: Date;
__v: number;
_id: string;
}

type hotelsProp = { 
images: Array<string>;
information: Array<string>;
interest: Array<string>;
rates: Array<any>;
rooms: Array<object>;
name: string;
location: string;
description: string;
__v: number;
_id: string;
}

type email_notificationsProp = { 
email: string;
date: Date;
__v: number;
_id: string;
}

type airlinesProp = { 
name: string;
image: string;
__v: number;
_id: string;
}

type employeesProp = { 
employees: Array<string>;
user: usersProp;
name: string;
__v: number;
_id: string;
}

type car_bookingsProp = { 
type: string;
start_date: Date;
end_date: Date;
duration: number;
car_id: carsProp;
user: string;
price: number;
quantity: string;
__v: number;
_id: string;
}

type venuesProp = { 
images: Array<string>;
amenities: Array<string>;
rates: Array<any>;
name: string;
location: string;
description: string;
availability: string;
pricing: string;
capacity: string;
type: string;
__v: number;
_id: string;
}

type venue_bookingsProp = { 
type: string;
start_date: Date;
end_date: Date;
duration: number;
venue_id: venuesProp;
user: string;
price: number;
__v: number;
_id: string;
}

type venue_reviewsProp = { 
comment: string;
venue: string;
rating: number;
user: usersProp;
date: Date;
__v: number;
_id: string;
}

type paymentsProp = { 
card_no: string;
date_created: Date;
user: usersProp;
__v: number;
_id: string;
}

type usersProp = { 
verified: boolean;
access: number;
pics: string;
name: string;
email: string;
password: string;
auth_id: null;
date_created: Date;
account_type: string;
__v: number;
_id: string;
}

type agenciesProp = { 
logo: string;
created_at: Date;
email: string;
name: string;
address: string;
phone: string;
priviledge: number;
__v: number;
_id: string;
}

type roomsProp = { 
perks: Array<string>;
images: string;
price: string;
available: number;
type: string;
__v: number;
_id: string;
}

type flight_bookingsProp = { 
type: string;
flight_id: flightsProp;
user: string;
no_of_people: string;
price: number;
__v: number;
_id: string;
}

type bookingsProp = { 
type: string;
details: string;
start_date: string;
end_date: string;
__v: number;
_id: string;
}

