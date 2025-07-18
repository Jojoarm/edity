const TopWave = () => {
  return (
    <svg
      viewBox="0 0 1440 320"
      className="w-full h-[120px] rotate-180"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffbd7a" />
          <stop offset="50%" stopColor="#fe8bbb" />
          <stop offset="100%" stopColor="#9e7aff" />
        </linearGradient>
      </defs>
      <path
        // fill="url(#gradient1)"
        className="fill-primary-green"
        d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,106.7C672,85,768,75,864,101.3C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96V0H0Z"
      />
    </svg>
  );
};

export default TopWave;
