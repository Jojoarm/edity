type Props = {
  widthClass: string;
  heightClass: string;
  borderClass: string;
  xPosition: string;
  yPosition: string;
  hidden?: boolean;
};

const CircularShape = ({
  xPosition,
  yPosition,
  widthClass,
  heightClass,
  borderClass,
  hidden,
}: Props) => {
  return (
    <div
      className={`${
        hidden ? 'hidden lg:block' : ''
      } absolute ${yPosition} ${xPosition} ${heightClass} ${widthClass} rounded-full ${borderClass} border-medium-background-color`}
    />
  );
};

export default CircularShape;
