const MemeListingSkeleton = () => {
  return (
    <li className="flex flex-wrap justify-around animate-pulse p-2">
      <div className="text-gray-200 self-center m-2 blur-xs w-24">0</div>
      <div
        className="bg-gray-200"
        style={{ width: "96px", height: "96px" }}
      ></div>
      <button className="w-12 bg-gray-200 h-8 px-1 text-sm rounded-lg self-center m-2 disabled:cursor-not-allowed disabled:bg-mina-400/80 disabled:line-through"></button>
    </li>
  );
};

export default MemeListingSkeleton;
