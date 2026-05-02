import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CartaDish } from "../data/carta-carousel-slides";

const rowClass =
  "grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 items-start menu-option-card rounded-lg py-2 border border-transparent";

export type MenuCartaCarouselProps = {
  slides: CartaDish[][];
  ariaLabel: string;
  prevLabel: string;
  nextLabel: string;
};

export default function MenuCartaCarousel({
  slides,
  ariaLabel,
  prevLabel,
  nextLabel,
}: MenuCartaCarouselProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const upd = () => setReduceMotion(mq.matches);
    upd();
    mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);

  const options = useMemo(
    () => ({
      loop: slides.length > 1,
      align: "start" as const,
      duration: reduceMotion ? 0 : 25,
    }),
    [slides.length, reduceMotion],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(slides.length);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState<number | undefined>(
    undefined,
  );

  const syncHeight = useCallback(() => {
    if (!emblaApi) return;
    const nodes = emblaApi.slideNodes();
    const i = emblaApi.selectedScrollSnap();
    const el = nodes[i];
    if (el) setViewportHeight(Math.ceil(el.scrollHeight));
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollProgress(emblaApi.scrollProgress());
      syncHeight();
    };
    const onScroll = () => {
      setScrollProgress(emblaApi.scrollProgress());
    };
    const onReInit = () => {
      setSnapCount(emblaApi.scrollSnapList().length);
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollProgress(emblaApi.scrollProgress());
      syncHeight();
    };
    onReInit();
    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onReInit);
    const ro = new ResizeObserver(() => syncHeight());
    emblaApi.slideNodes().forEach((n) => ro.observe(n));
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onReInit);
      ro.disconnect();
    };
  }, [emblaApi, syncHeight]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, slides]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const canNav = snapCount > 1;
  const statusText = canNav ? `Grupo ${selectedIndex + 1} de ${snapCount}` : "";
  const progressRatio = canNav
    ? Math.min(1, Math.max(0, scrollProgress))
    : 1;
  const progressPercent = Math.round(progressRatio * 100);

  return (
    <div
      className="menu-carta-carousel w-full min-w-0"
      role="region"
      aria-roledescription="carrusel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          emblaApi?.scrollNext();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          emblaApi?.scrollPrev();
        }
      }}
    >
      <div
        className="menu-carta-carousel__viewport overflow-hidden rounded-lg motion-safe:transition-[height] motion-safe:duration-300"
        style={{
          height: viewportHeight ? `${viewportHeight}px` : undefined,
          transitionTimingFunction:
            "var(--motion-snap, cubic-bezier(0.2, 0.9, 0.16, 1))",
        }}
      >
        <div className="h-full overflow-hidden" ref={emblaRef}>
          <div className="menu-carta-embla__container flex touch-pan-y items-start">
            {slides.map((items, slideIdx) => (
              <div
                className="menu-carta-embla__slide min-h-0 min-w-0 shrink-0 grow-0 basis-full"
                key={slideIdx}
              >
                <div className="space-y-3">
                  {items.map((dish) => (
                    <div
                      className={rowClass}
                      key={`${slideIdx}-${dish.name}-${dish.price}`}
                    >
                      <div className="min-w-0">
                        <h3 className="font-headline text-xl font-bold text-on-surface mb-1">
                          {dish.name}
                        </h3>
                        <p className="font-body text-sm text-on-surface-variant">
                          {dish.description}
                        </p>
                      </div>
                      <span className="font-headline text-primary font-bold shrink-0">
                        {dish.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="menu-carta-carousel__nav mt-6 box-border flex w-full min-w-0 items-center gap-3 pt-6 border-t border-outline-variant/15 sm:gap-4">
        <div className="menu-carta-carousel__arrows flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="menu-carta-carousel__btn flex size-11 shrink-0 items-center justify-center rounded-full border border-outline-variant/35 text-on-surface transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-25"
            aria-label={prevLabel}
            disabled={!canNav}
            onClick={scrollPrev}
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            className="menu-carta-carousel__btn flex size-11 shrink-0 items-center justify-center rounded-full border border-outline-variant/35 text-on-surface transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-25"
            aria-label={nextLabel}
            disabled={!canNav}
            onClick={scrollNext}
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
        <div
          className="menu-carta-carousel__progress min-h-11 min-w-0 flex-1 py-4"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
          aria-valuetext={statusText || "Único grupo"}
        >
          <div className="menu-carta-carousel__progress-track">
            <div
              className="menu-carta-carousel__progress-fill motion-safe:transition-[width] motion-safe:duration-150 motion-safe:ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {statusText}
      </p>
    </div>
  );
}
