function Frame40963() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="basis-0 flex flex-col font-['Roboto:Medium',_sans-serif] font-medium grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#000b25] text-[19px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.2]" dir="auto">
          Companies Performance
        </p>
      </div>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Card header">
      <Frame40963 />
    </div>
  );
}

function Item() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Item">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="box-border content-stretch flex items-end justify-center px-[24px] py-[7px] relative w-full">
          <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#6757eb] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            All Companies
          </p>
        </div>
      </div>
    </div>
  );
}

function Active() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Active">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[7px] relative w-full">
          <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Top Performers
          </p>
        </div>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Item">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[7px] relative w-full">
          <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Low Performers
          </p>
        </div>
      </div>
    </div>
  );
}

function Active1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Active">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[7px] relative w-full">
          <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Newley Added
          </p>
        </div>
      </div>
    </div>
  );
}

function SegmentedControl() {
  return (
    <div className="bg-[#f0f0f0] box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[4px] shrink-0 w-[542px]" data-name="Segmented Control">
      <Item />
      <Active />
      <Item1 />
      <Active1 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[20px]" data-name="Icon">
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#000b25] text-[17px] text-nowrap whitespace-pre">Search</p>
    </div>
  );
}

function Textfield() {
  return (
    <div className="bg-white h-[38px] relative rounded-[4px] shrink-0 w-full" data-name="Textfield">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[38px] items-center px-[12px] py-0 relative w-full">
          <p className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px relative shrink-0 text-[16px] text-[rgba(0,11,37,0.57)]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Search by company Name
          </p>
          <Icon1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Textfield1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[255px]" data-name="Textfield">
      <Textfield />
    </div>
  );
}

function Frame1000004527() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-between relative shrink-0 w-full">
      <SegmentedControl />
      <Textfield1 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-[97px]" data-name="Table header">
      <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[#000b25] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Companies
      </p>
    </div>
  );
}

function Cell() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative self-stretch shrink-0 w-[185px]" data-name="Cell">
      <TableHeader />
    </div>
  );
}

function Icon2() {
  return <div className="h-[12px] shrink-0 w-[8px]" data-name="Icon" />;
}

function TableHeader1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-[97px]" data-name="Table header">
      <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[#000b25] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Q1 Revenue
      </p>
      <Icon2 />
    </div>
  );
}

function Cell1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <TableHeader1 />
        </div>
      </div>
    </div>
  );
}

function TableHeader2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-[97px]" data-name="Table header">
      <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[#000b25] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Q2 Revenue
      </p>
    </div>
  );
}

function Cell2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <TableHeader2 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return <div className="h-[12px] shrink-0 w-[8px]" data-name="Icon" />;
}

function TableHeader3() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center justify-center min-h-px min-w-px relative shrink-0" data-name="Table header">
      <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[#000b25] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Performance
      </p>
      <Icon3 />
    </div>
  );
}

function Cell3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[8px] relative size-full">
          <TableHeader3 />
        </div>
      </div>
    </div>
  );
}

function CompanyTd() {
  return (
    <div className="bg-slate-50 content-stretch flex items-start relative rounded-[4px] shrink-0 w-full" data-name="Company TD">
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0" data-name="text">
      <p className="[white-space-collapse:collapse] font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[#000b25] text-[14px] text-nowrap w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Tech Innovators
      </p>
    </div>
  );
}

function Frame40903() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Text />
    </div>
  );
}

function Cell4() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative self-stretch shrink-0 w-[185px]" data-name="Cell">
      <Frame40903 />
    </div>
  );
}

function Cell5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            512,349.50
          </p>
        </div>
      </div>
    </div>
  );
}

function Cell6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            530,649.90
          </p>
        </div>
      </div>
    </div>
  );
}

