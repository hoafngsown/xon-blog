import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { cn } from "@/libs/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface Props {
  title?: string;
  titleClassName?: string;
  description?: string;
  descriptionClassName?: string;
  children?: ReactNode;
  footer?: ReactNode;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  cancelText?: string;
  okText?: string;
  wrapperClassName?: string;
  onOk?: () => any;
  onCancel?: () => any;
  disabledOkButton?: boolean;
}

export function BaseModal(props: Props) {
  const {
    title,
    description,
    children,
    footer,
    open,
    setOpen,
    cancelText,
    okText,
    titleClassName,
    descriptionClassName,
    wrapperClassName,
    onOk,
    onCancel,
    disabledOkButton,
  } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogContent
        className={cn(
          "min-h-40 rounded-[10px] bg-white sm:max-w-[425px] md:max-w-[600px]",
          wrapperClassName,
        )}
      >
        <DialogHeader>
          {title && (
            <DialogTitle
              className={cn("text-xl font-bold md:text-2xl", titleClassName)}
            >
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription
              className={cn(
                "text-base font-medium text-secondary",
                descriptionClassName,
              )}
            >
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {children && children}

        {footer ? (
          footer
        ) : (
          <DialogFooter>
            <div className="flex items-center justify-end gap-x-4">
              <Button
                variant="outline"
                className="rounded-[10px]"
                type="button"
                onClick={() => {
                  onCancel?.();
                  setOpen(false);
                }}
              >
                {cancelText ?? "Huỷ"}
              </Button>

              <Button
                disabled={disabledOkButton}
                variant="default"
                className="rounded-[50px]"
                onClick={onOk}
                type="button"
              >
                {okText ?? "Xác nhận"}
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
