import { Injectable } from '@angular/core';
import { State, StateContext, Selector, NgxsOnInit, NgxsSimpleChange, NgxsOnChanges, Action } from '@ngxs/store';
import { EmployeesAction } from './employees.action';
import { insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { Employees } from './employees.interface';
import { clone } from '../../app.utils';

export interface EmployeesStateModel {
    datas: Employees.Entity[];
    employees: Employees.Entity | null;
    loaded: boolean;
}

@State<EmployeesStateModel>({
    name: 'employees',
    defaults: {
        datas: [],
        employees: null,
        loaded: false,
    },
})
@Injectable()
export class EmployeesState implements NgxsOnInit, NgxsOnChanges {
    @Selector()
    static getDatas(state: EmployeesStateModel) {
        return state.datas;
    }
    @Selector()
    static getEmployees(state: EmployeesStateModel) {
        return state.employees;
    }

    @Selector()
    static hasLoaded(state: EmployeesStateModel) {
        return state.loaded;
    }

    constructor() {}

    ngxsOnInit(ctx: StateContext<EmployeesStateModel>): void {
        console.log('ngxsOnInit');
    }

    ngxsOnChanges(change: NgxsSimpleChange) {
        console.log('prev state', change.previousValue);
        console.log('next state', change.currentValue);
    }

    @Action(EmployeesAction.SetEmployees)
    async setEmployees({ getState, patchState }: StateContext<EmployeesStateModel>, { employees }: EmployeesAction.SetEmployees) {
        const state = getState();
        patchState({
            employees: employees,
            loaded: true,
        });
    }

    @Action(EmployeesAction.ClearEmployees)
    async clearEmployees({ getState, patchState }: StateContext<EmployeesStateModel>, { }: EmployeesAction.ClearEmployees) {
        const state = getState();
        patchState({
            employees: null,
            loaded: false,
        });
    }

    @Action(EmployeesAction.SetAll)
    async setAll({ getState, patchState }: StateContext<EmployeesStateModel>, { datas }: EmployeesAction.SetAll) {
        const state = getState();
        patchState({
            datas: datas,
            loaded: true,
        });
    }

    @Action(EmployeesAction.UpsertAll)
    async upsertAll({ getState, patchState }: StateContext<EmployeesStateModel>, { datas }: EmployeesAction.UpsertAll) {
        const state = getState();
        const itemExists = clone(state.datas) || [];
        datas?.forEach((i, index) => {
            const findIndex = itemExists.findIndex((e) => e.username === i.username);
            if (findIndex !== -1) {
                itemExists[findIndex] = i;
            } else {
                itemExists.push(i);
            }
        });

        patchState({
            datas: itemExists,
            loaded: true,
        });
    }

    @Action(EmployeesAction.ClearAll)
    async clearAll({ getState, patchState }: StateContext<EmployeesStateModel>, { }: EmployeesAction.ClearAll) {
        const state = getState();
        patchState({
            datas: [],
            loaded: false,
        });
    }

    @Action(EmployeesAction.Create)
    async create({ getState, patchState, setState }: StateContext<EmployeesStateModel>, { employees }: EmployeesAction.Create) {
        console.log("create", employees);
        const state = getState();
        setState(
            patch({
                datas: insertItem(employees),
                loaded: true,
            }),
        );
    }

    @Action(EmployeesAction.Update)
    async update({ getState, patchState, setState }: StateContext<EmployeesStateModel>, { employees }: EmployeesAction.Update) {
        console.log("update", employees);
        const state = getState();
        setState(
            patch({
                datas: updateItem(item => item.username === employees.username, patch(employees)),
                loaded: true,
            }),
        );
    }

    @Action(EmployeesAction.Delete)
    async delete({ getState, patchState, setState }: StateContext<EmployeesStateModel>, { employees }: EmployeesAction.Delete) {
        console.log("delete", employees);
        const state = getState();
        setState(
            patch({
                datas: removeItem<Employees.Entity>((item) => item.username === employees.username),
                loaded: true,
            }),
        );
    }
}
