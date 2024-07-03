"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Confetti from "react-confetti"
import { useState } from "react";
import formImage from "@/public/contact-form.svg";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useWindowSize } from "@/hooks/use-window-size";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please provide your name.",
  }),
  email: z.string().email("Please provide a valid email.").min(1, {
    message: "Please provide your email.",
  }),
  message: z.string().min(5, {
    message: "Please provide message more than 5 characters.",
  }),
});

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { width, height } = useWindowSize();

  const sendMessage = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const headerOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
      await fetch("/api/mail", headerOptions);
      
      toast.success("Your messsage has been sent.", {
        duration: 3000,
        position: "top-center",
      });
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000)
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        duration: 3000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <div className="container">
      <h3 className="text-2xl font-bold">Get In Tocuh</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(sendMessage)}
            className="flex flex-col justify-center gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    placeholder="Name"
                    className="focus-visible:ring-transparent border-0 border-b-2 border-border rounded-none border-solid"
                  />
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    placeholder="Email"
                    className="focus-visible:ring-transparent border-0 border-b-2 border-border rounded-none border-solid"
                  />
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <Textarea
                    {...field}
                    placeholder="Your message"
                    className="focus-visible:ring-transparent border-0 border-b-2 border-border rounded-none border-solid"
                  />
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button disabled={loading} className="">
              Send
            </Button>
          </form>
        </Form>

        <div>
          <Image
            src={formImage}
            alt="Form image"
            className="object-contain hidden md:block"
          />
        </div>
      </div>
      {
        showConfetti &&
        <Confetti width={width} height={height} initialVelocityY={20} gravity={0.3} />
      }
    </div>
  );
};
export default ContactForm;
