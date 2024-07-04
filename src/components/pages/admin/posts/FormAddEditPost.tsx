"use client";

import Label from "@/components/common/Form/Label";
import ErrorMessage from "@/components/common/Form/Message";
import Typography from "@/components/common/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { useLoader } from "@/hooks/useLoader";
import {
  AddEditPostSchema,
  type AddEditPostType,
  type AddEditPostTypeRequest,
} from "@/libs/schema/post.schema";
import { UploadButton } from "@/libs/uploadthing";
import { categoryServices } from "@/services/client/categories.service";
import { postServices } from "@/services/client/posts.service";
import type { OptionType } from "@/types/common";
import { convertTitleToSlug } from "@/utils/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { EPostStatus } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  defaultValues?: AddEditPostType;
  onSubmit: () => void;
}

export default function FormAddEditPost({
  onSubmit: onSubmitProps,
  defaultValues,
}: Props) {
  const { toast } = useToast();
  const { showLoader } = useLoader();

  const [categoryOptions, setCategoryOptions] = useState<OptionType[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddEditPostType>({
    defaultValues: defaultValues ?? {
      title: "",
      slug: "",
      description: "",
      thumbnail: "",
      content: "",
      status: EPostStatus.Draft,
      categories: [],
      tags: "",
      priority: 0,
    },
    resolver: zodResolver(AddEditPostSchema),
  });

  const id = watch("id");
  const isEdit = !!id;

  const onSubmit = async (body: AddEditPostType) => {
    try {
      showLoader(true);
      let promise: Promise<any>;

      const params: AddEditPostTypeRequest = {
        ...body,
        tags: body.tags.split(","),
      };

      if (isEdit) {
        promise = postServices.edit(id, params);
      } else {
        promise = postServices.create(params);
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
    setValue("title", "");
    setValue("slug", "");
    setValue("description", "");
    setValue("thumbnail", "");
    setValue("content", "");
    setValue("status", EPostStatus.Draft);
    setValue("categories", []);
    setValue("tags", "");
    setValue("priority", 0);
  };

  const fetchCategories = async () => {
    try {
      showLoader(true);
      const response = await categoryServices.getAll();

      setCategoryOptions(
        response.map((x) => ({
          label: x.name,
          value: String(x.id),
        })),
      );
    } catch (error) {
      toast({
        title: "Đã có lỗi xảy ra.",
        variant: "destructive",
      });
    } finally {
      showLoader(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Typography text="Tạo bài viết mới" className="!text-2xl" />

      <form
        className="mt-6 flex w-full max-w-[700px] flex-col gap-y-6 rounded-[10px] border border-[#ddd] px-8 py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-end">
          <RadioGroup
            className="flex gap-x-5"
            defaultValue={EPostStatus.Draft}
            value={watch("status")}
            onValueChange={(value) => setValue("status", value as EPostStatus)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={EPostStatus.Draft}
                id={EPostStatus.Draft}
              />
              <label htmlFor={EPostStatus.Draft} className="cursor-pointer">
                Lưu nháp
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={EPostStatus.Publish}
                id={EPostStatus.Publish}
              />
              <label htmlFor={EPostStatus.Publish} className="cursor-pointer">
                Đăng tải
              </label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-y-1.5">
          <Label text="Categories" required />
          <MultiSelect
            options={categoryOptions}
            defaultValue={watch("categories") || []}
            onValueChange={(value) => setValue("categories", value)}
            placeholder="Chọn thể loại"
            variant="inverted"
            maxCount={3}
          />
          <ErrorMessage message={errors.categories?.message} />
        </div>

        <div className="flex flex-col gap-y-1.5">
          <Label text="Tiêu đề" required />
          <Input
            placeholder="Nhập title bài viết"
            {...register("title")}
            onChange={(e) => {
              const value = e.target.value;
              const slug = convertTitleToSlug(value);
              setValue("title", value);
              setValue("slug", slug);
            }}
          />
          <ErrorMessage message={errors.title?.message} />
        </div>

        <div className="flex flex-col gap-y-1.5">
          <Label text="Mô tả cụ thể" required />
          <Input
            placeholder="Nhập description của category"
            {...register("description")}
          />
          <ErrorMessage message={errors.description?.message} />
        </div>

        <div className="flex flex-col gap-y-1.5">
          <Label text="Slug" required />
          <Input placeholder="Nhập slug" {...register("slug")} />
          <ErrorMessage message={errors.slug?.message} />
        </div>

        <div className="flex flex-col gap-y-1.5">
          <Label text="Ảnh của bài viết" required />
          <div className="flex">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res: any) => {
                toast({
                  title: "Đã upload ảnh thành công",
                });

                setValue("thumbnail", res?.[0]?.url);
              }}
              onUploadError={() => {
                toast({
                  title: "Upload ảnh thất bại",
                  variant: "destructive",
                });
              }}
            />
          </div>
          {watch("thumbnail") && (
            <Image
              src={watch("thumbnail")}
              alt="thumbnail"
              height={100}
              width={100}
            />
          )}
          <ErrorMessage message={errors.thumbnail?.message} />
        </div>

        <div className="flex flex-col gap-y-1.5">
          <Label text="Content của bài viết" required />
          <div className="flex">
            <UploadButton
              endpoint="markdownUploader"
              onClientUploadComplete={(res: any) => {
                toast({
                  title: "Đã upload markdown thành công",
                });

                setValue("content", res?.[0]?.url);
              }}
              onUploadError={() => {
                toast({
                  title: "Upload markdown thất bại",
                  variant: "destructive",
                });
              }}
            />
          </div>
          <ErrorMessage message={errors.content?.message} />
        </div>

        <div className="flex flex-col gap-y-1.5">
          <Label text="Tags" required />
          <Input placeholder="Nhập tags của bài viết" {...register("tags")} />
          <ErrorMessage message={errors.tags?.message} />
        </div>

        {isEdit && (
          <div className="flex flex-col gap-y-1.5">
            <Label
              text="Độ ưu tiên"
              required
              textHelper="Độ ưu tiên 0 là cao nhất..."
            />
            <Input
              {...register("priority")}
              placeholder="Độ ưu tiên bài viết"
              type="number"
            />
            <ErrorMessage message={errors.priority?.message} />
          </div>
        )}

        <div className="flex items-center justify-center gap-x-3">
          <Button
            type="button"
            variant="ghost"
            className="rounded-[10px] border border-[#ddd] text-title"
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
