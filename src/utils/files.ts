import { ACCEPT_IMAGE_TYPE } from "@/constants/common";

export const checkUploadFileType = (type: string) => {
  return ACCEPT_IMAGE_TYPE.includes(type.toLowerCase());
};

export const checkFileSizeExceed = (size: number, file?: File) => {
  if (file) {
    const fileSizeInMB = file.size / (1024 * 1024);

    if (fileSizeInMB > size) {
      return true;
    } else {
      return false;
    }
  }

  return false;
};
