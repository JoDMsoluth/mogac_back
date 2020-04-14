import { Field, InputType } from "type-graphql";

import { UserPropLimits, Credentials } from "../../models/Users";
import { LengthRange } from "../../lib/decorators/length-range";
import { IsEmail } from "class-validator";

@InputType()
export class LoginRequestType implements Credentials {
  @Field()
  @IsEmail()
  @LengthRange(UserPropLimits.EmailLength)
  email!: string;

  @Field()
  @LengthRange(UserPropLimits.PasswordLength)
  password!: string;
}
