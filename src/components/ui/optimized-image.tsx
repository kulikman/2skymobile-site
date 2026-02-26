import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  ...props
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(className)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      sizes={sizes}
      {...props}
    />
  );
}
