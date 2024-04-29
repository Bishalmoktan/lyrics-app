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
import { updateArtist, getArtistById, createGenre } from '@/lib/admin/actions';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

export const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required.',
  }),
  background: z.string().min(1, {
    message: 'Please provide valid color',
  }),
});

export function AddArtistForm() {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      background: '',
    },
  });
  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (image === '') {
      toast.error('Please upload a picture');
      return;
    }
    try {
      setLoading(true);
      const res = await createGenre({ image, ...values });
      toast.success(res.msg);
      router.push('/admin/songs/create');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      form.reset();
      setLoading(false);
      setImage('');
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
                  placeholder="Eg: Pop"
                  className="max-w-sm bg-white focus-visible:ring-transparent text-gray-900"
                  {...field}
                />
              </FormControl>
              <FormDescription>Name of the genre.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Designation */}
        <FormField
          control={form.control}
          name="background"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Background Color</FormLabel>
              <FormControl>
                <Input
                  placeholder="Eg: bg-rose-500 or bg-[#57C4FF]"
                  className="max-w-sm bg-white focus-visible:ring-transparent text-gray-900"
                  {...field}
                />
              </FormControl>
              <FormDescription>Background color for the genre.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* upload image widget  */}
        <div>
          <p>Picture</p>
          <CldUploadWidget
            options={{
              folder: 'artists',
            }}
            signatureEndpoint={'/api/sign-cloudinary-params'}
            onSuccess={(result) => {
              const info = result.info as CloudinaryUploadWidgetInfo;
              setImage(info.secure_url);
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

          {image !== '' && (
            <Image
              src={image}
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
