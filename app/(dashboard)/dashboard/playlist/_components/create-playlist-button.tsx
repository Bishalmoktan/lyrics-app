"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { Plus } from "lucide-react";

function CreatePlaylistButton() {
  const { openModal } = useModal();
  return (
    <Button className="gap-2" onClick={() => openModal("createPlaylist")}>
      <Plus />
      Create playlist
    </Button>
  );
}
export default CreatePlaylistButton;
