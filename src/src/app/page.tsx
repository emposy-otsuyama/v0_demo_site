"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  BarChart2,
  ShoppingBag,
  Coffee,
  PieChart,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("TDL");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const sidebarItems = [
    { icon: BarChart2, label: "パーク・施設" },
    { icon: ShoppingBag, label: "商品施設" },
    { icon: Coffee, label: "レストラン" },
    { icon: PieChart, label: "アナリティクス" },
  ];

  const infoCards = [
    { title: "在庫情報", color: "bg-blue-100" },
    { title: "発券回収情報", color: "bg-teal-100" },
    { title: "エントリー発行情報", color: "bg-indigo-100" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-blue-600 text-white p-6"
      >
        <h1 className="text-2xl font-bold mb-8">OLC BI Tools.</h1>
        <nav>
          {sidebarItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 mb-4 cursor-pointer"
            >
              <item.icon className="w-6 h-6" />
              <span>{item.label}</span>
            </motion.div>
          ))}
        </nav>
      </motion.aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex space-x-2 mb-6">
            {["TDL", "TDS"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                onClick={() => setActiveTab(tab)}
                className={
                  activeTab === tab ? "bg-blue-800 text-white" : "text-blue-800"
                }
              >
                {tab}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="施設"
                className="border-blue-800"
              />
              <div className="flex items-center space-x-2">
                <Checkbox id="planned" className="border-blue-800" />
                <Label htmlFor="planned" className="text-blue-800">
                  予定施設を表示する
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="completed" className="border-blue-800" />
                <Label htmlFor="completed" className="text-blue-800">
                  終了施設を表示する
                </Label>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-blue-800">表示期間</h3>
              <RadioGroup defaultValue="today">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="today"
                    id="today"
                    className="border-blue-800"
                  />
                  <Label htmlFor="today" className="text-blue-800">
                    当日
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="lastWeek"
                    id="lastWeek"
                    className="border-blue-800"
                  />
                  <Label htmlFor="lastWeek" className="text-blue-800">
                    過去1週間
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="tomorrow"
                    id="tomorrow"
                    className="border-blue-800"
                  />
                  <Label htmlFor="tomorrow" className="text-blue-800">
                    明日
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            {infoCards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`${card.color} p-6 rounded-lg shadow-sm flex flex-col items-center justify-center cursor-pointer`}
              >
                <div className="w-16 h-16 bg-white rounded-lg mb-4"></div>
                <h3 className="text-lg font-semibold text-blue-800">
                  {card.title}
                </h3>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-blue-50 p-6 rounded-lg shadow-sm flex items-center space-x-4 cursor-pointer mb-6"
          >
            <div className="w-12 h-12 bg-blue-200 rounded-lg"></div>
            <h3 className="text-lg font-semibold text-blue-800">
              特定施設在庫情報
            </h3>
          </motion.div>

          <div className="space-y-4">
            <RadioGroup defaultValue="TDR">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="TDR"
                    id="TDR"
                    className="border-blue-800"
                  />
                  <Label htmlFor="TDR" className="text-blue-800">
                    TDR
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="TDL"
                    id="TDL"
                    className="border-blue-800"
                  />
                  <Label htmlFor="TDL" className="text-blue-800">
                    TDL
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="TDS"
                    id="TDS"
                    className="border-blue-800"
                  />
                  <Label htmlFor="TDS" className="text-blue-800">
                    TDS
                  </Label>
                </div>
              </div>
            </RadioGroup>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-blue-50 p-6 rounded-lg shadow-sm flex items-center space-x-4 cursor-pointer"
            >
              <div className="w-12 h-12 bg-blue-200 rounded-lg"></div>
              <h3 className="text-lg font-semibold text-blue-800">
                発券回収 TDR/TDL/TDS
              </h3>
            </motion.div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-blue-800">出力期間</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-[240px] justify-start text-left font-normal ${
                        !startDate && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, "PPP", { locale: ja })
                      ) : (
                        <span>開始日を選択</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <span className="text-blue-800">～</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-[240px] justify-start text-left font-normal ${
                        !endDate && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, "PPP", { locale: ja })
                      ) : (
                        <span>終了日を選択</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="allFacilities" className="border-blue-800" />
                <Label htmlFor="allFacilities" className="text-blue-800">
                  全施設チェックボックス
                </Label>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex items-center space-x-2 border-blue-800 text-blue-800"
              >
                <div className="w-6 h-6 bg-blue-200 rounded"></div>
                <span>CSV出力</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center space-x-2 border-blue-800 text-blue-800"
              >
                <div className="w-6 h-6 bg-blue-200 rounded"></div>
                <span>CSV出力（エントリー発行）</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
