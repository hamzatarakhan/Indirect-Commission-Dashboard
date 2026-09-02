import svgPaths from "./svg-ypqm0izsls";

function Icon() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.333%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <path d={svgPaths.p13f5b400} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-1/2 right-1/2 top-[33.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
            <path d="M0.583333 0.583333V2.91667" id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[33.33%] left-1/2 right-[49.96%] top-[66.67%]" data-name="Vector">
        <div className="absolute inset-[-0.583px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
            <path d="M0.583333 0.583333H0.589167" id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-red-50 box-border content-stretch flex flex-col items-start pb-0 pt-[5.25px] px-[5.25px] relative rounded-[8.75px] shrink-0 size-[24.5px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[15px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arial:Regular',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#4a5565] text-[10px] text-nowrap tracking-[0.5px] uppercase whitespace-pre">Due / Bad Debt</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Paragraph />
      <p className="font-['Arial:Bold',sans-serif] leading-[24.5px] not-italic relative shrink-0 text-[#c10007] text-[15.75px] text-nowrap whitespace-pre">1.85M OMR</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7px] items-center relative">
        <Container />
        <Frame />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[15px] items-start relative shrink-0" data-name="Paragraph">
      <p className="font-['Arial:Regular',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#6a7282] text-[10px] text-nowrap whitespace-pre">Due Amount</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[17.5px] items-start relative shrink-0" data-name="Paragraph">
      <p className="font-['Arial:Bold',sans-serif] leading-[17.5px] not-italic relative shrink-0 text-[#364153] text-[12.25px] text-nowrap whitespace-pre">1.11M OMR</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 bg-gray-50 grow h-[48.25px] min-h-px min-w-px relative rounded-[8.75px] shrink-0" data-name="Container">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[1.75px] h-[48.25px] items-start pb-0 pt-[7px] px-[8.75px] relative w-full">
          <Paragraph1 />
          <Paragraph2 />
        </div>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[15px] items-start relative shrink-0" data-name="Paragraph">
      <p className="font-['Arial:Regular',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#6a7282] text-[10px] text-nowrap whitespace-pre">Bad Debt</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex h-[17.5px] items-start relative shrink-0" data-name="Paragraph">
      <p className="font-['Arial:Bold',sans-serif] leading-[17.5px] not-italic relative shrink-0 text-[#364153] text-[12.25px] text-nowrap whitespace-pre">0.74M OMR</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="basis-0 bg-gray-50 grow h-[48.25px] min-h-px min-w-px relative rounded-[8.75px] shrink-0" data-name="Container">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[1.75px] h-[48.25px] items-start pb-0 pt-[7px] px-[8.75px] relative w-full">
          <Paragraph3 />
          <Paragraph4 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7px] h-[48px] items-start relative w-full">
        <Container1 />
        <Container2 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="bg-red-50 relative rounded-[8.75px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center px-[6px] py-0 relative">
        <p className="font-['Arial:Bold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#c10007] text-[10px] text-nowrap whitespace-pre">+5.1%</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Frame1 />
      <Container3 />
      <Text />
    </div>
  );
}

function CustomerBaseMatrix() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-full" data-name="CustomerBaseMatrix">
      <Container4 />
    </div>
  );
}

export default function Container5() {
  return (
    <div className="bg-white relative rounded-[12.75px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[16px] relative size-full">
          <CustomerBaseMatrix />
        </div>
      </div>
    </div>
  );
}