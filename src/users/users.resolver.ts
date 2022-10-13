import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from './schema/users.schema';
//import { Blog } from './blog.schema';
import { CreateUsersDto } from './dto/create-users.dto';
@Resolver()
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

  @Mutation(() => Users)
  createUser(@Args('createUserInput') createUserInput: CreateUsersDto) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [Users], { name: 'user' })
  findAll() {
    console.log ("Hui");
    return this.usersService.findAll();
  }

//   @Query(() => User, { name: 'user' })
//   findOne(@Args('_id', { type: () => String }) id: string) {
//     return this.usersService.findOne(id);
//   }

//   @Mutation(() => User)
//   updateBlog(@Args('updateBlogInput') updateBlogInput: CreateUsersDto) {
//     return this.usersService.update(updateBlogInput._id, updateBlogInput);
//   }

  /*
  

  @Mutation(() => Blog)
  removeBlog(@Args('id', { type: () => Int }) id: number) {
    return this.blogService.remove(id);
  }
  */
}
