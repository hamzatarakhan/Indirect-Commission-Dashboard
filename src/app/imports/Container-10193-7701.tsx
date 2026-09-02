function Paragraph() {
  return (
    <div className="content-stretch flex h-[14.003px] items-start relative shrink-0 w-[150.667px]" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[14px] min-h-px min-w-px not-italic relative shrink-0 text-[#6a7282] text-[10.5px] tracking-[0.2625px] uppercase">Revenue</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Arial:Bold',sans-serif] leading-[24.5px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap whitespace-pre">15.6M OMR</p>
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 bg-slate-50 grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.5px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[3.496px] items-start p-[8px] relative w-full">
          <Paragraph />
          <Paragraph1 />
        </div>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[14.003px] items-start relative shrink-0 w-[150.667px]" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[14px] min-h-px min-w-px not-italic relative shrink-0 text-[#6a7282] text-[10.5px] tracking-[0.2625px] uppercase">Target</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Arial:Bold',sans-serif] leading-[24.5px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap whitespace-pre">16.5M OMR</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 bg-slate-50 grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.5px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[3.496px] items-start p-[8px] relative w-full">
          <Paragraph2 />
          <Paragraph3 />
        </div>
      </div>
    </div>
  );
}

export default function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative size-full" data-name="Container">
      <Container />
      <Container1 />
    </div>
  );
}