function Indecators() {
  return (
    <div className="bg-[rgba(34,197,94,0.15)] box-border content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[4px] shrink-0 text-[10px] text-center text-green-500 w-[52px]" data-name="Indecators">
      <p className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[1.2] min-h-px min-w-px relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        24.3%
      </p>
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-nowrap whitespace-pre"></p>
    </div>
  );
}

function Cell7() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[4px] relative size-full">
          <Indecators />
        </div>
      </div>
    </div>
  );
}

function CompanyTd1() {
  return (
    <div className="bg-[#f0eefd] content-stretch flex items-start relative rounded-[4px] shrink-0 w-full" data-name="Company TD">
      <div aria-hidden="true" className="absolute border border-[#b9b2f6] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Cell4 />
      <Cell5 />
      <Cell6 />
      <Cell7 />
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="[white-space-collapse:collapse] font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Green Solutions
      </p>
    </div>
  );
}

function Frame40904() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Text1 />
    </div>
  );
}

function Cell8() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative self-stretch shrink-0 w-[185px]" data-name="Cell">
      <Frame40904 />
    </div>
  );
}

function Cell9() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            378,254.32
          </p>
        </div>
      </div>
    </div>
  );
}

function Cell10() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            392,654.10
          </p>
        </div>
      </div>
    </div>
  );
}

function Indecators1() {
  return (
    <div className="bg-[rgba(34,197,94,0.15)] box-border content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[4px] shrink-0 text-[10px] text-center text-green-500 w-[52px]" data-name="Indecators">
      <p className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[1.2] min-h-px min-w-px relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        19.7%
      </p>
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-nowrap whitespace-pre"></p>
    </div>
  );
}

function Cell11() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[4px] relative size-full">
          <Indecators1 />
        </div>
      </div>
    </div>
  );
}

function CompanyTd2() {
  return (
    <div className="bg-white content-stretch flex items-start relative rounded-[4px] shrink-0 w-full" data-name="Company TD">
      <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Cell8 />
      <Cell9 />
      <Cell10 />
      <Cell11 />
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="[white-space-collapse:collapse] font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Creative Agency
      </p>
    </div>
  );
}

function Frame40905() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Text2 />
    </div>
  );
}

function Cell12() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative self-stretch shrink-0 w-[185px]" data-name="Cell">
      <Frame40905 />
    </div>
  );
}

function Cell13() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            610,128.90
          </p>
        </div>
      </div>
    </div>
  );
}

function Cell14() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            623,128.90
          </p>
        </div>
      </div>
    </div>
  );
}

function Indecators2() {
  return (
    <div className="bg-[rgba(34,197,94,0.15)] box-border content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[4px] shrink-0 text-[10px] text-center text-green-500 w-[52px]" data-name="Indecators">
      <p className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[1.2] min-h-px min-w-px relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        32.5%
      </p>
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-nowrap whitespace-pre"></p>
    </div>
  );
}

function Cell15() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[4px] relative size-full">
          <Indecators2 />
        </div>
      </div>
    </div>
  );
}

function CompanyTd3() {
  return (
    <div className="bg-white content-stretch flex items-start relative rounded-[4px] shrink-0 w-full" data-name="Company TD">
      <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Cell12 />
      <Cell13 />
      <Cell14 />
      <Cell15 />
    </div>
  );
}

function Text3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="[white-space-collapse:collapse] font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`HealthTech `}</p>
    </div>
  );
}

function Frame40906() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Text3 />
    </div>
  );
}

function Cell16() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative self-stretch shrink-0 w-[185px]" data-name="Cell">
      <Frame40906 />
    </div>
  );
}

function Cell17() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            489,675.00
          </p>
        </div>
      </div>
    </div>
  );
}

function Cell18() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            505,345.00
          </p>
        </div>
      </div>
    </div>
  );
}

function Indecator() {
  return (
    <div className="bg-[rgba(239,68,68,0.15)] box-border content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[4px] shrink-0 text-[10px] text-nowrap text-red-500 whitespace-pre" data-name="Indecator">
      <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        28.4%
      </p>
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-center"></p>
    </div>
  );
}

