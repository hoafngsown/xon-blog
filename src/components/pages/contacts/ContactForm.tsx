"use client";

import BaseAnimation from "@/components/animations/BaseAnimation";
import Label from "@/components/common/Form/Label";
import ErrorMessage from "@/components/common/Form/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { REGEX } from "@/constants/regex";
import { contactServices } from "@/services/client/contacts.service";
import type { ContactBodyType } from "@/types/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ContactForm() {
  const t = useTranslations("page.contacts.form");
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const AddContactSchema = z.object({
    name: z.string().refine((val) => !!val, {
      message: t("error.name"),
    }),
    phone: z
      .string()
      .refine((val) => !!val, {
        message: t("error.phone"),
      })
      .superRefine((data, ctx) => {
        if (!REGEX.PHONE.test(data)) {
          ctx.addIssue({
            code: z.ZodIssueCode.invalid_string,
            message: t("error.invalidPhone"),
            validation: "regex",
          });
        }
      }),
    email: z
      .string()
      .refine((val) => !!val, {
        message: t("error.email"),
      })
      .superRefine((data, ctx) => {
        if (!REGEX.EMAIL.test(data)) {
          ctx.addIssue({
            code: z.ZodIssueCode.invalid_string,
            message: t("error.invalidEmail"),
            validation: "email",
          });
        }
      }),
    content: z.string().nullish(),
  });

  type AddContactType = z.TypeOf<typeof AddContactSchema>;

  const defaultValues: AddContactType = {
    name: "",
    phone: "",
    content: "",
    email: "",
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddContactType>({
    defaultValues,
    resolver: zodResolver(AddContactSchema),
  });

  const onSubmit = async (data: AddContactType) => {
    try {
      setLoading(true);
      await contactServices.create(data as ContactBodyType);
      reset(defaultValues);
      toast({
        title: t("message.success"),
      });
    } catch (error) {
      toast({
        title: t("message.error"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseAnimation>
      <form
        className="mx-auto flex w-full max-w-[750px] flex-col items-center gap-y-5 pb-10 lg:gap-y-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid w-full grid-cols-2 items-end gap-x-10 gap-y-5">
          <div className="col-span-2 flex flex-col gap-y-1 sm:col-span-1">
            <Label text={t("label.email")} required />
            <Input
              {...register("email")}
              placeholder={t("placeholder.email")}
              className="placeholder:text-title"
            />
            <ErrorMessage message={errors.email?.message} />
          </div>
          <div className="col-span-2 flex flex-col gap-y-1 sm:col-span-1">
            <Label
              text={t("label.phone")}
              required
              textHelper={t("placeholder.phoneHelper")}
            />
            <Input
              {...register("phone")}
              placeholder={t("placeholder.phone")}
              className="placeholder:text-title"
            />
            <ErrorMessage message={errors.phone?.message} />
          </div>
        </div>

        <div className="flex w-full flex-col gap-y-1">
          <Label text={t("label.name")} required />
          <Input
            {...register("name")}
            placeholder={t("placeholder.name")}
            className="placeholder:text-title"
          />
          <ErrorMessage message={errors.name?.message} />
        </div>

        <div className="flex w-full flex-col gap-y-1">
          <Label text={t("label.content")} />
          <Textarea
            {...register("content")}
            placeholder={t("placeholder.content")}
            rows={4}
            className="placeholder:text-title"
            maxLength={200}
          />
          <ErrorMessage message={errors.content?.message} />
        </div>

        <Button
          type="submit"
          className="mt-5 w-fit px-10 md:mt-0"
          disabled={loading}
        >
          {t("button")}
        </Button>
      </form>
    </BaseAnimation>
  );
}
