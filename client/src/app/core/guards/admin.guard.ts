import { ToastService } from '@/app/shared/services/toast.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, tap, timer } from 'rxjs';

export const AdminGuard: CanActivateFn = (route, state) => {
  const oidcSecurityService = inject(OidcSecurityService);
  const toast = inject(ToastService);

  return oidcSecurityService.isAuthenticated$.pipe(
    map((result) => result.isAuthenticated),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        toast.show('Authenticated Failure', 'error');
        timer(3000).subscribe(() => oidcSecurityService.authorize());
      }
    }),
  );
};
