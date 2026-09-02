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

function Cell() {
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

function Icon() {
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

function Cell1() {
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

function TableHeader() {
  return (
    <div className="box-border content-stretch flex gap-[16px] items-center justify-center px-0 py-[4px] relative shrink-0 w-full" data-name="Table-header">
      <Cell />
      <Icon />
      <Cell1 />
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

function Icon1() {
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
      <Icon1 />
      <Frame1321314744 />
    </div>
  );
}

export default function Items() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative rounded-[4px] size-full" data-name="Items">
      <TableHeader />
      <Frame1000004539 />
    </div>
  );
}