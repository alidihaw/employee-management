import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { STORAGE_ENGINE } from '@ngxs/storage-plugin';

import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';

const STATES: any = [EmployeesState];

@NgModule({
    imports: [
        NgxsModule.forRoot([...STATES], {
            developmentMode: !environment.production,
        }),
        NgxsLoggerPluginModule.forRoot({
            collapsed: true,
            disabled: environment.production,
        }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
    exports: [],
})
export class StateModule {
    constructor() {}

    static forRoot(): ModuleWithProviders<StateModule> {
        return {
            ngModule: StateModule,
            providers: [{
                provide: STORAGE_ENGINE,
                useClass: StoragePlugin,
            }],
        };
    }
}

import { StorageEngine } from '@ngxs/storage-plugin';
import { EmployeesState } from './employees/[data]/employees.state';
export class StoragePlugin implements StorageEngine {
    /**
     * Gets length
     */
    get length(): number {
        return 0;
    }

    /**
     * Gets item
     * @param key
     * @returns item
     */
    getItem(key: string): any {
        return localStorage.getItem(environment.key + '-' + key);
    }

    /**
     * Sets item
     * @param key
     * @param val
     */
    setItem(key: string, val: any): void {
        localStorage.setItem(environment.key + '-' + key, val);
    }

    /**
     * Removes item
     * @param key
     */
    removeItem(key: string): void {
        localStorage.removeItem(environment.key + '-' + key);
    }

    /**
     * Clears storage plugin
     */
    clear(): void {
        localStorage.clear();
    }
}
