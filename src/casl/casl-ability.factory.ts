
import {
    Ability,
    AbilityBuilder,
    AbilityClass,
    ExtractSubjectType,
    InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
  import { Item } from '../items/interfaces/item.interface';
import { Users } from '../users/interfaces/users.interface';
import { Action } from '../enums/permisions.enum';

type Subjects = InferSubjects<typeof Item | typeof Users> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: Users) {
        const { can, cannot, build } = new AbilityBuilder<
            Ability<[Action, Subjects]>
        >(Ability as AbilityClass<AppAbility>);
        console.log(user)
        if (user.role == 'admin') {
            can(Action.Manage, 'all'); // read-write access to everything
        } else {
            can(Action.Read, 'all'); // read-only access to everything
        }

        // can(Action.Update, Item, { authorId: user.id });
        // cannot(Action.Delete, Item, { qty: item.qty });

        return build({
            // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}