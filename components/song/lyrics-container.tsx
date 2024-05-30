import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import EnglishLyrics from './english-lyrics';
import NepaliLyrics from './nepali-lyrics';
import { ILyricsJson } from '@/app/(admin)/admin/songs/create/_components/form';

const LyricsContainer = ({
  englishLyrics,
  nepaliLyrics,
}: {
  englishLyrics: ILyricsJson[];
  nepaliLyrics: string;
}) => {
  return (
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
          <EnglishLyrics lyrics={englishLyrics} />
        </ScrollArea>
      </TabsContent>
      <TabsContent value="nepali" className="text-center text-xl">
        <ScrollArea className="h-[40vh] py-3">
          <NepaliLyrics lyrics={nepaliLyrics} />
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};
export default LyricsContainer;
