import svgPaths from "./svg-flhah0ri34";

function Text() {
  return (
    <div className="h-[14.003px] relative shrink-0 w-[56.271px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[14.003px] items-start relative w-[56.271px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[14px] not-italic relative shrink-0 text-[10.5px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre">View Details</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[10.489px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
        <g id="Icon">
          <path d={svgPaths.p43ff660} id="Vector" stroke="var(--stroke-0, #000B25)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.64" strokeWidth="0.874095" />
          <path d={svgPaths.p1124cd80} id="Vector_2" stroke="var(--stroke-0, #000B25)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.64" strokeWidth="0.874095" />
          <path d={svgPaths.p20e727d8} id="Vector_3" stroke="var(--stroke-0, #000B25)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.64" strokeWidth="0.874095" />
        </g>
      </svg>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-slate-50 relative rounded-[4px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[6.993px] items-center justify-center pl-px pr-[1.017px] py-[5px] relative size-full">
          <Text />
          <Icon />
        </div>
      </div>
    </div>
  );
}