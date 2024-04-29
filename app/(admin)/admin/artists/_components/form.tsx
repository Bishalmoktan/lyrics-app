'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import { updateArtist, getArtistById } from '@/lib/admin/actions';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

export const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required.',
  }),
  designation: z.string().min(1, {
    message: 'Designation id is required.',
  }),
});

export function AddArtistForm() {
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      designation: '',
    },
  });
  const router = useRouter();

  const params = useSearchParams();
  const artistId = params.get('artistId');

  useEffect(() => {
    const getArtist = async () => {
      if (artistId) {
        try {
          const artist = await getArtistById(artistId);
          form.setValue('name', artist?.name || '');
          form.setValue('designation', artist?.designation || '');
          setAvatar(artist?.avatar_url || '');
        } catch (error: any) {
          toast.error(error.message);
        }
      }
    };
    getArtist();
  }, [artistId]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (avatar === '') {
      toast.error('Please upload a picture');
      return;
    }
    try {
      if (artistId) {
        setLoading(true);
        const res = await updateArtist(artistId, {
          avatar_url: avatar,
          ...values,
        });
        toast.success(res.msg);
        router.push('/admin/artists');
      } else {
        throw new Error('Artist id not found.');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      form.reset();
      setLoading(false);
      setAvatar('');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Eg: Sajjan Raj Vaidya"
                  className="max-w-sm bg-white focus-visible:ring-transparent text-gray-900"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {artistId ? 'Update' : 'Enter'} name of the artist.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Designation */}
        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designation</FormLabel>
              <FormControl>
                <Input
                  placeholder="Eg: Singer, SongWriter"
                  className="max-w-sm bg-white focus-visible:ring-transparent text-gray-900"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {artistId ? 'Update' : 'Enter'} the designation that suits the
                artist.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* upload image widget  */}
        <div>
          <p>Artist Picture</p>
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
                  className="cursor-pointer text-gray-300"
                >
                  <Upload className="size-16" />
                  <p>{artistId ? 'Update' : 'Upload'} image</p>
                </div>
              );
            }}
          </CldUploadWidget>

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

        <Button
          disabled={loading}
          type="submit"
          className="bg-rose-500 hover:bg-rose-700 text-white hover:text-white"
        >
          {artistId ? 'Update' : 'Create'}
        </Button>
      </form>
    </Form>
  );
}
