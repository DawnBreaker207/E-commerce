import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { from, switchMap } from 'rxjs';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const oidc = inject(OidcSecurityService);

  return from(oidc.getAccessToken()).pipe(
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