function Indecators3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[52px]" data-name="Indecators">
      <Indecator />
    </div>
  );
}

function Cell19() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[4px] relative size-full">
          <Indecators3 />
        </div>
      </div>
    </div>
  );
}

function CompanyTd4() {
  return (
    <div className="bg-white content-stretch flex items-start relative rounded-[4px] shrink-0 w-full" data-name="Company TD">
      <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Cell16 />
      <Cell17 />
      <Cell18 />
      <Cell19 />
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="[white-space-collapse:collapse] font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Finance Group
      </p>
    </div>
  );
}

function Frame40907() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Text4 />
    </div>
  );
}

function Cell20() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative self-stretch shrink-0 w-[185px]" data-name="Cell">
      <Frame40907 />
    </div>
  );
}

function Cell21() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            750,000.00
          </p>
        </div>
      </div>
    </div>
  );
}

function Cell22() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            780,000.00
          </p>
        </div>
      </div>
    </div>
  );
}

function Indecators4() {
  return (
    <div className="bg-[rgba(34,197,94,0.15)] box-border content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[4px] shrink-0 text-[10px] text-center text-green-500 w-[52px]" data-name="Indecators">
      <p className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[1.2] min-h-px min-w-px relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        15.6%
      </p>
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-nowrap whitespace-pre"></p>
    </div>
  );
}

function Cell23() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[4px] relative size-full">
          <Indecators4 />
        </div>
      </div>
    </div>
  );
}

function CompanyTd5() {
  return (
    <div className="bg-white content-stretch flex items-start relative rounded-[4px] shrink-0 w-full" data-name="Company TD">
      <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Cell20 />
      <Cell21 />
      <Cell22 />
      <Cell23 />
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="[white-space-collapse:collapse] font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`Smart Home `}</p>
    </div>
  );
}

function Frame40908() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Text5 />
    </div>
  );
}

function Cell24() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative self-stretch shrink-0 w-[185px]" data-name="Cell">
      <Frame40908 />
    </div>
  );
}

function Cell25() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            295,123.45
          </p>
        </div>
      </div>
    </div>
  );
}

function Cell26() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            305,123.45
          </p>
        </div>
      </div>
    </div>
  );
}

function Indecators5() {
  return (
    <div className="bg-[rgba(34,197,94,0.15)] box-border content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[4px] shrink-0 text-[10px] text-center text-green-500 w-[52px]" data-name="Indecators">
      <p className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[1.2] min-h-px min-w-px relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        22.1%
      </p>
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-nowrap whitespace-pre"></p>
    </div>
  );
}

function Cell27() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[4px] relative size-full">
          <Indecators5 />
        </div>
      </div>
    </div>
  );
}

function CompanyTd6() {
  return (
    <div className="bg-white content-stretch flex items-start relative rounded-[4px] shrink-0 w-full" data-name="Company TD">
      <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Cell24 />
      <Cell25 />
      <Cell26 />
      <Cell27 />
    </div>
  );
}

function Text6() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="[white-space-collapse:collapse] font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`Blockchain `}</p>
    </div>
  );
}

function Frame40909() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Text6 />
    </div>
  );
}

function Cell28() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative self-stretch shrink-0 w-[185px]" data-name="Cell">
      <Frame40909 />
    </div>
  );
}

function Cell29() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            800,000.00
          </p>
        </div>
      </div>
    </div>
  );
}

function Cell30() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            820,000.00
          </p>
        </div>
      </div>
    </div>
  );
}

function Indecators6() {
  return (
    <div className="bg-[rgba(34,197,94,0.15)] box-border content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[4px] shrink-0 text-[10px] text-center text-green-500 w-[52px]" data-name="Indecators">
      <p className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[1.2] min-h-px min-w-px relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        18.0%
      </p>
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-nowrap whitespace-pre"></p>
    </div>
  );
}

