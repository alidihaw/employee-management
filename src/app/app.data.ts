import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppData {
    isLoggedIn = false;
    constructor() {
        this.isLoggedIn = !!localStorage.getItem('isAuthenticated');
    }

    readonly #isLoadingAPI = new BehaviorSubject<boolean>(false);
    readonly isLoadingAPI$ = this.#isLoadingAPI
        .asObservable();

    changesIsLoadingAPI(val: boolean): void {
        this.#isLoadingAPI.next(val);
    }

    readonly #isLoading = new BehaviorSubject<boolean>(false);
    readonly isLoading$ = this.#isLoading
        .asObservable();

    changesIsLoading(val: boolean): void {
        this.#isLoading.next(val);
    }
}
