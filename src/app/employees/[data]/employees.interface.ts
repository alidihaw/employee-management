
export namespace Employees {
    export interface Entity {
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        birthDate: Date;
        basicSalary: number;
        status: string;
        group: string;
        description: string;
    }
}