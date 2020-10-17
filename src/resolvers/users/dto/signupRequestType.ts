import { Field, InputType } from "type-graphql";
import { IsEmail, IsPhoneNumber } from "class-validator";
import { UserPropLimits, Credentials } from "../../../models/Users";
import { LengthRange } from "../../../lib/decorators/length-range";

@InputType()
export class SignupRequestType implements Credentials {
  @Field()
  @IsEmail()
  @LengthRange(UserPropLimits.EmailLength)
  email!: string;

  @Field()
  @LengthRange(UserPropLimits.PasswordLength)
  password!: string;

  @Field()
  @LengthRange(UserPropLimits.NameLength)
  name!: string;

  @Field()
  @LengthRange(UserPropLimits.GenderLength)
  gender!: string;

  @Field((_type) => [String])
  level: string[];
  
  @Field((_type) => [String])
  recommendPoint: string[];

  @Field((_type) => [String])
  ableLocation!: string[];

  @Field((_type) => [String])
  ableSkillSet?: string[];

  @Field()
  image_url?: string;
}
