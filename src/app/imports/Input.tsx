import svgPaths from "./svg-kcq3xketsx";

export default function Input() {
  return (
    <div className="bg-[#f3f3f5] relative rounded-[6.75px] size-full" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[8px] py-[3.5px] relative size-full">
          <div className="relative shrink-0 size-[13.986px]" data-name="Icon">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <g id="Icon">
                <path d={svgPaths.p1d4cac00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16546" />
                <path d={svgPaths.p15a39800} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16546" />
              </g>
            </svg>
          </div>
          <p className="font-['Arial:Regular',sans-serif] leading-[normal] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#717182] text-[12.25px] text-nowrap">Search by CR Name or number ...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
    </div>
  );
}