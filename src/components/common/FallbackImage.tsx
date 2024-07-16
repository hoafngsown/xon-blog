import DefaultUserImage from "@/statics/images/fallback-user.jpeg";
import Image, {
  type ImageProps,
  type StaticImageData,
} from "next/legacy/image";
import { useEffect, useState } from "react";

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string | StaticImageData;
}

const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc ?? DefaultUserImage);
      }}
      alt="fallback-image"
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
      title="fallback-image"
    />
  );
};

export default ImageWithFallback;
