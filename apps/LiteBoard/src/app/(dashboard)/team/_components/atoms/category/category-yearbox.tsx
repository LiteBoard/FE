const CategoryYearBox = ({ year }: { year: number }) => {
  return (
    <div className="flex flex-col flex-shrink-0 px-5 py-3 border-b border-neutral-200">
      <p className="text-text-B3M text-neutral-600 text-end">{year}년</p>
    </div>
  );
};

export default CategoryYearBox;