function Cell31() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[4px] relative size-full">
          <Indecators6 />
        </div>
      </div>
    </div>
  );
}

function CompanyTd7() {
  return (
    <div className="bg-white content-stretch flex items-start relative rounded-[4px] shrink-0 w-full" data-name="Company TD">
      <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Cell28 />
      <Cell29 />
      <Cell30 />
      <Cell31 />
    </div>
  );
}

function Text7() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="[white-space-collapse:collapse] font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        EdTech Solutions
      </p>
    </div>
  );
}

function Frame40910() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Text7 />
    </div>
  );
}

function Cell32() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative self-stretch shrink-0 w-[185px]" data-name="Cell">
      <Frame40910 />
    </div>
  );
}

function Cell33() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            620,000.00
          </p>
        </div>
      </div>
    </div>
  );
}

function Cell34() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            640,000.00
          </p>
        </div>
      </div>
    </div>
  );
}

function Indecators7() {
  return (
    <div className="bg-[rgba(34,197,94,0.15)] box-border content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[4px] shrink-0 text-[10px] text-center text-green-500 w-[52px]" data-name="Indecators">
      <p className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[1.2] min-h-px min-w-px relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        29.0%
      </p>
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-nowrap whitespace-pre"></p>
    </div>
  );
}

function Cell35() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[4px] relative size-full">
          <Indecators7 />
        </div>
      </div>
    </div>
  );
}

function CompanyTd8() {
  return (
    <div className="bg-white content-stretch flex items-start relative rounded-[4px] shrink-0 w-full" data-name="Company TD">
      <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Cell32 />
      <Cell33 />
      <Cell34 />
      <Cell35 />
    </div>
  );
}

function Text8() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="[white-space-collapse:collapse] font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Logistics Partners
      </p>
    </div>
  );
}

function Frame40911() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Text8 />
    </div>
  );
}

function Cell36() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative self-stretch shrink-0 w-[185px]" data-name="Cell">
      <Frame40911 />
    </div>
  );
}

function Cell37() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            450,300.00
          </p>
        </div>
      </div>
    </div>
  );
}

function Cell38() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            460,300.00
          </p>
        </div>
      </div>
    </div>
  );
}

function Indecator1() {
  return (
    <div className="bg-[rgba(239,68,68,0.15)] box-border content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[4px] shrink-0 text-[10px] text-nowrap text-red-500 whitespace-pre" data-name="Indecator">
      <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        28.4%
      </p>
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-center"></p>
    </div>
  );
}

function Indecators8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[52px]" data-name="Indecators">
      <Indecator1 />
    </div>
  );
}

function Cell39() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[4px] relative size-full">
          <Indecators8 />
        </div>
      </div>
    </div>
  );
}

function CompanyTd9() {
  return (
    <div className="bg-white content-stretch flex items-start relative rounded-[4px] shrink-0 w-full" data-name="Company TD">
      <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Cell36 />
      <Cell37 />
      <Cell38 />
      <Cell39 />
    </div>
  );
}

function Text9() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="[white-space-collapse:collapse] font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Digital Marketing Hub
      </p>
    </div>
  );
}

function Frame40912() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Text9 />
    </div>
  );
}

function Cell40() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative self-stretch shrink-0 w-[185px]" data-name="Cell">
      <Frame40912 />
    </div>
  );
}

function Cell41() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            530,400.00
          </p>
        </div>
      </div>
    </div>
  );
}

function Cell42() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            550,400.00
          </p>
        </div>
      </div>
    </div>
  );
}

function Indecators9() {
  return (
    <div className="bg-[rgba(34,197,94,0.15)] box-border content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[4px] shrink-0 text-[10px] text-center text-green-500 w-[52px]" data-name="Indecators">
      <p className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[1.2] min-h-px min-w-px relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        23.4%
      </p>
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-nowrap whitespace-pre"></p>
    </div>
  );
}

