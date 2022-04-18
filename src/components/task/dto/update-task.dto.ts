import { ApiProperty} from '@nestjs/swagger';
import { StatusTasks } from 'src/common/enums';


export class UpdateTodoDto {

    @ApiProperty()
    task: string

    @ApiProperty()
    deadline: string

    @ApiProperty()
    status: StatusTasks
}
