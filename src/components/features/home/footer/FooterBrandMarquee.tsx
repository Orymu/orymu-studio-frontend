type FooterBrandMarqueeProps = {
  brand: string;
};

export default function FooterBrandMarquee({ brand }: FooterBrandMarqueeProps) {
  return (
    <div className="mt-2 w-full overflow-hidden px-0 pb-10 sm:pb-12">
      <p className="-ml-8 w-full select-none whitespace-nowrap text-center text-[clamp(88px,17vw,340px)] font-semibold leading-[0.82] tracking-[-0.03em] text-text-brand/50">
        {brand}
      </p>
    </div>
  );
}
