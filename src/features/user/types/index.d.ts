type RegisterMode = "student" | "company" | null;

type RegisterFormTypes = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

type CompanyFormTypes = {
  logo: FileList | string;
  name: string;
  url: string;
  description: string;
};

type LoginFormTypes = {
  email: string;
  password: string;
};

type AccountType = "student" | "company";

type UserType = {
  company?: null | string;
  id: string;
  email: string;
  username: string;
  photo: null | string;
  type: AccountType;
};

type AuthMode = "login" | "register" | "verify" | "company";

type EditMode = "account" | "security" | "company";

type EditStudentAccountFormInputs = {
  photo: FileList | string;
  name: string;
  title: string;
  phone: string;
  location: string;
  skills: string[];
  introduction: string;
  education: string;
};

type EditCompanyAccountFormInputs = {
  photo: FileList | string;
  name: string;
  phone?: string;
  introduction: string;
};

type EditCompanyFormInputs = {
  logo: FileList | string;
  name: string;
  description: string;
  url: string;
  location: string;
};
