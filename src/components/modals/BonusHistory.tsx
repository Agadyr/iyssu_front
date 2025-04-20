"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Coins } from "lucide-react";
import { BonusHistories } from "@/types/auth/user/user";

interface BonusHistoryProps {
  bonusPoints: number;
  bonusHistories: BonusHistories[];
}

export const BonusHistory = ({ bonusPoints, bonusHistories }: BonusHistoryProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-full bg-white hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-gray-100">
          <div className="flex items-center gap-4 p-6">
            <div className="p-3 bg-emerald-50 rounded-full">
              <Coins className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Бонусный баланс</p>
              <p className="text-2xl font-bold text-emerald-600">{bonusPoints} ₸</p>
            </div>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle>История бонусов</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-emerald-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">Текущие бонусы</p>
            <p className="text-3xl font-bold text-emerald-600">{bonusPoints} ₸</p>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {bonusHistories.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                История операций пуста
              </div>
            ) : (
              bonusHistories.map((history, index) => {
                const date = new Date(history.created_at)
                date.setHours(date.getHours() + 19)
                return (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{history.description}</p>
                      <p className="text-sm text-gray-500">
                        {format(date, "d MMMM yyyy, HH:mm", { locale: ru })}
                      </p>
                    </div>
                    <span className={`font-semibold ${history.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {history.amount > 0 ? '+' : ''}{history.amount} ₸
                    </span>
                  </div>
                </div>
                )
              })
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};