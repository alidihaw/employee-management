import { Employees } from "./employees.interface";

export namespace EmployeesAction {
    export class SetEmployees {
        static readonly type = '[Employees] Set Employees';
        constructor(public employees: Employees.Entity) {}
    }
    export class ClearEmployees {
        static readonly type = '[Employees] Clear Employees';
        constructor() {}
    }
    export class SetAll {
        static readonly type = '[Employees] Set All';
        constructor(public datas: Employees.Entity[]) {}
    }
    export class UpsertAll {
        static readonly type = '[Employees] Upsert All';
        constructor(public datas: Employees.Entity[]) {}
    }
    export class ClearAll {
        static readonly type = '[Employees] Clear All';
        constructor() {}
    }
    export class Create {
        static readonly type = '[Employees] Create';
        constructor(public employees: Employees.Entity) {}
    }
    export class Update {
        static readonly type = '[Employees] Update';
        constructor(public employees: Employees.Entity) {}
    }
    export class Delete {
        static readonly type = '[Employees] Delete';
        constructor(public employees: Employees.Entity) {}
    }
}
