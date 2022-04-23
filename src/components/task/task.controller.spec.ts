// import { Test, TestingModule } from "@nestjs/testing"
// import { TaskController } from "./task.controller"
// import { TaskService } from "./task.service"


// describe('TaskService', () => {
//     let taskController: TaskController
//     let taskService: TaskService

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             controllers: [TaskController],
//             providers: [{
//                 provide: TaskService,
//                 useValue: {
//                     create: jest.fn(),
//                     getAll: jest.fn(),
//                     getOne: jest.fn(),
//                     update: jest.fn(),
//                     remove: jest.fn()
//                 },
//             }]
//         }).compile()

//         taskController = module.get<TaskController>(TaskController)
//         taskService = module.get<TaskService>(TaskService)
//     })

//     it('should be defined', () => {
//         expect(taskController).toBeDefined()
//     })
// })