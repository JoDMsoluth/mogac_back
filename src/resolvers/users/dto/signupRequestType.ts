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

  @Field()
  @IsPhoneNumber("KR")
  @LengthRange(UserPropLimits.PhoneLength)
  phone!: string;

  @Field()
  @LengthRange(UserPropLimits.AddressLength)
  address!: string;

  @Field()
  @LengthRange(UserPropLimits.BirthLength)
  birth!: string;

  @Field()
  @LengthRange(UserPropLimits.ImageUrlLength)
  image_url: string;
}
