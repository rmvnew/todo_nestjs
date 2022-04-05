import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto {

    @ApiProperty()
    task: string

    @ApiProperty()
    deadline: string

    @ApiProperty()
    status: boolean
}
// export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
