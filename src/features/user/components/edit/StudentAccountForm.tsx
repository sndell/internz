import { SubmitHandler, useForm } from "react-hook-form";
import PictureInput from "../../../../components/elements/form/PictureInput";
import TextInput from "../../../../components/elements/form/TextInput";

interface StudentAccountFormProps {
  user: UserType | null;
}

const StudentAccountForm = ({ user }: StudentAccountFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditStudentAccountFormInputs>();

  const onSubmit: SubmitHandler<EditStudentAccountFormInputs> = async (
    data
  ) => {
    try {
      console.log(data);

      reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="rounded-xl bg-white p-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3"
      >
        <PictureInput
          preview={
            user?.photo ||
            `https://ui-avatars.com/api/?name=${user?.username}&background=random`
          }
          id="photo"
          label="Avatar"
          register={register}
          error={errors.photo}
        />
        <TextInput
          id="name"
          label="Name"
          register={register}
          error={errors.name}
          placeholder={user?.username}
        />
      </form>
    </div>
  );
};

export default StudentAccountForm;
