import { Restaurant } from '@/types';

export const moonlightData: Restaurant = {
  id: 'moonlight',
  slug: 'moonlight',
  name: 'Moonlight Cafe & Restaurant',
  tagline: 'Explore Menu & Order Online',
  description: 'Your favorite cafe in Chiplun',
  emoji: '🌙',
  whatsappNumber: '+910000000000',
  theme: {
    primary: '#0F172A',
    secondary: '#F8FAFC',
    accent: '#D4A853',
    headerBg: '#0F172A',
    headerText: '#F8FAFC'
  },
  categories: [
    {
      id: 'beverages',
      name: 'Beverages',
      items: [
        {
          id: 'ml-bev-1',
          name: 'Davidoff Coffee',
          price: 50,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-bev-2',
          name: 'Cold Coffee',
          price: 80,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-bev-3',
          name: 'Mint Mojito',
          price: 80,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-bev-4',
          name: 'Chocolate Shake',
          price: 110,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-bev-5',
          name: 'Vanilla Shake',
          price: 90,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-bev-6',
          name: 'Oreo Shake',
          price: 120,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-bev-7',
          name: 'Lemon Ice-Tea',
          price: 80,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      id: 'snacks',
      name: 'Snacks',
      items: [
        {
          id: 'ml-snk-1',
          name: 'French Fries',
          price: 100,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-snk-2',
          name: 'Peri-Peri Fries',
          price: 110,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-snk-3',
          name: 'Cheese Fries',
          price: 120,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-snk-4',
          name: 'Cheese Garlic Bread',
          price: 120,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-snk-5',
          name: 'Chicken Cheese Garlic Bread',
          price: 140,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-snk-6',
          name: 'Chicken Loaded Fries Bowl',
          price: 249,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-snk-7',
          name: 'Corn Cheese Balls (6pcs)',
          price: 120,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-snk-8',
          name: 'Veg Fingers (6pcs)',
          price: 140,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      id: 'maggie',
      name: 'Maggie',
      items: [
        {
          id: 'ml-mag-1',
          name: 'Plain Maggi',
          price: 80,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-mag-2',
          name: 'Masala Veg Maggi',
          price: 99,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-mag-3',
          name: 'Masala Chicken Maggi',
          price: 140,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-mag-4',
          name: 'Egg Masala Maggi',
          price: 120,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-mag-5',
          name: 'Veg Korean Maggi',
          price: 140,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-mag-6',
          name: 'Chicken Korean Maggi',
          price: 160,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      id: 'veg-sandwich',
      name: 'Veg Sandwich',
      items: [
        {
          id: 'ml-vs-1',
          name: 'Bombay Masala Toast',
          price: 120,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-vs-2',
          name: 'Veg Cheese Grill',
          price: 90,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-vs-3',
          name: 'Veg Club Sandwich',
          price: 130,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-vs-4',
          name: 'Paneer Tikka Sandwich',
          price: 140,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-vs-5',
          name: 'Cheese Corn Sandwich',
          price: 90,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      id: 'non-veg-sandwich',
      name: 'Non-Veg Sandwich',
      items: [
        {
          id: 'ml-nvs-1',
          name: 'Chicken Cheese Grill',
          price: 120,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-nvs-2',
          name: 'Chicken Club Sandwich',
          price: 150,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-nvs-3',
          name: 'Mayo Chicken Sandwich',
          price: 130,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-nvs-4',
          name: 'Classic Egg Sandwich',
          price: 120,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-nvs-5',
          name: 'Tandoori Chicken Sandwich',
          price: 160,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      id: 'burgers',
      name: 'Burgers',
      items: [
        {
          id: 'ml-brg-1',
          name: 'Classic Veg Cheese Burger',
          price: 120,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-brg-2',
          name: 'Spicy Paneer Burger',
          price: 140,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-brg-3',
          name: 'Fried Chicken Burger',
          price: 140,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-brg-4',
          name: 'Grilled Chicken Burger',
          price: 160,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-brg-5',
          name: 'Double Patty Chicken Burger',
          price: 190,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      id: 'pasta',
      name: 'Pasta',
      items: [
        {
          id: 'ml-pst-1',
          name: 'Masala Veg Pasta',
          price: 130,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-pst-2',
          name: 'Masala Chicken Pasta',
          price: 130,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-pst-3',
          name: 'Veg Alfredo Pasta',
          price: 130,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-pst-4',
          name: 'Chicken Alfredo Pasta',
          price: 150,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      id: 'pizza-veg',
      name: 'Pizza (Veg)',
      items: [
        {
          id: 'ml-pv-1',
          name: 'Plain Cheese Pizza',
          price: 180,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-pv-2',
          name: 'Cheese and Corn',
          price: 220,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-pv-3',
          name: 'Farm Fresh Pizza',
          price: 250,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-pv-4',
          name: 'Peppy Paneer Pizza',
          price: 270,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-pv-5',
          name: 'Four Flavour Pizza (Veg)',
          price: 280,
          isVeg: true,
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      id: 'pizza-chicken',
      name: 'Pizza (Chicken)',
      items: [
        {
          id: 'ml-pc-1',
          name: 'Mexican Chicken Pizza',
          price: 210,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-pc-2',
          name: 'BBQ Chicken Pizza',
          price: 240,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-pc-3',
          name: 'Chicken Tikka Pizza',
          price: 270,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-pc-4',
          name: 'Chicken Mushroom Pizza',
          price: 230,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop'
        },
        {
          id: 'ml-pc-5',
          name: 'Four Flavour Pizza (Chicken)',
          price: 300,
          isVeg: false,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop'
        }
      ]
    }
  ]
};
