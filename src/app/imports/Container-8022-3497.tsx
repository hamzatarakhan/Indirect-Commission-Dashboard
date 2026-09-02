import svgPaths from "./svg-krhlt67d57";

function Icon() {
  return (
    <div className="h-[18.286px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[62.5%_33.34%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 7">
            <path d={svgPaths.p1f018680} id="Vector" stroke="var(--stroke-0, #007A55)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.52381" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[13.04%_20.85%_54.7%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-12.92%_-33.38%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 8">
            <path d={svgPaths.p2fc9a250} id="Vector" stroke="var(--stroke-0, #007A55)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.52381" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[63.04%_8.33%_12.5%_79.17%]" data-name="Vector">
        <div className="absolute inset-[-17.04%_-33.33%_-17.04%_-33.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 6">
            <path d={svgPaths.p14e3cac0} id="Vector" stroke="var(--stroke-0, #007A55)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.52381" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_45.84%_54.17%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.pe0cde00} id="Vector" stroke="var(--stroke-0, #007A55)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.52381" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[rgba(208,250,229,0.8)] relative rounded-[11.429px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[6.857px] px-[6.857px] relative size-[32px]">
        <Icon />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[15px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arial:Regular',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#007a55] text-[10px] text-nowrap tracking-[0.5px] uppercase whitespace-pre">Active Base</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Paragraph">
      <div className="basis-0 flex flex-col font-['Arial:Bold',sans-serif] grow h-[19px] justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#004f3b] text-[14px] tracking-[-0.4375px]">
        <p className="leading-[24.5px]">45,892</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] items-start justify-center relative w-full">
        <Paragraph />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="bg-[rgba(208,250,229,0.8)] relative rounded-[8.75px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center px-[6px] py-[2px] relative">
        <p className="font-['Arial:Bold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#006045] text-[10px] w-[30px]">+4.2%</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0 w-full" data-name="Container">
      <Container />
      <Frame />
      <Text />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[15px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[15px] min-h-px min-w-px not-italic relative shrink-0 text-[10px] text-[rgba(0,153,102,0.8)]">Total Customers</p>
    </div>
  );
}

function CustomerBaseMatrix() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-full" data-name="CustomerBaseMatrix">
      <Container1 />
      <Paragraph2 />
    </div>
  );
}

export default function Container2() {
  return (
    <div className="relative rounded-[8px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[12px] relative size-full">
          <CustomerBaseMatrix />
        </div>
      </div>
    </div>
  );
}