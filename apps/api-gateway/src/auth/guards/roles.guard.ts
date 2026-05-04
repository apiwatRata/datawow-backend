import { Injectable, ExecutionContext, CanActivate } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from 'rxjs';
import { Role } from "libs/common/src/enums/roles.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector){}
    canActivate(
    context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
            context.getHandler(),
            context.getClass(),
        ]);
        if(!requiredRoles) return true;
        const user = context.switchToHttp().getRequest().user
        const hasRequiredRole = requiredRoles.some((role)=> user.role == role)
        return hasRequiredRole;
    } 
}
 {}