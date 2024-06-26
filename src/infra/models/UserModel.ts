import { User } from 'src/domain/entity/User';
import { Email } from 'src/domain/vo/Email';
import { Name } from 'src/domain/vo/Name';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserModel {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  toAggregate() {
    return new User(
      this.id,
      new Name(this.name),
      new Email(this.email),
      this.password,
    );
  }

  static fromAggregate(user: User) {
    return new UserModel(
      user.id,
      user.getName(),
      user.getEmail(),
      user.password,
    );
  }
}
