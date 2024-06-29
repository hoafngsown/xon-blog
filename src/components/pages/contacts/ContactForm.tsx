"use client";

import Label from "@/components/common/Form/Label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("page.contacts.form");
  return (
    <div className="flex w-full max-w-[750px] flex-col items-center pb-10 md:gap-y-5 lg:gap-y-7">
      <div className="grid w-full grid-cols-2 gap-x-10 gap-y-5">
        <div className="col-span-2 flex flex-col gap-y-1 sm:col-span-1">
          <Label text={t("email")} required />
          <Input />
        </div>
        <div className="col-span-2 flex flex-col gap-y-1 sm:col-span-1">
          <Label text={t("phone")} required />
          <Input />
        </div>
      </div>

      <div className="flex w-full flex-col gap-y-1">
        <Label text={t("name")} required />
        <Input />
      </div>

      <div className="flex w-full flex-col gap-y-1">
        <Label text={t("message")} />
        <Textarea />
      </div>

      <Button type="button" className="mt-5 w-fit px-10 md:mt-0">
        {t("button")}
      </Button>
    </div>
  );
}
