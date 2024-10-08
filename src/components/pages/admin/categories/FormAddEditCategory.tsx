"use client";

import Label from "@/components/common/Form/Label";
import ErrorMessage from "@/components/common/Form/Message";
import Typography from "@/components/common/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useLoader } from "@/hooks/useLoader";
import {
  AddEditCategorySchema,
  type AddEditCategoryType,
} from "@/libs/schema/category.schema";
import { categoryServices } from "@/services/client/categories.service";
import type { CategoryType } from "@/types/categories";
import { convertTitleToSlug } from "@/utils/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  defaultValues?: CategoryType;
  onSubmit: () => void;
}

export default function FormAddEditCategory({
  onSubmit: onSubmitProps,
  defaultValues,
}: Props) {
  const { toast } = useToast();
  const { showLoader } = useLoader();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddEditCategoryType>({
    defaultValues: defaultValues ?? {
      name: "",
      slug: "",
    },
    resolver: zodResolver(AddEditCategorySchema),
  });

  const id = watch("id");
  const isEdit = !!id;

  const onSubmit = async (body: AddEditCategoryType) => {
    try {
      showLoader(true);
      let promise: Promise<any>;

      if (isEdit) {
        promise = categoryServices.editCategory(id, body);
      } else {
        promise = categoryServices.createNewCategory(body);
      }

      await promise;

      onSubmitProps();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi rùi",
      });
    } finally {
      showLoader(false);
    }
  };

  const handleReset = () => {
    setValue("name", "");
    setValue("slug", "");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Typography text="Tạo category mới" className="!text-2xl" />

      <form
        className="border-ddd mt-6 flex w-full max-w-[700px] flex-col gap-y-6 rounded-[10px] border px-8 py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-1.5">
          <Label text="Tên" required />
          <Input
            placeholder="Nhập tên của category"
            {...register("name")}
            onChange={(e) => {
              const value = e.target.value;
              const slug = convertTitleToSlug(value);
              setValue("name", value);
              setValue("slug", slug);
            }}
          />
          <ErrorMessage message={errors.name?.message} />
        </div>

        <div className="flex flex-col gap-y-1.5">
          <Label text="Slug" required />
          <Input placeholder="Nhập slug" {...register("slug")} />
          <ErrorMessage message={errors.slug?.message} />
        </div>

        <div className="flex items-center justify-center gap-x-3">
          <Button
            type="button"
            variant="ghost"
            className="border-ddd rounded-[10px] border text-title"
            onClick={handleReset}
          >
            Xoá dữ liệu
          </Button>
          <Button type="submit">{isEdit ? "Chỉnh sửa" : "Thêm mới"}</Button>
        </div>
      </form>
    </div>
  );
}
