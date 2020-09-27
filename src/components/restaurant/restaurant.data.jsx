const restaurants = [
  {
    id: 1,
    name: "Restaurant Nonya",
    address: "151 Rue Bernard O, Montréal, QC H2T 2K3, Canada",
    phone: "+15148759998",
    location: {
      lat: 45.5254798,
      lng: -73.6040783,
    },
    open_hours: [
      {
        day: "Monday",
        hours: "5 - 9PM",
      },
      {
        day: "Tuesday",
        hours: "5 - 9PM",
      },
      {
        day: "Wednesday",
        hours: "5 - 9PM",
      },
      {
        day: "Thursday",
        hours: "5 - 9PM",
      },
      {
        day: "Friday",
        hours: "5 - 9PM",
      },
      {
        day: "Saturday",
        hours: "5 - 9PM",
      },
      {
        day: "Sunday",
        hours: "5 - 9PM",
      },
    ],
    photos: [
      "https://images.unsplash.com/photo-1525148341418-5c2ea406191c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      "https://images.unsplash.com/photo-1551530078-379240770349?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    ],
    gender: "Indonesian",
    price_min: 30,
    price_max: 300,
    rating: 4.3,
  },
  {
    id: 2,
    name: "Marathon Souvlaki Express",
    address: "3940 Boul Notre-Dame, Laval, QC H7W 1S7, Canada",
    phone: "+14506819449",
    location: {
      lat: 45.5568372,
      lng: -74.2893406,
    },
    open_hours: [
      {
        day: "Monday",
        hours: "5 - 9PM",
      },
      {
        day: "Tuesday",
        hours: "5 - 9PM",
      },
      {
        day: "Wednesday",
        hours: "5 - 9PM",
      },
      {
        day: "Thursday",
        hours: "5 - 9PM",
      },
      {
        day: "Friday",
        hours: "5 - 9PM",
      },
      {
        day: "Saturday",
        hours: "5 - 9PM",
      },
      {
        day: "Sunday",
        hours: "5 - 9PM",
      },
    ],
    photos: [
      "https://images.unsplash.com/photo-1563551281520-cf166ad529ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      "https://images.unsplash.com/photo-1498491751984-14acb85d7d90?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    ],
    gender: "Greek",
    price_min: 30,
    price_max: 300,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Restaurant Sushi Queen",
    address:
      "2871 Boulevard des Promenades, Sainte-Marthe-sur-le-Lac, QC J0N 1P0, Canada",
    phone: "+14504131110",
    location: {
      lat: 45.5254798,
      lng: -73.6040783,
    },
    open_hours: [
      {
        day: "Monday",
        hours: "5 - 9PM",
      },
      {
        day: "Tuesday",
        hours: "5 - 9PM",
      },
      {
        day: "Wednesday",
        hours: "5 - 9PM",
      },
      {
        day: "Thursday",
        hours: "5 - 9PM",
      },
      {
        day: "Friday",
        hours: "5 - 9PM",
      },
      {
        day: "Saturday",
        hours: "5 - 9PM",
      },
      {
        day: "Sunday",
        hours: "5 - 9PM",
      },
    ],
    photos: [
      "https://images.unsplash.com/photo-1540086015396-f0b458832b38?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      "https://images.unsplash.com/photo-1531973904483-02b6311f3d90?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    ],
    gender: ["Sushi", "Japanese"],
    price_min: 30,
    price_max: 400,
    rating: 4,
  },
  {
    id: 4,
    name: "Candide",
    address: "551 Rue Saint-Martin, Montréal, QC H3J 2L6, Canada",
    phone: "+15144472717",
    location: {
      lat: 45.5254798,
      lng: -73.6040783,
    },
    open_hours: [
      {
        day: "Monday",
        hours: "5 - 9PM",
      },
      {
        day: "Tuesday",
        hours: "5 - 9PM",
      },
      {
        day: "Wednesday",
        hours: "5 - 9PM",
      },
      {
        day: "Thursday",
        hours: "5 - 9PM",
      },
      {
        day: "Friday",
        hours: "5 - 9PM",
      },
      {
        day: "Saturday",
        hours: "5 - 9PM",
      },
      {
        day: "Sunday",
        hours: "5 - 9PM",
      },
    ],
    photos: [
      "https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    ],
    gender: "LGBTQ friendly",
    price_min: 40,
    price_max: 400,
    rating: 4.1,
  },
  {
    id: 5,
    name: "Patina Restaurant",
    address:
      "The Walt Disney Concert Hall, 141 S Grand Ave, Los Angeles, CA 90012",
    phone: "+12139723331",
    location: {
      lat: 45.5254798,
      lng: -73.6040783,
    },
    open_hours: [
      {
        day: "Monday",
        hours: "5 - 9PM",
      },
      {
        day: "Tuesday",
        hours: "5 - 9PM",
      },
      {
        day: "Wednesday",
        hours: "5 - 9PM",
      },
      {
        day: "Thursday",
        hours: "5 - 9PM",
      },
      {
        day: "Friday",
        hours: "5 - 9PM",
      },
      {
        day: "Saturday",
        hours: "5 - 9PM",
      },
      {
        day: "Sunday",
        hours: "5 - 9PM",
      },
    ],
    photos: [
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1592148790400-db075b742582?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    ],
    gender: "LGBTQ friendly",
    price_min: 140,
    price_max: 600,
    rating: 4.6,
  },
];

export default restaurants;
