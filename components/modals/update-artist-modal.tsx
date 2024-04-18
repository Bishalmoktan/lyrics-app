'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal';
import { UserRole } from '@prisma/client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { updateArtist, updateUser } from '@/lib/modal-actions';
import { useRouter } from 'next/navigation';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';

const UpdateArtistModal = () => {
  const { closeModal, isOpen, type, data } = useModal();
  const { artist } = data;
  const isModalOpen = isOpen && type === 'updateArtist';
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSave = async () => {
    try {
      setLoading(true);
      if (artist) {
        const res = await updateArtist(artist, {
          avatar_url: avatar,
          designation,
          name,
        });
        toast.success(res.msg);
        router.refresh();
      } else {
        throw new Error('Cannot find the artist');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      handleClose();
      setLoading(false);
    }
  };

  useEffect(() => {
    if (artist) {
      setAvatar(artist.avatar_url);
      setName(artist.name);
      setDesignation(artist.designation);
    }
  }, [artist]);

  const handleClose = () => {
    setAvatar('');
    setName('');
    setDesignation('');
    closeModal();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center">
          <DialogTitle>Update Artist</DialogTitle>
          <DialogDescription>
            {`Update a user. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <div>
          <h2 className="text-xl text-bold">{data.user?.name}</h2>
          <p className="text-sm text-zinc-300">{data.user?.email}</p>
          <p className="text-sm text-zinc-300">{data.user?.role}</p>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            {/* upload image widget  */}
            <div>
              {avatar !== '' && (
                <Image
                  src={avatar}
                  alt="Preview Image"
                  height={'200'}
                  width={'200'}
                  className="object-cover rounded-full"
                />
              )}
            </div>
            <div>
              <CldUploadWidget
                options={{
                  folder: 'artists',
                }}
                signatureEndpoint={'/api/sign-cloudinary-params'}
                onSuccess={(result) => {
                  const info = result.info as CloudinaryUploadWidgetInfo;
                  setAvatar(info.secure_url);
                }}
              >
                {({ open }) => {
                  return (
                    <div
                      onClick={() => open()}
                      className="cursor-pointer text-gray-300 w-[180px]"
                    >
                      <Upload className="size-16" />
                      <p>Update image</p>
                    </div>
                  );
                }}
              </CldUploadWidget>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="designation" className="text-right">
              Designation
            </Label>
            <Input
              id="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={handleSave}
            className="bg-rose-500 text-whtie hover:bg-rose-700"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateArtistModal;