function Cell43() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Cell">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-[4px] relative size-full">
          <Indecators9 />
        </div>
      </div>
    </div>
  );
}

function CompanyTd10() {
  return (
    <div className="bg-white content-stretch flex items-start relative rounded-[4px] shrink-0 w-full" data-name="Company TD">
      <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Cell40 />
      <Cell41 />
      <Cell42 />
      <Cell43 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Table">
      <CompanyTd />
      <CompanyTd1 />
      <CompanyTd2 />
      <CompanyTd3 />
      <CompanyTd4 />
      <CompanyTd5 />
      <CompanyTd6 />
      <CompanyTd7 />
      <CompanyTd8 />
      <CompanyTd9 />
      <CompanyTd10 />
    </div>
  );
}

function PaginationItem() {
  return (
    <div className="content-stretch flex items-center justify-center opacity-50 relative rounded-bl-[4px] rounded-tl-[4px] shrink-0 size-[40px]" data-name="Pagination item">
      <div aria-hidden="true" className="absolute border border-neutral-100 border-solid inset-[-0.5px] pointer-events-none rounded-bl-[4.5px] rounded-tl-[4.5px]" />
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,11,37,0.57)] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre"></p>
      </div>
    </div>
  );
}

function PaginationItem1() {
  return (
    <div className="content-stretch flex items-center justify-center opacity-50 relative shrink-0 size-[40px]" data-name="Pagination item">
      <div aria-hidden="true" className="absolute border border-neutral-100 border-solid inset-[-0.5px] pointer-events-none" />
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,11,37,0.57)] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">angle-left</p>
      </div>
    </div>
  );
}

function PaginationItem2() {
  return (
    <div className="bg-[#6757eb] content-stretch flex items-center justify-center relative shrink-0 size-[40px]" data-name="Pagination item">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[0px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[1.2] text-[16px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          1
        </p>
      </div>
    </div>
  );
}

function PaginationItem3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[40px]" data-name="Pagination item">
      <div aria-hidden="true" className="absolute border border-neutral-100 border-solid inset-[-0.5px] pointer-events-none" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function PaginationItem4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[40px]" data-name="Pagination item">
      <div aria-hidden="true" className="absolute border border-neutral-100 border-solid inset-[-0.5px] pointer-events-none" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function PaginationItem5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[40px]" data-name="Pagination item">
      <div aria-hidden="true" className="absolute border border-neutral-100 border-solid inset-[-0.5px] pointer-events-none" />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">4</p>
      </div>
    </div>
  );
}

function PaginationItem6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[40px]" data-name="Pagination item">
      <div aria-hidden="true" className="absolute border border-neutral-100 border-solid inset-[-0.5px] pointer-events-none" />
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">angle-right</p>
      </div>
    </div>
  );
}

function PaginationItem7() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-br-[4px] rounded-tr-[4px] shrink-0 size-[40px]" data-name="Pagination item">
      <div aria-hidden="true" className="absolute border border-neutral-100 border-solid inset-[-0.5px] pointer-events-none rounded-br-[4.5px] rounded-tr-[4.5px]" />
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">angles-right</p>
      </div>
    </div>
  );
}

function Pagination() {
  return (
    <div className="bg-white content-stretch flex items-start relative rounded-[4px] shrink-0" data-name="Pagination">
      <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <PaginationItem />
      <PaginationItem1 />
      <PaginationItem2 />
      <PaginationItem3 />
      <PaginationItem4 />
      <PaginationItem5 />
      <PaginationItem6 />
      <PaginationItem7 />
    </div>
  );
}

function Frame1000004515() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-end justify-center min-h-px min-w-px relative shrink-0">
      <Table />
      <Pagination />
    </div>
  );
}

function Frame1000004548() {
  return (
    <div className="bg-slate-50 box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[4px] relative rounded-[4px] shrink-0">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2024
      </p>
    </div>
  );
}

