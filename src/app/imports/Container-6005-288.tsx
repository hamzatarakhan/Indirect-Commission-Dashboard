import svgPaths from "./svg-bt4ferlwwr";

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p2634b780} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p317fdd80} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p31c78b80} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[14px]">
        <Icon />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[12.25px] relative shrink-0 w-[96.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[12.25px] relative w-[96.922px]">
        <p className="absolute font-['Arial:Regular',_sans-serif] leading-[12.25px] left-0 not-italic text-[#101828] text-[12.25px] text-nowrap top-[-1px] whitespace-pre">{`Senior Manager  Overview `}</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[14px] relative shrink-0 w-[121.422px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10.5px] h-[14px] items-center justify-center relative w-[121.422px]">
        <Container />
        <Text />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[17.5px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Arial:Bold',_sans-serif] grow leading-[17.5px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[12.25px] text-right">5</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[14px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['Arial:Regular',_sans-serif] leading-[14px] not-italic relative shrink-0 text-[#4a5565] text-[10.5px] text-nowrap text-right whitespace-pre">Verticals</p>
    </div>
  );
}

function VerticalStatsCard() {
  return (
    <div className="h-[31.5px] relative shrink-0" data-name="VerticalStatsCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[31.5px] items-start relative">
        <Container2 />
        <Container3 />
      </div>
    </div>
  );
}

function VerticalStatsCard1() {
  return (
    <div className="bg-[#d1d5dc] h-[21px] relative shrink-0 w-px" data-name="VerticalStatsCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] w-px" />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[17.5px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Arial:Bold',_sans-serif] grow leading-[17.5px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[12.25px] text-right">12</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[14px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['Arial:Regular',_sans-serif] leading-[14px] not-italic relative shrink-0 text-[#4a5565] text-[10.5px] text-nowrap text-right whitespace-pre">Companies</p>
    </div>
  );
}

function VerticalStatsCard2() {
  return (
    <div className="h-[31.5px] relative shrink-0" data-name="VerticalStatsCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[31.5px] items-start relative">
        <Container4 />
        <Container5 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[17.5px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Arial:Bold',_sans-serif] grow leading-[17.5px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[12.25px] text-right">8</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[14px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['Arial:Regular',_sans-serif] leading-[14px] not-italic relative shrink-0 text-[#4a5565] text-[10.5px] text-nowrap text-right whitespace-pre">Account Managers</p>
    </div>
  );
}

function VerticalStatsCard4() {
  return (
    <div className="h-[31.5px] relative shrink-0" data-name="VerticalStatsCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[31.5px] items-start relative">
        <Container6 />
        <Container7 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[31.5px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10.5px] h-[31.5px] items-center relative">
        <VerticalStatsCard />
        <VerticalStatsCard1 />
        <VerticalStatsCard2 />
        <VerticalStatsCard1 />
        <VerticalStatsCard4 />
      </div>
    </div>
  );
}

function KpiCard() {
  return (
    <div className="h-[94px] relative shrink-0 w-full" data-name="KPICard">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[94px] items-center justify-between px-[24px] py-0 relative w-full">
          <Container1 />
          <Container8 />
        </div>
      </div>
    </div>
  );
}

export default function Container9() {
  return (
    <div className="bg-[rgba(239,246,255,0.4)] relative rounded-[8.75px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(190,219,255,0.5)] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[2px] relative size-full">
          <KpiCard />
        </div>
      </div>
    </div>
  );
}