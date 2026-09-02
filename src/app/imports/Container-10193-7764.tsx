import svgPaths from "./svg-ha9xpeg1k0";

function Icon() {
  return (
    <div className="h-[17.499px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[16.67%] left-1/2 right-[49.96%] top-[83.33%]" data-name="Vector">
        <div className="absolute inset-[-0.73px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
            <path d="M0.729134 0.729134H0.736425" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45827" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_8.33%_63.25%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-26.18%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 5">
            <path d={svgPaths.p2d55c900} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45827" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_20.83%_46.42%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-34.98%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 4">
            <path d={svgPaths.pe8f0f80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45827" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.5%_35.42%_31.55%_35.42%]" data-name="Vector">
        <div className="absolute inset-[-69.96%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 3">
            <path d={svgPaths.p20757880} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45827" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[rgba(219,234,254,0.8)] relative rounded-[12.75px] shrink-0 size-[34.981px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8.741px] px-[8.741px] relative size-[34.981px]">
        <Icon />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[14.003px] relative shrink-0 w-[20.736px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[14.003px] relative w-[20.736px]">
        <p className="absolute font-['Arial:Bold',sans-serif] leading-[14px] left-0 not-italic text-[#007a55] text-[10.5px] text-nowrap top-[-1px] whitespace-pre">94%</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[14.003px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[231.575px] h-[14.003px] items-center justify-end relative w-full">
          <div className="basis-0 flex flex-col font-['Arial:Bold',sans-serif] grow h-[15px] justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">
            <p className="leading-[21px]">Fixed</p>
          </div>
          <Text />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return <div className="bg-emerald-400 h-[6.993px] rounded-[3.71704e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container3() {
  return (
    <div className="bg-gray-100 h-[6.993px] relative rounded-[3.71704e+07px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-[6.993px] items-start pl-0 pr-[20.632px] py-0 relative w-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[6.993px] h-[27.988px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container4 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10.489px] items-center relative w-full">
        <Container />
        <Container5 />
      </div>
    </div>
  );
}

export default function Container7() {
  return (
    <div className="content-stretch flex items-start justify-between relative size-full" data-name="Container">
      <Container6 />
    </div>
  );
}