function Cell44() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Cell">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center justify-center px-[16px] py-0 relative w-full">
          <Frame1000004548 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return <div className="h-[14px] rounded-[35px] shrink-0 w-[40px]" data-name="Icon" />;
}

function Frame1000004549() {
  return (
    <div className="bg-slate-50 box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[4px] relative rounded-[4px] shrink-0">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2025
      </p>
    </div>
  );
}

function Cell45() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Cell">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center justify-center px-[16px] py-0 relative w-full">
          <Frame1000004549 />
        </div>
      </div>
    </div>
  );
}

function TableHeader4() {
  return (
    <div className="box-border content-stretch flex gap-[16px] items-center justify-center px-0 py-[4px] relative shrink-0 w-full" data-name="Table-header">
      <Cell44 />
      <Icon4 />
      <Cell45 />
    </div>
  );
}

function CardBody() {
  return (
    <div className="basis-0 bg-[#fff8e6] grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-full" data-name="Card body">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col font-['Roboto:Medium',_sans-serif] font-medium gap-[4px] items-center justify-center leading-[1.2] px-[16px] py-[24px] relative size-full text-nowrap whitespace-pre">
          <p className="relative shrink-0 text-[#ffb500] text-[17px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
            5.46M
          </p>
          <p className="relative shrink-0 text-[#ffc433] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Revenue from Fixed Services
          </p>
        </div>
      </div>
    </div>
  );
}

function CardBody1() {
  return (
    <div className="basis-0 bg-[#fff8e6] grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-full" data-name="Card body">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col font-['Roboto:Medium',_sans-serif] font-medium gap-[4px] items-center justify-center leading-[1.2] px-[16px] py-[24px] relative size-full text-nowrap whitespace-pre">
          <p className="relative shrink-0 text-[#ffb500] text-[17px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
            2.60M
          </p>
          <p className="relative shrink-0 text-[#ffc433] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Revenue from Mobile Services
          </p>
        </div>
      </div>
    </div>
  );
}

function CardBody2() {
  return (
    <div className="basis-0 bg-[#fff8e6] grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-full" data-name="Card body">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col font-['Roboto:Medium',_sans-serif] font-medium gap-[4px] items-center justify-center leading-[1.2] px-[16px] py-[24px] relative size-full text-nowrap whitespace-pre">
          <p className="relative shrink-0 text-[#ffb500] text-[17px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
            1.00M
          </p>
          <p className="relative shrink-0 text-[#ffc433] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Revenue from ICT Services
          </p>
        </div>
      </div>
    </div>
  );
}

function CardBody3() {
  return (
    <div className="basis-0 bg-[#fff8e6] grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-full" data-name="Card body">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col font-['Roboto:Medium',_sans-serif] font-medium gap-[4px] items-center justify-center leading-[1.2] px-[16px] py-[24px] relative size-full text-nowrap whitespace-pre">
          <p className="relative shrink-0 text-[#ffb500] text-[17px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
            18.50M
          </p>
          <p className="relative shrink-0 text-[#ffc433] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Total Revenue by Device
          </p>
        </div>
      </div>
    </div>
  );
}

function CardBody4() {
  return (
    <div className="basis-0 bg-[#fff8e6] grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-full" data-name="Card body">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col font-['Roboto:Medium',_sans-serif] font-medium gap-[4px] items-center justify-center leading-[1.2] px-[16px] py-[24px] relative size-full text-nowrap whitespace-pre">
          <p className="relative shrink-0 text-[#ffb500] text-[17px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
            158.74M
          </p>
          <p className="relative shrink-0 text-[#ffc433] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Revenue from SMS Services
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame1321314745() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow h-full items-start min-h-px min-w-px relative shrink-0">
      <CardBody />
      <CardBody1 />
      <CardBody2 />
      <CardBody3 />
      <CardBody4 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative rounded-[35px] shrink-0 size-[40px]" data-name="Icon">
      <div className="box-border content-stretch flex flex-col items-center justify-center overflow-clip px-[8px] py-0 relative rounded-[inherit] size-[40px]">
        <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-[rgba(0,11,37,0.64)] text-nowrap whitespace-pre"></p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none rounded-[35px]" />
    </div>
  );
}

