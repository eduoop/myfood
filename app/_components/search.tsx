"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  search: z
    .string({
      required_error: "Campo obrigatório.",
    })
    .trim()
    .min(1, "Campo obrigatório."),
});

interface SearchProps {
  defaultValues: z.infer<typeof formSchema>;
}

function Search({ defaultValues }: SearchProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/restaurants?search=${data.search}`);
  };

  return (
    <Form {...form}>
      <form className="flex gap-2" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Buscar restaurantes"
                  className="border-none tablet:text-[17px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button size={"icon"} className="tablet:aspect-square">
          <SearchIcon size={18} />
        </Button>
      </form>
    </Form>
  );
}

export default Search;
