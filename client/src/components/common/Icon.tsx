type IconProps = {
  src: string;
  className: string;
  alt: string;
};

const Icon = ({ src, className, alt }: IconProps) => {
  return (
    <div
      className={`${className} bg-current`}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      }}
      aria-label={alt}
    />
  );
};

export default Icon;