function Frame1321314746() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-green-500 text-nowrap whitespace-pre"></p>
    </div>
  );
}

function Frame1321314740() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <Frame1321314746 />
      <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#0085ca] text-[17px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        55M
      </p>
    </div>
  );
}

function CardBody5() {
  return (
    <div className="basis-0 bg-[#e6f3fa] grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-full" data-name="Card body">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-center px-[16px] py-[24px] relative size-full">
          <Frame1321314740 />
          <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#339dd5] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Revenue from Fixed Services
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame1321314747() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-green-500 text-nowrap whitespace-pre"></p>
    </div>
  );
}

function Frame1321314741() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <Frame1321314747 />
      <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#0085ca] text-[17px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2.63M
      </p>
    </div>
  );
}

function CardBody6() {
  return (
    <div className="basis-0 bg-[#e6f3fa] grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-full" data-name="Card body">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-center px-[16px] py-[24px] relative size-full">
          <Frame1321314741 />
          <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#339dd5] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Revenue from Mobile Services
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame1321314748() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-slate-500 whitespace-pre"></p>
    </div>
  );
}

function Frame1321314742() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <Frame1321314748 />
      <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#0085ca] text-[17px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        1.02M
      </p>
    </div>
  );
}

function CardBody7() {
  return (
    <div className="basis-0 bg-[#e6f3fa] grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-full" data-name="Card body">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-center px-[16px] py-[24px] relative size-full">
          <Frame1321314742 />
          <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#339dd5] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Revenue from ICT Services
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame1321314749() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-green-500 text-nowrap whitespace-pre"></p>
    </div>
  );
}

function Frame1321314743() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <Frame1321314749 />
      <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#0085ca] text-[17px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        20.50M
      </p>
    </div>
  );
}

function CardBody8() {
  return (
    <div className="basis-0 bg-[#e6f3fa] grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-full" data-name="Card body">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-center px-[16px] py-[24px] relative size-full">
          <Frame1321314743 />
          <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#339dd5] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Total Revenue by Device
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame1321314750() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
      <p className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-red-500 whitespace-pre"></p>
    </div>
  );
}

function Frame1321314751() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <Frame1321314750 />
      <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#0085ca] text-[17px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        155.74M
      </p>
    </div>
  );
}

function CardBody9() {
  return (
    <div className="basis-0 bg-[#e6f3fa] grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-full" data-name="Card body">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-center px-[16px] py-[24px] relative size-full">
          <Frame1321314751 />
          <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#339dd5] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Revenue from SMS Services
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame1321314744() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow h-full items-start min-h-px min-w-px relative shrink-0">
      <CardBody5 />
      <CardBody6 />
      <CardBody7 />
      <CardBody8 />
      <CardBody9 />
    </div>
  );
}

function Frame1000004539() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <Frame1321314745 />
      <Icon5 />
      <Frame1321314744 />
    </div>
  );
}

function Items() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow h-[448px] items-start justify-center min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Items">
      <TableHeader4 />
      <Frame1000004539 />
    </div>
  );
}

function Frame1000004517() {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full">
      <Frame1000004515 />
      <Items />
    </div>
  );
}

export default function CompaniesPerformanceOn() {
  return (
    <div className="bg-white relative rounded-[4px] size-full" data-name="Companies performance - On">
      <div aria-hidden="true" className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start justify-center p-[16px] relative size-full">
          <CardHeader />
          <Frame1000004527 />
          <Frame1000004517 />
        </div>
      </div>
    </div>
  );
}