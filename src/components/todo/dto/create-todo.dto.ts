import { ApiProperty } from "@nestjs/swagger"



export class CreateTodoDto {

    @ApiProperty()
    id_user: number

    @ApiProperty()
    task: string

    @ApiProperty()
    deadline: string

}
