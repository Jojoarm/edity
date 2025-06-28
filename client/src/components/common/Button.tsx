const Button = ({ isPending }: { isPending: boolean }) => {
  return (
    <button
      type="submit"
      className="mt-8 w-full max-w-xs h-11 rounded-xl text-white bg-primary hover:opacity-90 transition-opacity cursor-pointer"
      disabled={isPending}
    >
      {isPending ? (
        <div className="animate-spin rounded-full h-7 w-7 m-auto border-2 border-white border-t-primary-500 "></div>
      ) : (
        'Submit'
      )}
    </button>
  );
};

export default Button;
