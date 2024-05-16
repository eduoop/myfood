"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import ReactStars from "react-stars";
import React, { useState } from "react";
import { Button } from "../../../_components/ui/button";
import { z } from "zod";
import { notFound } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../_components/ui/form";
import { useForm } from "react-hook-form";
import { sendReview } from "../_actions/user-review";
import { useSession } from "next-auth/react";
import { Loader2, LogOutIcon } from "lucide-react";
import { toast } from "../../../_components/ui/use-toast";

const formSchema = z.object({
  description: z
    .string({
      required_error: "Campo obrigatório.",
    })
    .min(1, "Descricão obrigatória.")
    .trim(),
  note: z.number().min(1, "Nota obrigatória").max(5),
});

interface ReviewRestaurantSheetProps {
  defaultValues: z.infer<typeof formSchema>;
  restaurantId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReviewRestaurantSheet({
  defaultValues,
  restaurantId,
  setOpen,
}: ReviewRestaurantSheetProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const { data } = useSession();

  if (!data?.user.id) {
    return notFound();
  }

  const handleSubmit = async (dataReview: z.infer<typeof formSchema>) => {
    setLoading(true);

    const formattedData = {
      note: dataReview.note,
      feedback: dataReview.description,
      restaurantId,
      userId: data.user.id!,
    };

    try {
      await sendReview(formattedData);
      toast({ title: "Restaurante avaliado com sucesso!" });
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({ title: "Desculpe. Algo deu errado" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SheetContent side="bottom" className="rounded-t-lg">
      <SheetHeader className="mb-5">
        <SheetTitle>Avaliar restaurante</SheetTitle>
        <SheetDescription>
          Dê um feedback sobre este restaurante
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <textarea
                    {...field}
                    className="border-lg min-h-[250px] w-full resize-none rounded-lg border bg-card p-3 text-[17px] text-card-foreground shadow-md"
                    placeholder="Escreva sua avaliação..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <ReactStars
                    {...field}
                    count={5}
                    size={34}
                    color1="rgba(236, 51, 64, 0.6)"
                    color2="#EC3340"
                    className="h-[36px] "
                    half={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-6 flex w-full items-center justify-end laptop:mt-0">
            <Button disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Avaliando..." : "Avaliar Restaurante"}
            </Button>
          </div>
        </form>
      </Form>
    </SheetContent>
  );
}

export default ReviewRestaurantSheet;
