type Props = {
  width: string;
  height: string;
  border: string;
  xPosition: string;
  yPosition: string;
  hidden?: boolean;
};

const CircularShape = ({
  xPosition,
  yPosition,
  width,
  height,
  border,
  hidden,
}: Props) => {
  return (
    <div
      className={`${
        hidden ? 'hidden lg:block' : ''
      } absolute ${yPosition} ${xPosition} h-[${height}] w-[${width}] rounded-full border-[${border}] border-medium-background-color`}
    />
  );
};

export default CircularShape;
