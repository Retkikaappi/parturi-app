export interface Extra {
  name: string;
  price: number;
}

export interface Service {
  type:
    | 'Kampaamoleikkaus'
    | 'Parturileikkaus'
    | 'Lasten hiustenleikkaus'
    | 'Koneajo';
}

export interface Order {
  service: Service;
  extras?: Extra[];
  price: number;
  date?: string;
  hour?: string;
}

export interface FinalOrder extends Order {
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface Calendar {
  date: string;
  hours: [{ hour: string; available: boolean }];
}
