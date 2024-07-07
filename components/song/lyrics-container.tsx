"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import EnglishLyrics from "./english-lyrics";
import NepaliLyrics from "./nepali-lyrics";
import { ILyricsJson } from "@/app/(admin)/admin/songs/create/_components/form";
import { Switch } from "../ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const LyricsContainer = ({
  englishLyrics,
  nepaliLyrics,
}: {
  englishLyrics: ILyricsJson[] | null;
  nepaliLyrics: ILyricsJson[] | null;
}) => {
  const [syncLyrics, setSyncLyrics] = useState<boolean>(true);
  console.log(syncLyrics)
  return (
    <div className="relative">
      <Tabs defaultValue="english" className="">
        <TabsList className="mx-auto w-full bg-transparent ">
          <TabsTrigger value="english" className="text-xl">
            English
          </TabsTrigger>
          <TabsTrigger value="nepali" className="text-xl">
            Nepali
          </TabsTrigger>
        </TabsList>
        <Separator className="bg-zinc-200" />
        <TabsContent value="english" className="text-center text-xl">
          <ScrollArea className="h-[40vh] py-3">
            {/* TODO : FIX THIS TYPESCRIPT ERROR  */}
            {/* @ts-ignore  */}
            <EnglishLyrics syncLyrics={syncLyrics} lyrics={englishLyrics} />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="nepali" className="text-center text-xl">
          <ScrollArea className="h-[40vh] py-3">
            {/* @ts-ignore  */}
            <NepaliLyrics syncLyrics={syncLyrics} lyrics={nepaliLyrics} />
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <div className="flex items-center space-x-2 absolute right-0 top-0">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Switch checked={syncLyrics} onCheckedChange={setSyncLyrics} id="airplane-mode" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[150px] text-center">
             {syncLyrics ? <p>Unsync lyrics</p> :  <p>Sync the lyrics with song</p> }
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
export default LyricsContainer;
