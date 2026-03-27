export default function Divider({ text }) {
  return (
    <div className="w-full flex items-center justify-center my-4 opacity-90">
      <span className="text-accent-teal text-[10px] mr-2">&#9658;</span>
      <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">
        {text}
      </span>
      <span className="text-accent-teal text-[10px] ml-2">&#9668;</span>
    </div>
  );
}
