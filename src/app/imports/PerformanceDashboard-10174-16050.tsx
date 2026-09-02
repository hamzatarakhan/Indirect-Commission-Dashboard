import svgPaths from "./svg-53tk4hy4ll";

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M4.66667 1.16667V3.5" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.33333 1.16667V3.5" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p24a2b500} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 5.83333H12.25" id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="relative rounded-[8.75px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[28px]">
        <Icon />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[103.363px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-start relative w-[103.363px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[17.5px] not-italic relative shrink-0 text-[#101828] text-[12.25px] text-nowrap whitespace-pre">Jan 1 – Dec 5, 2024</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#00c950] opacity-[0.51] relative rounded-[2.68435e+07px] shrink-0 size-[5.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[5.25px]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[15px] relative shrink-0 w-[86.675px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[86.675px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#6a7282] text-[10px] text-nowrap top-[-1.2px] whitespace-pre">Live • Updates daily</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[15px] relative shrink-0 w-[103.363px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.25px] h-[15px] items-center relative w-[103.363px]">
        <Container1 />
        <Text1 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 grow h-[34.25px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[1.75px] h-[34.25px] items-start relative w-full">
        <Text />
        <Container2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[34.25px] relative shrink-0 w-[140.113px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8.75px] h-[34.25px] items-center relative w-[140.113px]">
        <Container />
        <Container3 />
      </div>
    </div>
  );
}

export default function PerformanceDashboard() {
  return (
    <div className="bg-slate-50 relative rounded-[12.75px] size-full" data-name="PerformanceDashboard">
      <div aria-hidden="true" className="absolute border border-[rgba(59,130,246,0.3)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center pl-[15px] pr-px py-px relative size-full">
          <Container4 />
        </div>
      </div>
    </div>
  );
}