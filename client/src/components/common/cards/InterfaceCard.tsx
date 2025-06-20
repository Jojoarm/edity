type Props = {
  imgUrl: string;
  alt: string;
  title: string;
  description: string;
};

const InterfaceCard = ({ imgUrl, alt, title, description }: Props) => {
  return (
    <div className="relative max-w-120 w-full rounded-3xl shadow border-b border-gray-200 shadow-gray-600 group cursor-pointer overflow-hidden">
      <img
        src={imgUrl}
        alt={alt}
        className="w-full h-[350px] object-cover transition-transform duration-300 group-hover:scale-103"
      />

      <div className="h-full rounded-b-3xl bg-[#ffffff] p-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-lg font-light text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default InterfaceCard;
