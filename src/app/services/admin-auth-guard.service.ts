import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot } from "@angular/router";
import { CanActivate } from "@angular/router/src/utils/preactivation";
import { map, switchMap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.appUser$.pipe(map(appUser => appUser.isAdmin));
  }
}
