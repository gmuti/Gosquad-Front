export interface Group {
  id?: string;
  name: string;
  members: string[];
  destination?: string;
  departureDate?: string;
  arrivalDate?: string;
  budget?: number;
  activities?: Activity[];
  profilePhoto?: string;
  documents?: string[];
  tickets?: string[];
  vaccination?: string[];
  assurance?: string[];
}

export interface Activity {
  name: string;
  photo: string;
  address: string;
  price: number;
}
