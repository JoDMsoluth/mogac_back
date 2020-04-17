import { Field, InputType } from "type-graphql";
import { IsEmail } from "class-validator";
import { UserPropLimits } from "../../../models/Users";
import { LengthRange } from "../../../lib/decorators/length-range";

@InputType()
export class UpdateUserRequest {
  @Field({ nullable: true })
  @IsEmail()
  @LengthRange(UserPropLimits.EmailLength)
  email?: string;

  @Field({ nullable: true })
  @LengthRange(UserPropLimits.PasswordLength)
  password?: string;

  @Field({ nullable: true })
  @LengthRange(UserPropLimits.NameLength)
  name?: string;

  @Field({ nullable: true })
  @LengthRange(UserPropLimits.PhoneLength)
  phone?: string;

  @Field({ nullable: true })
  @LengthRange(UserPropLimits.AddressLength)
  address?: string;

  @Field({ nullable: true })
  @LengthRange(UserPropLimits.BirthLength)
  birth?: string;

  @Field({ nullable: true })
  @LengthRange(UserPropLimits.ImageUrlLength)
  image_url?: string;
}
