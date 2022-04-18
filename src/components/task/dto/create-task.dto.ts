import { ApiProperty } from "@nestjs/swagger"
import { StatusTasks, Typepriority } from "src/common/enums"



export class CreateTodoDto {

    @ApiProperty()
    id_user: number

    @ApiProperty()
    task: string

    @ApiProperty()
    deadline: string

    @ApiProperty({ required: false, default: 'MIDDLE', enum: ['LOW', 'MIDDLE','HIGH'] })
    priority: Typepriority

    @ApiProperty({ required: false, default: 'TO_DO', enum: ['TO_DO', 'IN_PROGRESS','DONE'] })   
    status: StatusTasks

}
