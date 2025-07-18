export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-20 w-full h-14 border bg-neutral-white border-b-neutral-100">
      <div className="flex justify-between items-center px-4 h-full">
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 bg-neutral-500" />
          <p className="text-text-B2M text-neutral-900">LiteBoard</p>
        </div>
      </div>
    </header>
  );
};
