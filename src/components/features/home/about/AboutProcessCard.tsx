import AboutCardVisual from "./AboutCardVisual";
import type { AboutCard } from "./about-types";

type AboutProcessCardProps = {
  card: AboutCard;
};

export default function AboutProcessCard({ card }: AboutProcessCardProps) {
  const usesEdgeToEdgeVisual = card.type === "board" || card.type === "nodes";

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-bg-hover p-4 sm:p-5">
      <div
        className={
          usesEdgeToEdgeVisual ? "-mx-4 -mt-4 mb-4 sm:-mx-5 sm:-mt-5" : "mb-4 p-2 pb-0 sm:p-4 sm:pb-0"
        }
      >
        <AboutCardVisual type={card.type} />
      </div>

      <div className="relative z-10 mt-auto rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
        <h3 className="text-xl font-semibold text-text-primary sm:text-2xl sm:min-h-9 sm:max-h-9 sm:overflow-hidden sm:[display:-webkit-box] sm:[-webkit-line-clamp:2] sm:[-webkit-box-orient:vertical]">
          {card.title}
        </h3>
        <p className="mt-2 text-base font-medium leading-relaxed text-text-secondary sm:text-lg sm:min-h-16 sm:max-h-16 sm:overflow-hidden sm:[display:-webkit-box] sm:[-webkit-line-clamp:3] sm:[-webkit-box-orient:vertical]">
          {card.description}
        </p>
      </div>
    </article>
  );
}
