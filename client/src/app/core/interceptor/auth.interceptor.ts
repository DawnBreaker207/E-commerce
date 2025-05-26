import { ToastService } from '@/app/shared/services/toast.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { catchError, switchMap, tap, throwError, timer } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const oidc = inject(OidcSecurityService);
  const toast = inject(ToastService);
  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        toast.show('Your session has expired', 'error');
        return timer(5000).pipe(
          tap(() => oidc.authorize()),
          switchMap(() => throwError(() => err)),
        );
      }

      return throwError(() => err);
    }),
  );
};
