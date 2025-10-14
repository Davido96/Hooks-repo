import React from "react";
import { X, Gift, Users, Trophy, Copy, Share } from "lucide-react";

interface ReferralProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferralProgramModal: React.FC<ReferralProgramModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-2">
            <Gift className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-800">
              Referral Program
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6">
          <p className="text-gray-600 text-sm mb-6">
            Invite friends and earn Keys together!
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Users className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">0</div>
              <div className="text-xs text-gray-500">Total Invites</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Trophy className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">0</div>
              <div className="text-xs text-gray-500">Successful</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Gift className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">0</div>
              <div className="text-xs text-gray-500">Keys Earned</div>
            </div>
          </div>

          {/* Next Milestone */}
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg p-4 mb-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="font-medium">Next Milestone</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">0/5</span>
              <span className="text-sm">5 more to go!</span>
            </div>
            <div className="bg-white bg-opacity-30 rounded-full h-2">
              <div className="bg-white rounded-full h-2 w-0"></div>
            </div>
            <p className="text-sm mt-2 opacity-90">
              5 more successful referrals to earn 500 bonus Keys!
            </p>
          </div>

          {/* Your Referral Code */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">
              Your Referral Code
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="text-yellow-600 font-bold text-lg">
                  HOOK-LAGATAB
                </div>
                <div className="text-xs text-gray-500">
                  Share this code with friends
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Share & Earn */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Share className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-800">Share & Earn</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button className="bg-gray-100 hover:bg-gray-200 rounded-lg py-2 px-3 text-sm font-medium text-gray-700">
                Copy Link
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 rounded-lg py-2 px-3 text-sm font-medium text-gray-700">
                WhatsApp
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 rounded-lg py-2 px-3 text-sm font-medium text-gray-700">
                Twitter
              </button>
            </div>
          </div>

          {/* Reward Structure */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              Reward Structure
            </h3>

            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-3">As a Creator:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">• Invite Fan:</span>
                  </div>
                  <span className="text-sm font-medium text-yellow-600">
                    2 Keys
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600">
                      • Invite Creator:
                    </span>
                  </div>
                  <span className="text-sm font-medium text-purple-600">
                    3 Keys
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-3">As a Fan:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">• Invite Fan:</span>
                  </div>
                  <span className="text-sm font-medium text-yellow-600">
                    2 Keys
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600">
                      • Invite Creator:
                    </span>
                  </div>
                  <span className="text-sm font-medium text-purple-600">
                    3 Keys
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-3">Bonus Rewards:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      • Every 5 referrals:
                    </span>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    +5 Keys
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">
                      • Monthly leaderboard prizes:
                    </span>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    Exclusive rewards
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgramModal;
