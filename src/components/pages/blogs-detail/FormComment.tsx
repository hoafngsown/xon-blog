"use client";

import Label from "@/components/common/Form/Label";
import ErrorMessage from "@/components/common/Form/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LOCAL_STORAGE_KEYS } from "@/constants/local-storage";
import { REGEX } from "@/constants/regex";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { CommentBodyType } from "@/types/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const defaultValues = {
  content: "",
  name: "",
  email: "",
  website: "",
};

export default function FormComment({
  setOpen,
  title,
  onSubmit: onSubmitProps,
}: {
  title: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  onSubmit: (body: CommentBodyType) => Promise<void>;
}) {
  const [localData, setLocalData] = useLocalStorage({
    key: LOCAL_STORAGE_KEYS.COMMENT_FORM_DATA,
    defaultValue: {
      name: "",
      email: "",
      website: "",
      checkbox: false,
    },
  });

  const [checkbox, setCheckbox] = useState(localData?.checkbox ?? false);

  const [loading, setLoading] = useState(false);

  const t = useTranslations("page.blogsDetail.form");

  const AddReplyCommentSchema = z.object({
    id: z.number().nullish(),
    content: z.string().refine((val) => !!val, {
      message: t("content"),
    }),
    name: z.string().refine((val) => !!val, {
      message: t("name"),
    }),
    email: z
      .string()
      .refine((val) => !!val, {
        message: t("email"),
      })
      .superRefine((data, ctx) => {
        if (!REGEX.EMAIL.test(data)) {
          ctx.addIssue({
            code: z.ZodIssueCode.invalid_string,
            message: t("invalidEmail"),
            validation: "email",
          });
        }
      }),
    website: z
      .string()
      .superRefine((data, ctx) => {
        if (!data) return;

        if (!REGEX.URL.test(data)) {
          ctx.addIssue({
            code: z.ZodIssueCode.invalid_string,
            message: t("invalidUrl"),
            validation: "regex",
          });
        }
      })
      .nullish(),
  });

  const {
    register,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm<z.TypeOf<typeof AddReplyCommentSchema>>({
    defaultValues: {
      ...defaultValues,
      ...localData,
    },
    resolver: zodResolver(AddReplyCommentSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await onSubmitProps(data);

      if (checkbox) {
        setValue("content", "");
      } else {
        reset(defaultValues);
      }
      setOpen && setOpen(false);

      if (checkbox) {
        setLocalData({
          checkbox,
          name: data.name,
          email: data.email,
          website: data?.website ?? "",
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col gap-y-2 rounded-[10px] bg-[#ddd]/30 p-6 dark:bg-[#ddd]/10 md:p-10">
      <p className="flex items-center justify-between text-lg font-bold text-primary sm:text-xl md:text-2xl">
        {title}

        {setOpen && (
          <span
            className="ml-2 inline-block cursor-pointer text-sm font-bold text-red-500 md:text-base"
            onClick={() => setOpen(false)}
          >
            {t("close")}
          </span>
        )}
      </p>
      <p className="text-base font-medium italic text-title">
        {t("reply4")} <span className="font-bold text-red-500">*</span>{" "}
        {t("reply5")}
      </p>

      <div className="mt-4 flex flex-col gap-y-2">
        <Label text={t("label.content")} required />
        <Textarea
          {...register("content")}
          placeholder={t("placeholder.content")}
          rows={4}
          className="placeholder:text-title"
        />
        <ErrorMessage message={errors.content?.message} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-6">
        <div className="col-span-2 flex flex-col gap-y-2 sm:col-span-1">
          <Label text={t("label.name")} required />
          <Input
            {...register("name")}
            placeholder={t("placeholder.name")}
            className="placeholder:text-title"
          />
          <ErrorMessage message={errors.name?.message} />
        </div>
        <div className="col-span-2 flex flex-col gap-y-2 sm:col-span-1">
          <Label text={t("label.email")} required />
          <Input
            {...register("email")}
            placeholder={t("placeholder.email")}
            className="placeholder:text-title"
          />
          <ErrorMessage message={errors.email?.message} />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-y-2">
        <Label text={t("label.website")} />
        <Input
          {...register("website")}
          className="placeholder:text-title"
          placeholder={t("placeholder.website")}
        />
        <ErrorMessage message={errors.website?.message} />
      </div>

      <label
        className="mt-2 flex cursor-pointer items-center gap-x-2 font-bold italic"
        htmlFor="checkbox-save-form-comment"
      >
        <input
          type="checkbox"
          id="checkbox-save-form-comment"
          className="h-4 w-4 rounded-[10px]"
          checked={checkbox}
          onChange={(e) => setCheckbox(e.target.checked)}
        />

        <span className="inline-block"> {t("checkbox")}</span>
      </label>

      <Button
        type="button"
        className="mt-4 w-fit"
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {t("buttonSubmit")}
      </Button>
    </div>
  );
}
