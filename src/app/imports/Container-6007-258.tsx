import svgPaths from "./svg-cn46a646zj";

function Icon() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
        <g id="Icon">
          <path d={svgPaths.p1a7081e0} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
          <path d={svgPaths.p3286e6c0} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
      </svg>
    </div>
  );
}

function App() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center relative w-full">
        <p className="font-['Arial:Regular',_sans-serif] leading-[14.667px] not-italic relative shrink-0 text-[#155dfc] text-[11px] text-nowrap whitespace-pre">Senior Manager</p>
      </div>
    </div>
  );
}

function BreadcrumbLink() {
  return (
    <div className="basis-0 grow h-[14.656px] min-h-px min-w-px relative shrink-0" data-name="BreadcrumbLink">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.5px] h-[14.656px] items-center relative w-full">
        <Icon />
        <App />
      </div>
    </div>
  );
}

function BreadcrumbItem() {
  return (
    <div className="absolute content-stretch flex h-[14.656px] items-center left-0 top-0 w-[93.406px]" data-name="BreadcrumbItem">
      <BreadcrumbLink />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-0 size-[12.25px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d={svgPaths.p9c60250} id="Vector" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
        </g>
      </svg>
    </div>
  );
}

function BreadcrumbSeparator() {
  return (
    <div className="absolute left-[102.16px] size-[12.25px] top-[1.2px]" data-name="BreadcrumbSeparator">
      <Icon1 />
    </div>
  );
}

function BreadcrumbPage() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="BreadcrumbPage">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center relative w-full">
        <p className="font-['Arial:Bold',_sans-serif] leading-[14.667px] not-italic relative shrink-0 text-[#193cb8] text-[11px] text-nowrap whitespace-pre">Fatima Al-Zahra</p>
      </div>
    </div>
  );
}

function BreadcrumbItem1() {
  return (
    <div className="absolute content-stretch flex h-[14.656px] items-center left-[123.16px] top-0 w-[79.359px]" data-name="BreadcrumbItem">
      <BreadcrumbPage />
    </div>
  );
}

function BreadcrumbList() {
  return (
    <div className="h-[14.656px] relative shrink-0 w-[202.516px]" data-name="BreadcrumbList">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14.656px] relative w-[202.516px]">
        <BreadcrumbItem />
        <BreadcrumbSeparator />
        <BreadcrumbItem1 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[14px] relative shrink-0 w-[5.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[14px] items-start relative w-[5.281px]">
        <p className="font-['Arial:Regular',_sans-serif] leading-[14px] not-italic relative shrink-0 text-[10.5px] text-nowrap text-white whitespace-pre">F</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative rounded-[3.35544e+07px] shadow-[0px_0px_0px_2px_rgba(190,219,255,0.5)] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[28px]">
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex h-[14px] items-start relative shrink-0" data-name="Text">
      <p className="font-['Arial:Bold',_sans-serif] leading-[14px] not-italic relative shrink-0 text-[#101828] text-[10.5px] text-nowrap whitespace-pre">Fatima Al-Zahra</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-blue-100 h-[20.5px] relative rounded-[6.75px] shrink-0" data-name="Badge">
      <div className="box-border content-stretch flex gap-[3.5px] h-[20.5px] items-center justify-center overflow-clip px-[6.25px] py-[2.75px] relative rounded-[inherit]">
        <p className="font-['Arial:Regular',_sans-serif] leading-[15px] not-italic relative shrink-0 text-[#1447e6] text-[10px] text-nowrap whitespace-pre">KAM Level View</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[rgba(236,253,245,0.8)] h-[19.5px] relative rounded-[6.75px] shrink-0 w-[75.344px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[3.5px] h-[19.5px] items-center justify-center overflow-clip px-[8px] py-[2.75px] relative rounded-[inherit] w-[75.344px]">
        <p className="font-['Arial:Regular',_sans-serif] leading-[14px] not-italic relative shrink-0 text-[#007a55] text-[10.5px] text-nowrap whitespace-pre">Key Account</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#a4f4cf] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex h-[15px] items-start relative shrink-0 w-[3.172px]" data-name="Text">
      <p className="font-['Arial:Regular',_sans-serif] leading-[15px] not-italic relative shrink-0 text-[#99a1af] text-[10px] text-nowrap whitespace-pre">›</p>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[rgba(250,245,255,0.8)] h-[19.5px] relative rounded-[6.75px] shrink-0 w-[75.234px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[3.5px] h-[19.5px] items-center justify-center overflow-clip px-[8px] py-[2.75px] relative rounded-[inherit] w-[75.234px]">
        <p className="font-['Arial:Regular',_sans-serif] leading-[14px] not-italic relative shrink-0 text-[#8200db] text-[10.5px] text-nowrap whitespace-pre">Government</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] items-center relative">
        <Text1 />
        <Badge />
        <Badge1 />
        <Text2 />
        <Badge2 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[16.5px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16.5px] items-start relative">
        <p className="font-['Arial:Regular',_sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#4a5565] text-[11px] text-nowrap whitespace-pre">KAM0002</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[4.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16.5px] items-start relative w-[4.469px]">
        <p className="basis-0 font-['Arial:Regular',_sans-serif] grow leading-[16.5px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[11px]">•</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[107.172px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16.5px] items-start relative w-[107.172px]">
        <p className="font-['Arial:Regular',_sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#4a5565] text-[11px] text-nowrap whitespace-pre">vm0002@omantel.om</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[16.5px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7px] h-[16.5px] items-center relative">
        <Text3 />
        <Text4 />
        <Text5 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-full">
        <p className="absolute font-['Arial:Regular',_sans-serif] leading-[14px] left-0 not-italic text-[#155dfc] text-[10.5px] top-[-1px] w-[261px]">Viewing personalized performance data for quarterly Q3</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[1.75px] items-start relative">
        <Container1 />
        <Container2 />
        <Paragraph />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-gradient-to-r from-[#d4e2f4] relative rounded-[8.75px] shrink-0 to-[#e6ecff]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7px] items-center p-[9px] relative">
        <Container />
        <Container3 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <BreadcrumbList />
      <Container4 />
    </div>
  );
}

export default function Container6() {
  return (
    <div className="bg-gradient-to-r from-[rgba(239,246,255,0.8)] relative rounded-[4px] size-full to-[rgba(238,242,255,0.8)]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(190,219,255,0.3)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_10px_15px_-3px_rgba(43,127,255,0.05),0px_4px_6px_-4px_rgba(43,127,255,0.05)]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[8px] relative size-full">
          <Container5 />
        </div>
      </div>
    </div>
  );
}