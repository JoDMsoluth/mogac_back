import { IntegerRange } from "../helper/integer-range";
import { Length } from "class-validator";

export function LengthRange(range: IntegerRange) {
  return Length(range.min, range.max - 1);
}
