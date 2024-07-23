"use client";

import Typography from "@/components/common/Typography";
import IconClose from "@/components/icons/IconClose";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LIMIT_FILE_SIZE } from "@/constants/common";
import { useLoader } from "@/hooks/useLoader";
import {
  AddEditImageSchema,
  type AddEditImageItemType,
  type AddEditImageType,
} from "@/libs/schema/image.schema";
import { checkFileSizeExceed } from "@/utils/files";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";

import BaseVideo from "@/components/common/BaseVideo";
import { imageServices } from "@/services/client/images.service";
import { MediaType } from "@prisma/client";

interface Props {
  isEdit?: boolean;
  defaultValues?: AddEditImageItemType[];
  onSubmit: () => void;
}

export default function FormAddEditImages({
  onSubmit: onSubmitProps,
  defaultValues,
  isEdit,
}: Props) {
  const { toast } = useToast();
  const { showLoader } = useLoader();

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<AddEditImageType>({
      defaultValues: defaultValues
        ? { data: defaultValues }
        : {
            data: [],
          },
      resolver: zodResolver(AddEditImageSchema),
    });

  const handleUploadImages = async (body: AddEditImageType) => {
    try {
      if (!body.data.length) return [];

      const formData: FormData = new FormData();

      body.data
        .filter((item) => !item.id)
        .forEach((item) => {
          formData.append("files", item.url as File);
        });

      const data = await imageServices.upload(formData);

      return data ?? [];
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload ảnh bị lỗi",
      });
    }
  };

  const onSubmit = async (body: AddEditImageType) => {
    try {
      showLoader(true);

      const uploadedImages = await handleUploadImages(body);

      let promise: Promise<any>;

      let trackingIndex = uploadedImages && uploadedImages?.length > 0 ? 0 : -1;

      const params: AddEditImageType = {
        data: body.data.map((item) => {
          const record: any = {
            text: item.text,
            type: item.type,
          };
          if (item.id) record.id = item.id;

          if (typeof item.url !== "string") {
            record.url = uploadedImages?.[trackingIndex];
            ++trackingIndex;
          } else {
            record.url = item.url;
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return record;
        }),
      };

      if (isEdit) {
        promise = imageServices.edit(params);
      } else {
        promise = imageServices.create(params);
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
    reset({ data: [] });
  };

  const handleUploadMultipleFiles = (
    e: ChangeEvent<HTMLInputElement>,
    type: MediaType,
  ) => {
    const files = e.target.files!;

    if (!files?.length) return;

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    const invalidFiles: string[] = [];
    const validFiles: AddEditImageItemType[] = [];

    for (const file of files) {
      if (file) {
        const isInvalidImage = checkFileSizeExceed(LIMIT_FILE_SIZE, file);
        if (isInvalidImage) {
          invalidFiles.push(`File ${file.name} vượt quá dung lượng cho phép`);
          continue;
        }

        validFiles.push({ text: "", url: file, type });
      }
    }

    if (validFiles.length) {
      setValue("data", [...watch("data"), ...validFiles]);
    }

    if (invalidFiles.length > 0) {
      invalidFiles.forEach((x) => toast({ variant: "destructive", title: x }));
    }
  };

  const handleRemoveImage = (idx: number) => {
    setValue(
      "data",
      watch("data").filter((_, index) => index !== idx),
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Typography text="Tạo bài những ảnh mới" className="!text-2xl" />

      <form
        className="mt-6 flex w-full max-w-[700px] flex-col gap-y-6 rounded-[10px] border border-ddd px-8 py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          htmlFor="upload-multiple-images"
          className="w-full cursor-pointer rounded-[10px] bg-primary px-6 py-3 text-center font-medium text-white"
        >
          <input
            id="upload-multiple-images"
            accept="image/*"
            type="file"
            multiple
            name="images"
            className="hidden"
            onChange={(e) => handleUploadMultipleFiles(e, MediaType.Image)}
          />
          Upload ảnh
        </label>

        <label
          htmlFor="upload-multiple-videos"
          className="mt-4 w-full cursor-pointer rounded-[10px] bg-primary px-6 py-3 text-center font-medium text-white"
        >
          <input
            id="upload-multiple-videos"
            accept="video/*"
            type="file"
            multiple
            name="videos"
            className="hidden"
            onChange={(e) => handleUploadMultipleFiles(e, MediaType.Video)}
          />
          Upload video
        </label>

        <div className="my-5 flex flex-col gap-y-6">
          {watch("data")?.map((item: AddEditImageItemType, index) => {
            const source =
              typeof item.url === "string"
                ? item.url
                : URL.createObjectURL(item.url);
            return (
              <div
                className="flex items-center gap-x-4"
                // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
                key={`id_${item?.id ? item.id : "_"}_index_${index}`}
              >
                <div className="relative h-40 w-40 rounded-[10px] border border-[#ddd] p-1">
                  {item.type === MediaType.Image ? (
                    <Image
                      src={source}
                      layout="fill"
                      objectFit="contain"
                      alt={""}
                    />
                  ) : (
                    <BaseVideo src={source} />
                  )}

                  <IconClose
                    onClick={() => handleRemoveImage(index)}
                    className="absolute right-1 top-1 cursor-pointer rounded-full border border-[#ddd] bg-red-500 p-1 text-white transition-all hover:bg-red-200"
                    width={20}
                    height={20}
                  />
                </div>

                <Input
                  placeholder="Nhập text"
                  {...register(`data.${index}.text`)}
                />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-x-3">
          <Button
            type="button"
            variant="ghost"
            className="rounded-[10px] border border-ddd text-title"
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
