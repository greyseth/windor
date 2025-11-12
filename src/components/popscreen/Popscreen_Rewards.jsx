import RewardsList from "../RewardsList";

export default function Popscreen_Rewards() {
  return (
    <div
      className="w-full h-full overflow-y-auto max-w-[500px] bg-white rounded-xl p-4"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <RewardsList />
    </div>
  );
}
