import { isValidElement, type ReactElement, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  /**
   * Hint for browser layout reservation when content-visibility: auto skips
   * rendering. Should approximate the rendered section height.
   */
  intrinsicSize?: string;
  /** @deprecated kept for backwards compatibility — no longer used. */
  rootMargin?: string;
  /** @deprecated kept for backwards compatibility — no longer used. */
  threshold?: number;
}

type SkeletonElement = ReactElement<{ height?: string }>;

const isSkeletonElement = (node: ReactNode): node is SkeletonElement => {
  if (!isValidElement(node)) return false;
  const props = node.props as { height?: unknown };
  return typeof props.height === "string";
};

/**
 * Renders children both server-side and client-side so they appear in initial
 * HTML for SEO/crawlers, while using the native `content-visibility: auto`
 * CSS optimization to skip layout/paint of the subtree until it scrolls near
 * the viewport. This replaces the older IntersectionObserver-based mount/unmount
 * approach which hid content from server-rendered HTML.
 */
export function LazySection({
  children,
  fallback,
  intrinsicSize,
}: LazySectionProps) {
  let intrinsic = intrinsicSize ?? "auto 1600px";
  if (!intrinsicSize && isSkeletonElement(fallback) && fallback.props.height) {
    intrinsic = `auto ${fallback.props.height}`;
  }

  return (
    <div
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: intrinsic,
      }}
    >
      {children}
    </div>
  );
}

export function SectionSkeleton({ height = "400px" }: { height?: string }) {
  return (
    <div
      className="animate-pulse bg-muted/30 rounded-lg"
      style={{ minHeight: height }}
    />
  );
}
