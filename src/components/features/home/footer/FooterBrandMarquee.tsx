type FooterBrandMarqueeProps = {
  brand: string;
};

export default function FooterBrandMarquee({ brand }: FooterBrandMarqueeProps) {
  return (
    <div className="mt-2 w-full overflow-hidden px-0 pb-10 sm:pb-12">
      <p className="-ml-2 mx-0 select-none whitespace-nowrap text-[92px] font-semibold leading-[0.86] tracking-tight text-text-brand/50 sm:-ml-6 sm:text-[150px] md:-ml-10 md:text-[230px] lg:text-[300px] xl:text-[320px]">
        {brand}
      </p>
    </div>
  );
}
