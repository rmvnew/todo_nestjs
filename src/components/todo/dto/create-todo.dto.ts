import { ApiProperty } from "@nestjs/swagger"



export class CreateTodoDto {

    @ApiProperty()
    task: string

    @ApiProperty()
    deadline: string

}
