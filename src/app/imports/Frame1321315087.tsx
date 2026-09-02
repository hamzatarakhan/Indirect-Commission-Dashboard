import svgPaths from "./svg-udc5h4xcpt";

function Container() {
  return <div className="bg-[#0072ce] h-[25px] rounded-[3.96025e+07px] shrink-0 w-[2px]" data-name="Container" />;
}

function Paragraph() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[21px] relative shrink-0 text-[#000b25] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Monthly Performance
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[35px] relative shrink-0 w-[578px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[35px] items-center relative w-[578px]">
        <Container />
        <Paragraph />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[13.997px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1873c980} id="Vector" stroke="var(--stroke-0, #000B25)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.64" strokeWidth="1.16642" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative size-[17.482px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[0.018px] pr-0 py-0 relative size-[17.482px]">
        <Icon />
      </div>
    </div>
  );
}

function RevenueMatrix() {
  return (
    <div className="bg-slate-100 h-[34.965px] relative rounded-[8px] shrink-0 w-full" data-name="RevenueMatrix">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[34.965px] items-center justify-between pl-px pr-[13px] py-px relative w-full">
          <Frame />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg]">
              <Container1 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full">
      <RevenueMatrix />
    </div>
  );
}