import svgPaths from "./svg-qqp172mp07";

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p317fdd80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p4b27f00} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pe97dd00} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p31c78b80} id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function CustomerBaseMatrix() {
  return (
    <div className="bg-blue-100 content-stretch flex items-center justify-center relative rounded-[8.75px] shrink-0 size-[31.5px]" data-name="CustomerBaseMatrix">
      <Icon />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[15px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Bold',sans-serif] grow leading-[15px] min-h-px min-w-px not-italic relative shrink-0 text-[#6a7282] text-[10px] tracking-[0.5px] uppercase">TOTAL CUSTOMER BASE</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[24.5px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Bold',sans-serif] grow leading-[24.5px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[17.5px]">45,892</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[15px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arial:Regular',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#6a7282] text-[10px] text-nowrap whitespace-pre">Total Customers</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[41.25px] relative shrink-0 w-[70.672px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[1.75px] h-[41.25px] items-start relative w-[70.672px]">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container />
    </div>
  );
}

function CustomerBaseMatrix1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[7px] grow items-start min-h-px min-w-px relative shrink-0" data-name="CustomerBaseMatrix">
      <Paragraph />
      <Container1 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[15px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Bold',sans-serif] grow leading-[15px] min-h-px min-w-px not-italic relative shrink-0 text-[#099250] text-[10px] tracking-[0.5px] uppercase">New This Year</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Arial:Bold',sans-serif] h-[21px] leading-[24.5px] not-italic relative shrink-0 text-[17.5px] text-green-700 w-[30px]">892</p>
      <div className="flex h-[19px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "19", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[19px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]" style={{ "--stroke-0": "rgba(226, 232, 240, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 1">
                <line id="Line 14" stroke="var(--stroke-0, #E2E8F0)" strokeLinecap="round" x1="0.5" x2="18.5" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Arial:Bold',sans-serif] h-[21px] leading-[24.5px] not-italic relative shrink-0 text-[17.5px] text-green-700 w-[95px]">0.50M OMR</p>
    </div>
  );
}

function Paragraph5() {
  return <div className="h-[15px] shrink-0 w-full" data-name="Paragraph" />;
}

function Container2() {
  return (
    <div className="h-[41.25px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[1.75px] h-[41.25px] items-start relative">
        <Paragraph4 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container2 />
    </div>
  );
}

function CustomerBaseMatrix2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[7px] grow items-start min-h-px min-w-px relative shrink-0" data-name="CustomerBaseMatrix">
      <Paragraph3 />
      <Container3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[11px] items-start relative shrink-0 w-full">
      <CustomerBaseMatrix1 />
      <CustomerBaseMatrix2 />
    </div>
  );
}

export default function Container4() {
  return (
    <div className="bg-[rgba(239,246,255,0.5)] relative rounded-[12.75px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(190,219,255,0.5)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[11px] items-start p-[15px] relative size-full">
          <CustomerBaseMatrix />
          <Frame />
        </div>
      </div>
    </div>
  );
}