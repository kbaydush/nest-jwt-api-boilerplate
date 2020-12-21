import {Controller, Get, HttpCode, HttpStatus, UseGuards, UseInterceptors} from '@nestjs/common';
import {
    Client,
    ClientProxy,
    MessagePattern,
    Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {JWTGuard} from "../../guards/auth.guard";
import {ApiBearerAuth} from "@nestjs/swagger";
import {Roles} from "../../decorators/roles.decorator";
import {RoleType} from "../../common/constants/role-type";
import {AuthUserInterceptor} from "../../interceptors/auth-user-interceptor.service";
import {RolesGuard} from "../../guards/roles.guard";

@Controller('math')
// @ApiBearerAuth()
// @UseInterceptors(AuthUserInterceptor)
@UseGuards(JWTGuard)
export class MathController {
    @Client({ transport: Transport.TCP, options: { port: 4000 } })
    client: ClientProxy;

    @Get('sum')
    // @Roles(RoleType.ADMIN, RoleType.USER)
    @HttpCode(HttpStatus.OK)
    call(): Observable<number> {
        const pattern = { cmd: 'sum' };
        const data = [1, 2, 3, 4, 5];
        return this.client.send<number>(pattern, data);
    }

    @MessagePattern({ cmd: 'sum' })
    sum(data: number[]): number {
        return (data || []).reduce((a, b) => a + b);
    }
}
