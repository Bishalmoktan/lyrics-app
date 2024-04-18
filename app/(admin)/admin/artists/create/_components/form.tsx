'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
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
import { createArtist } from '@/lib/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required.',
  }),
  designation: z.string().min(1, {
    message: 'Designation id is required.',
  }),
});

export function AddSongForm() {
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

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (avatar === '') {
      toast.error('Please upload a picture');
      return;
    }
    try {
      setLoading(true);
      const res = await createArtist({ avatar, ...values });
      toast.success(res.msg);
      router.refresh();
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormDescription>Enter name of the artist.</FormDescription>
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
                Write a designation that suits the artist.
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
                  <p>Upload image</p>
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
          Create
        </Button>
      </form>
    </Form>
  );
}
