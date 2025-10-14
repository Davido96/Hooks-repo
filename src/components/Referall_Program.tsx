import Image from "next/image";
import { copyText } from "@/utils/copyText";

interface Props {
  onClose: () => void;
}

const dummyData: { image: string; name: string; number: number }[] = [
  {
    image: "2users",
    name: "Total Invites",
    number: 0,
  },
  {
    image: "greenTrophy",
    name: "Successful",
    number: 0,
  },
  {
    image: "purpleGift",
    name: "Keys Earned",
    number: 0,
  },
];
const taskDone = 0;
const totalTask = 5;

const Referall_Program: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed flex items-center justify-center inset-0 z-[999] bg-black/60">
      <div className="h-[90vh] edit-modal-creator p-6 overflow-y-scroll edit-modal-creator bg-white w-[672px] rounded-[8px] px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={"/yellow-gift.svg"} width={24} height={24} alt="" />
            <h1 className="yellow-gradient-text leading-[32px] font-bold text-2xl">
              Referal Program
            </h1>
          </div>
          <Image
            src={"/cancelBlack.svg"}
            alt="cancel"
            className="cursor-pointer"
            onClick={() => onClose()}
            width={32}
            height={32}
          />
        </div>
        <div>
          <p className="text-rp_gray text-sm mt-1">
            Invite friends and earn Keys together!
          </p>

          {/* status card */}
          <div className="grid grid-cols-3 mt-6 gap-4">
            {dummyData.map((Item) => (
              <div
                key={Item.name}
                className="bg-rp_stats_bg rp_stats_card pb-7 rounded-[8px] pt-4 border border-rp_stats_border"
              >
                <Image
                  src={`/${Item.image}.svg`}
                  alt={Item.name}
                  width={24}
                  height={24}
                  className="block mx-auto"
                />
                <h3 className="text-2xl font-bold leading-[32px] mt-2 text-center">
                  {Item.number}
                </h3>
                <p className="text-xs text-rp_gray text-center leading-[20px]">
                  {Item.name}
                </p>
              </div>
            ))}
          </div>

          {/* progress rate */}
          <div
            className="mt-3 text-white pt-4 pb-3 px-4 rounded-[8px]"
            style={{
              backgroundImage:
                "linear-gradient(102.33deg, #EE4F83 0%, #F43F5E 100%)",
            }}
          >
            <div className="flex gap-2 items-center">
              <Image
                src={"/concentic-circle.svg"}
                alt="concentric circle"
                width={20}
                height={20}
              />
              <h5 className="font-bold">Next Milestone</h5>
            </div>
            <div>
              <div className="text-xs mt-4 flex items-center justify-between">
                <p>
                  {taskDone}/{totalTask}
                </p>
                <p>{totalTask - taskDone} More to go!</p>
              </div>
              <div className="bg-white/20 overflow-hidden rounded-full mt-3 w-full h-2">
                <div
                  className="bg-green-300 h-2"
                  style={{ width: `${(taskDone / totalTask) * 100}%` }}
                />
              </div>
              <p className="text-xs mt-4">
                {totalTask - taskDone} more successful referrals to earn{" "}
                {totalTask * 100} bonus Keys!
              </p>
            </div>
          </div>

          {/* Referal code */}
          <div>
            <div className="border-rp_yellow_border border rounded-[8px] bg-rp_stats_border_medium p-4 mt-6">
              <h3 className="font-bold leading-[24px]">Your Referral Code</h3>
              <div className="flex items-center w-full gap-3 justify-between mt-3">
                <p className="border font-bold text-rp_yellow flex-1 py-4 px-3 rounded-[8px] border-rp_stats_border bg-white">
                  HOOK-LAGATAB
                </p>
                <div
                  onClick={() => copyText("HOOK-LAGATAB")}
                  className="rounded-[6px] flex items-center justify-center cursor-pointer border border-rp_yellow_border bg-white size-10"
                >
                  <Image src={"/copy.svg"} alt="copy" width={16} height={16} />
                </div>
              </div>
              <p className="text-rp_gray mt-3 text-xs">
                Share this code with friends
              </p>
            </div>
            <div className="mt-7">
              <div className="text-sm flex items-center gap-2">
                <Image src={"/upload.svg"} alt="" width={16} height={16} />
                <p>Share & Earn</p>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3 text-sm">
                <button
                  onClick={() => copyText("http://google.com")}
                  className="rounded-6 border py-3 rounded-[6px] cursor-pointer border-rp_yellow_border"
                >
                  Copy Link
                </button>
                <button className="rounded-6 border py-3 rounded-[6px] cursor-pointer border-rp_green_border_light">
                  WhatsApp
                </button>
                <button className="rounded-6 border py-3 rounded-[6px] cursor-pointer border-rp_purple_border_light">
                  Twitter
                </button>
              </div>
            </div>
          </div>

          {/* reward structure */}
          <div className="mt-6">
            <h5 className="font-bold leading-[24px] mb-4">Reward Structure</h5>
            {/* reward cards */}
            <div className="border bg-rp_stats_border_medium rounded-[8px] p-4 border-rp_stats_border">
              <h5 className="leading-[24px]">As a Creator:</h5>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={"/2users.svg"}
                    alt="2 users"
                    width={16}
                    height={16}
                  />
                  <p className="text-xs">• Invite Fan:</p>
                </div>
                <p className="text-rp_yellow font-bold">2 Keys</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={"/purpleStar.svg"}
                    alt="2 users"
                    width={16}
                    height={16}
                  />
                  <p className="text-xs">• Invite Creator:</p>
                </div>
                <p className="text-rp_yellow font-bold">3 Keys</p>
              </div>
            </div>
            <div className="border mt-4 bg-rp_stats_border_medium rounded-[8px] p-4 border-rp_stats_border">
              <h5 className="leading-[24px]">As a Fan:</h5>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={"/2users.svg"}
                    alt="2 users"
                    width={16}
                    height={16}
                  />
                  <p className="text-xs">• Invite Fan:</p>
                </div>
                <p className="text-rp_yellow font-bold">2 Keys</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={"/purpleStar.svg"}
                    alt="2 users"
                    width={16}
                    height={16}
                  />
                  <p className="text-xs">• Invite Creator:</p>
                </div>
                <p className="text-rp_yellow font-bold">3 Keys</p>
              </div>
            </div>
            <div className="border mt-4 bg-rp_stats_border_medium rounded-[8px] p-4 border-rp_stats_border">
              <h5 className="leading-[24px]">As a Fan:</h5>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={"/greenLightning.svg"}
                    alt="2 users"
                    width={16}
                    height={16}
                  />
                  <p className="text-xs">• Every 5 referrals:</p>
                </div>
                <p className="text-rp_green font-bold">+5 Keys</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={"/yellow-trophy.svg"}
                    alt="2 users"
                    width={16}
                    height={16}
                  />
                  <p className="text-xs">• Monthly leaderboard prizes:</p>
                </div>
                <p className="text-rp_green font-bold">Exclusive rewards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referall_Program;
