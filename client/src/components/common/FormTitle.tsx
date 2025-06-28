type Props = {
  title: string;
  description?: string;
};
const FormTitle = ({
  title,
  description = 'Please follow the specified format given when filling the form',
}: Props) => {
  return (
    <div className="mb-5 text-center">
      <p className="text-lg font-semibold text-gray-600 font-roboto">{title}</p>
      <span className="text-sm text-gray-500">{description}</span>
    </div>
  );
};

export default FormTitle;
