export interface IClient {
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    payment: Payment;
    projects?: IProjects[];
}

export interface IProjects {
    projectName: string;
    isFinished: boolean;
}


export enum Payment {
    'Hourly',
    'FixedPrice'
}

