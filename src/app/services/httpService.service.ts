import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { catchError, filter, lastValueFrom, NEVER, Observable, Subject, takeUntil, throwError } from 'rxjs';

export interface HttpErrorResponseEvent {
    error: HttpErrorResponse;
    code: undefined | string;
}

@Injectable({
    providedIn: 'root'
})
export class HttpWrapperService {
    private stop: Subject<any> = new Subject();
    private dontStop: Observable<any> = NEVER;
    private httpError$: Subject<HttpErrorResponseEvent> = new Subject();

    public constructor(
        private router: Router
    ) {
        this.router.events.pipe(filter((event) => event instanceof NavigationStart)
        ).subscribe((v) => this.cancelPendingHttpRequests(v));
    }

    public cancelPendingHttpRequests(event: unknown): void {
        this.stop.next(event);
    }

    public async doHttp<T>(
        httpCall: Observable<T>,
        cancelOnRouteChange: boolean = true,
        errorCode?: string
    ): Promise<T> {
        try {
            const http = httpCall.pipe(
                takeUntil(cancelOnRouteChange ? this.stop : this.dontStop),
                catchError(error => this.handleHttpError<T>(error, errorCode)));
            const result = await lastValueFrom(http);
            if(result === undefined) {
                console.warn('http call cenceled');
            }
            return result;
        }catch(error) {
            return Promise.reject(error);
        }
    }

    public handleHttpError<T>(error: Error, code?: string): Observable<any> {
        if(error instanceof HttpErrorResponse) {
            this.httpError$.next({error, code});
        }
        return throwError(() => error);
    }

    public getHttpError$(): Observable<HttpErrorResponseEvent> {
        return this.httpError$;
    }
}
