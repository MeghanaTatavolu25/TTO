import { useEffect, useState } from "react";

export default function ResponsiveImage({ src, alt, maxWidth, maxHeight }) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const pixelRatio = 100 / (window.innerWidth * window.devicePixelRatio);
      console.log(window.innerWidth)
      console.log(pixelRatio)
      console.log(img.width, img.height)
      const width = Math.min(img.width, maxWidth);
      const height = Math.min(img.height, maxHeight);
      const widthInVw = width * pixelRatio;
      const heightInVw = height * pixelRatio;
      setImageSize({ width: widthInVw, height: heightInVw });
    };
  }, [src, maxWidth, maxHeight]);

  return (
    <img src={src} alt={alt} style={{ width: `${imageSize.width}vw`, height: `${imageSize.height}vw` }} />
  );
}
