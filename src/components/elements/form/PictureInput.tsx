import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type PictureInputProps<T extends FieldValues> = {
  label: string;
  id: string;
  error?: FieldError;
  register: UseFormRegister<T>;
  preview: string;
};

const PictureInput = <T extends FieldValues>({
  label,
  id,
  preview,
  register,
  error,
}: PictureInputProps<T>) => {
  return (
    <div className="flex items-center gap-2">
      <img src={preview}></img>
      <label htmlFor="logo">{label}</label>
      <input
        type="file"
        id={id}
        accept="image/*"
        {...register(id as Path<T>, { required: true })}
      />
    </div>
  );
};

export default PictureInput;
