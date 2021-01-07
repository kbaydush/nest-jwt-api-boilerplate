import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {
    Client,
    ClientProxy,
    MessagePattern,
    Transport,
} from '@nestjs/microservices';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { RoleType } from '../../common/constants/role-type';
import { Roles } from '../../decorators/roles.decorator';
import { JWTGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';

@Controller('math')
// @ApiBearerAuth()
// @UseInterceptors(AuthUserInterceptor)
@UseGuards(JWTGuard)
export class MathController {
    // @Client({ transport: Transport.TCP, options: { port: 4000 } })
    // client: ClientProxy;

    @Get('sum')
    // @Roles(RoleType.ADMIN, RoleType.USER)
    @HttpCode(HttpStatus.OK)
    call(): number {
        const pattern = { cmd: 'sum' };
        const data = [1, 2, 3, 4, 5];
        return 777;
    }

    @MessagePattern({ cmd: 'sum' })
    sum(data: number[]): number {
        return (data || []).reduce((a, b) => a + b);
    }
}
