export interface UserI {
    id: number;
    name: string;
    username: string;
    email: string;
    address: AddressI;
    phone: string;
    website: string;
    company: CompanyI;
}

interface AddressI {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    }
}

interface CompanyI {
    name: string;
    catchPhrase: string;
    bs: string;
}
