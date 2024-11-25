import { SignUpFormValues } from "@/types";

export interface SignInFormValues extends Omit<SignUpFormValues, "username"> {}
