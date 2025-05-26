import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(OidcSecurityService);

  return from(authService.getAccessToken()).pipe(
    switchMap((token) => {
      if (token) {
        const reqHeader = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

        return next(reqHeader);
      }

      return next(req);
    }),
  );
};
