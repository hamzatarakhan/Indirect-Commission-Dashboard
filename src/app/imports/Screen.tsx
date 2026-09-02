import svgPaths from "./svg-ee5djrfjyb";
import { imgGroup } from "./svg-72w08";

function Logo() {
  return (
    <div className="h-[32.072px] relative shrink-0 w-[161px]" data-name="Logo">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 161 33"
      >
        <g id="Logo">
          <path
            d={svgPaths.p2739ba80}
            fill="var(--fill-0, #2D13EA)"
            id="Vector"
          />
          <path
            d={svgPaths.peb4e380}
            fill="var(--fill-0, #2D13EA)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p6202980}
            fill="var(--fill-0, #2D13EA)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p34939900}
            fill="var(--fill-0, #2D13EA)"
            id="Vector_4"
          />
          <path
            d={svgPaths.p20af3600}
            fill="var(--fill-0, #2D13EA)"
            id="Vector_5"
          />
          <path
            d={svgPaths.p1a29bc00}
            fill="var(--fill-0, #2D13EA)"
            id="Vector_6"
          />
          <path
            d={svgPaths.p2fd8ee00}
            fill="var(--fill-0, #2D13EA)"
            id="Vector_7"
          />
          <path
            d={svgPaths.p26b38340}
            fill="var(--fill-0, #FF7800)"
            id="Vector_8"
          />
        </g>
      </svg>
    </div>
  );
}

function BreadcrumbText() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-end justify-start p-0 relative shrink-0"
      data-name="Breadcrumb Text"
    >
      <div
        className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-end leading-[0] relative shrink-0 text-[24px] text-gray-900 text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">{`EBU Commission Dashboard `}</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-end justify-start p-0 relative shrink-0"
      data-name="Item"
    >
      <BreadcrumbText />
    </div>
  );
}

function Frame1000004593() {
  return (
    <div className="box-border content-stretch flex flex-col gap-1 items-start justify-end p-0 relative shrink-0">
      <Item />
    </div>
  );
}

function BreadcrumbText1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-end justify-start p-0 relative shrink-0"
      data-name="Breadcrumb Text"
    >
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-end leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">{`Performance Tracking & Analytics`}</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-end justify-start p-0 relative shrink-0"
      data-name="Item"
    >
      <BreadcrumbText1 />
    </div>
  );
}

function Frame1000004594() {
  return (
    <div className="box-border content-stretch flex flex-col gap-1 items-start justify-end p-0 relative shrink-0">
      <Item1 />
    </div>
  );
}

function Frame1000004595() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0">
      <Frame1000004593 />
      <Frame1000004594 />
    </div>
  );
}

function Breadcrumb() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start px-4 py-0 relative rounded shrink-0"
      data-name="Breadcrumb"
    >
      <Logo />
      <Frame1000004595 />
    </div>
  );
}

function Icon1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0 size-5"
      data-name="Icon"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[17px] text-[rgba(0,11,37,0.64)] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">angle-down</p>
      </div>
    </div>
  );
}

function Textfield() {
  return (
    <div
      className="bg-[#ffffff] h-[38px] relative rounded shrink-0 w-full"
      data-name="Textfield"
    >
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 h-[38px] items-center justify-start px-3 py-0 relative w-full">
          <div
            className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="block leading-[1.2]">Quarterly</p>
          </div>
          <Icon1 />
        </div>
      </div>
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded" />
    </div>
  );
}

function Textfield1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start overflow-clip p-0 relative shrink-0 w-[123px]"
      data-name="Textfield"
    >
      <Textfield />
    </div>
  );
}

function Icon3() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0 size-5"
      data-name="Icon"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[17px] text-[rgba(0,11,37,0.64)] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">angle-down</p>
      </div>
    </div>
  );
}

function Textfield2() {
  return (
    <div
      className="bg-[#ffffff] h-[38px] relative rounded shrink-0 w-full"
      data-name="Textfield"
    >
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 h-[38px] items-center justify-start px-3 py-0 relative w-full">
          <div
            className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="block leading-[1.2]">Q3</p>
          </div>
          <Icon3 />
        </div>
      </div>
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded" />
    </div>
  );
}

function Textfield3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start overflow-clip p-0 relative shrink-0 w-[123px]"
      data-name="Textfield"
    >
      <Textfield2 />
    </div>
  );
}

function Textfield4() {
  return (
    <div
      className="bg-[#ffffff] h-[38px] relative rounded-[29px] shrink-0 w-full"
      data-name="Textfield"
    >
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 h-[38px] items-center justify-start px-3 py-0 relative w-full">
          <div
            className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[0px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="leading-[1.2] text-[14px] whitespace-pre">
              <span>{`Updated: `}</span>
              <span
                className="font-['Roboto:Regular',_sans-serif] font-normal"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                7/27/2025
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[29px]" />
    </div>
  );
}

function Textfield5() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="Textfield"
    >
      <Textfield4 />
    </div>
  );
}

function Frame1000004550() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
      <Textfield1 />
      <Textfield3 />
      <Textfield5 />
    </div>
  );
}

function TopHeader() {
  return (
    <div
      className="bg-[#ffffff] relative shrink-0 w-full"
      data-name="Top-header"
    >
      <div className="absolute border-[0px_0px_1px] border-slate-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between px-6 py-4 relative w-full">
          <Breadcrumb />
          <Frame1000004550 />
        </div>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shadow-[0px_3px_20px_0px_rgba(0,0,0,0.05)] shrink-0 w-full"
      data-name="Top bar"
    >
      <TopHeader />
    </div>
  );
}

function TopBar1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shadow-[0px_3px_20px_0px_rgba(0,0,0,0.05)] shrink-0 w-full"
      data-name="Top bar"
    >
      <TopBar />
    </div>
  );
}

function Frame1000004558() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[17px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">{`Overall Achievement `}</p>
      </div>
    </div>
  );
}

function Textfield6() {
  return (
    <div
      className="bg-[#0066ff] relative rounded-[29px] shrink-0"
      data-name="Textfield"
    >
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start overflow-clip px-3 py-1 relative">
        <div
          className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          <p className="block leading-[1.2] whitespace-pre">Quarterly - Q3</p>
        </div>
      </div>
      <div className="absolute border border-[rgba(0,85,255,0.2)] border-solid inset-0 pointer-events-none rounded-[29px]" />
    </div>
  );
}

function Frame1000004559() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
      <Frame1000004558 />
      <Textfield6 />
    </div>
  );
}

function RevenueIcon() {
  return (
    <div
      className="bg-[rgba(59,130,246,0.1)] box-border content-stretch flex flex-row gap-[5.889px] h-[57px] items-center justify-center p-0 relative rounded-[7.361px] shrink-0 w-[53px]"
      data-name="Revenue Icon"
    >
      <div className="absolute border-[1.472px] border-[rgba(59,130,246,0.2)] border-solid inset-0 pointer-events-none rounded-[7.361px]" />
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0066ff] text-[29.444px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">star</p>
      </div>
    </div>
  );
}

function Frame1000004561() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] p-0 relative shrink-0 text-[16px] text-left w-full">
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-[rgba(0,11,37,0.57)] text-nowrap">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
      <div
        className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow min-h-px min-w-px relative shrink-0 text-[rgba(0,11,37,0.64)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px]">Threshold: 90%</p>
      </div>
    </div>
  );
}

function Frame1000004491() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div
        className="bg-clip-text bg-gradient-to-t font-['Roboto:Bold',_sans-serif] font-bold from-[#274afa] leading-[0] relative shrink-0 text-[32px] text-left text-nowrap to-[#4a43fbcc]"
        style={{
          WebkitTextFillColor: "transparent",
          fontVariationSettings: "'wdth' 100",
        }}
      >
        <p className="block leading-[1.2] whitespace-pre">88.2%</p>
      </div>
      <Frame1000004561 />
    </div>
  );
}

function Frame1000004551() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row gap-3 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
      <RevenueIcon />
      <Frame1000004491 />
    </div>
  );
}

function Frame1000004552() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full">
      <Frame1000004551 />
    </div>
  );
}

function Frame1000004555() {
  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame1000004552 />
    </div>
  );
}

function Frame1000004566() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <Frame1000004555 />
    </div>
  );
}

function Frame1000004560() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
      <Frame1000004566 />
    </div>
  );
}

function RevenueIcon1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center p-0 relative rounded-[5px] shrink-0 text-[16px] text-green-500"
      data-name="Revenue Icon"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-center">
        <p className="block leading-[normal] text-nowrap whitespace-pre"></p>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">28.4%</p>
      </div>
    </div>
  );
}

function Frame1000004562() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-start leading-[0] p-0 relative shrink-0 text-nowrap">
      <RevenueIcon1 />
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">
          vs last period
        </p>
      </div>
    </div>
  );
}

function Frame1000004554() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-blue-500 text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">Master Score</p>
      </div>
    </div>
  );
}

function Frame1000004557() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
      <div className="flex flex-row items-center self-stretch">
        <Frame1000004562 />
      </div>
      <Frame1000004554 />
    </div>
  );
}

function Frame1000004565() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame1000004557 />
    </div>
  );
}

function Frame1000004563() {
  return (
    <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame1000004559 />
      <Frame1000004560 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 288 1"
          >
            <line
              id="Line 1"
              stroke="var(--stroke-0, #E2E8F0)"
              x2="288"
              y1="0.5"
              y2="0.5"
            />
          </svg>
        </div>
      </div>
      <Frame1000004565 />
    </div>
  );
}

function Container() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow h-full items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Frame1000004563 />
    </div>
  );
}

function TotalRevenueCard() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative rounded-2xl shrink-0"
      data-name="Total Revenue Card"
    >
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[24px] relative w-full">
          <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
            <Container />
          </div>
          <div className="absolute left-64 size-[139px] top-[-61px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 139 139"
            >
              <circle
                cx="69.5"
                cy="69.5"
                fill="var(--fill-0, #3B82F6)"
                fillOpacity="0.05"
                id="Ellipse 21"
                r="69.5"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute border border-[#6ca9fa] border-solid inset-0 pointer-events-none rounded-2xl" />
    </div>
  );
}

function Frame1000004567() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[17px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">
          Revenue Performance
        </p>
      </div>
    </div>
  );
}

function Textfield7() {
  return (
    <div className="relative rounded-[29px] shrink-0" data-name="Textfield">
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start overflow-clip px-3 py-1 relative">
        <div
          className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#0066ff] text-[14px] text-left text-nowrap"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          <p className="block leading-[1.2] whitespace-pre">50%</p>
        </div>
      </div>
      <div className="absolute border border-[rgba(0,85,255,0.2)] border-solid inset-0 pointer-events-none rounded-[29px]" />
    </div>
  );
}

function Frame1000004568() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
      <Frame1000004567 />
      <Textfield7 />
    </div>
  );
}

function RevenueIcon2() {
  return (
    <div
      className="bg-[rgba(59,130,246,0.1)] box-border content-stretch flex flex-row gap-[5.889px] h-[57px] items-center justify-center p-0 relative rounded-[7.361px] shrink-0 w-[53px]"
      data-name="Revenue Icon"
    >
      <div className="absolute border-[1.472px] border-[rgba(59,130,246,0.2)] border-solid inset-0 pointer-events-none rounded-[7.361px]" />
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0066ff] text-[29.444px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">dollar</p>
      </div>
    </div>
  );
}

function Frame1000004574() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] p-0 relative shrink-0 text-[16px] text-left w-full">
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-[rgba(0,11,37,0.57)] text-nowrap">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
      <div
        className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow min-h-px min-w-px relative shrink-0 text-[rgba(0,11,37,0.64)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px]">Threshold: 90%</p>
      </div>
    </div>
  );
}

function Frame1000004493() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div
        className="bg-clip-text bg-gradient-to-t font-['Roboto:Bold',_sans-serif] font-bold from-[#274afa] leading-[0] relative shrink-0 text-[32px] text-left text-nowrap to-[#4a43fbcc]"
        style={{
          WebkitTextFillColor: "transparent",
          fontVariationSettings: "'wdth' 100",
        }}
      >
        <p className="block leading-[1.2] whitespace-pre">$2.45M</p>
      </div>
      <Frame1000004574 />
    </div>
  );
}

function Frame1000004553() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row gap-3 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
      <RevenueIcon2 />
      <Frame1000004493 />
    </div>
  );
}

function Frame1000004556() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full">
      <Frame1000004553 />
    </div>
  );
}

function Frame1000004577() {
  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame1000004556 />
    </div>
  );
}

function Frame1000004580() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <Frame1000004577 />
    </div>
  );
}

function Frame1000004581() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
      <Frame1000004580 />
    </div>
  );
}

function RevenueIcon3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center p-0 relative rounded-[5px] shrink-0"
      data-name="Revenue Icon"
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative text-[16px] text-center text-nowrap text-red-500">
            <p className="block leading-[normal] whitespace-pre"></p>
          </div>
        </div>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[16px] text-left text-nowrap text-red-500"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">28.4%</p>
      </div>
    </div>
  );
}

function Frame1000004592() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-start p-0 relative shrink-0">
      <RevenueIcon3 />
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">vs last period</p>
      </div>
    </div>
  );
}

function Frame1000004597() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start leading-[0] p-0 relative shrink-0 text-left text-nowrap">
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-[17px] text-[rgba(0,11,37,0.57)]">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          Analytics
        </p>
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] text-nowrap whitespace-pre">
          Analytics
        </p>
      </div>
    </div>
  );
}

function Frame1000004604() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
      <div className="flex flex-row items-center self-stretch">
        <Frame1000004592 />
      </div>
      <Frame1000004597 />
    </div>
  );
}

function Frame1000004605() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame1000004604 />
    </div>
  );
}

function Frame1000004606() {
  return (
    <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame1000004568 />
      <Frame1000004581 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 288 1"
          >
            <line
              id="Line 1"
              stroke="var(--stroke-0, #E2E8F0)"
              x2="288"
              y1="0.5"
              y2="0.5"
            />
          </svg>
        </div>
      </div>
      <Frame1000004605 />
    </div>
  );
}

function Container1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow h-full items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Frame1000004606 />
    </div>
  );
}

function Textfield8() {
  return (
    <div
      className="absolute bg-[#fff5e6] h-[31px] left-[316px] rounded-[21.927px] top-[-12px]"
      data-name="Textfield"
    >
      <div className="box-border content-stretch flex flex-row gap-[6.049px] h-[31px] items-center justify-start overflow-clip px-[9.073px] py-[3.024px] relative">
        <div className="font-['Font_Awesome_6_Pro:Solid',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e88b00] text-[12.854px] text-left text-nowrap">
          <p className="block leading-[normal] whitespace-pre"></p>
        </div>
      </div>
      <div className="absolute border-[#ffd08a] border-[0.756px] border-solid inset-0 pointer-events-none rounded-[21.927px]" />
    </div>
  );
}

function TotalRevenueCard1() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-2xl shrink-0"
      data-name="Total Revenue Card"
    >
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-2xl" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[24px] relative w-full">
          <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
            <Container1 />
          </div>
          <Textfield8 />
        </div>
      </div>
    </div>
  );
}

function Frame1000004607() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[17px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">
          Strategic Priorities
        </p>
      </div>
    </div>
  );
}

function Textfield9() {
  return (
    <div className="relative rounded-[29px] shrink-0" data-name="Textfield">
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start overflow-clip px-3 py-1 relative">
        <div
          className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#0066ff] text-[14px] text-left text-nowrap"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          <p className="block leading-[1.2] whitespace-pre">30%</p>
        </div>
      </div>
      <div className="absolute border border-[rgba(0,85,255,0.2)] border-solid inset-0 pointer-events-none rounded-[29px]" />
    </div>
  );
}

function Frame1000004608() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
      <Frame1000004607 />
      <Textfield9 />
    </div>
  );
}

function RevenueIcon4() {
  return (
    <div
      className="bg-[rgba(59,130,246,0.1)] box-border content-stretch flex flex-row gap-[5.889px] h-[57px] items-center justify-center p-0 relative rounded-[7.361px] shrink-0 w-[53px]"
      data-name="Revenue Icon"
    >
      <div className="absolute border-[1.472px] border-[rgba(59,130,246,0.2)] border-solid inset-0 pointer-events-none rounded-[7.361px]" />
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0066ff] text-[29.444px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">star</p>
      </div>
    </div>
  );
}

function Frame1000004609() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] p-0 relative shrink-0 text-[16px] text-left w-full">
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-[rgba(0,11,37,0.57)] text-nowrap">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[rgba(0,11,37,0.64)] w-[279px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px]">Threshold: 100%</p>
      </div>
    </div>
  );
}

function Frame1000004494() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div
        className="bg-clip-text bg-gradient-to-t font-['Roboto:Bold',_sans-serif] font-bold from-[#274afa] leading-[0] relative shrink-0 text-[32px] text-left text-nowrap to-[#4a43fbcc]"
        style={{
          WebkitTextFillColor: "transparent",
          fontVariationSettings: "'wdth' 100",
        }}
      >
        <p className="block leading-[1.2] whitespace-pre">75%</p>
      </div>
      <Frame1000004609 />
    </div>
  );
}

function Frame1000004610() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row gap-3 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
      <RevenueIcon4 />
      <Frame1000004494 />
    </div>
  );
}

function Frame1000004611() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full">
      <Frame1000004610 />
    </div>
  );
}

function Frame1000004612() {
  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame1000004611 />
    </div>
  );
}

function Frame1000004613() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <Frame1000004612 />
    </div>
  );
}

function Frame1000004614() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
      <Frame1000004613 />
    </div>
  );
}

function RevenueIcon5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center p-0 relative rounded-[5px] shrink-0"
      data-name="Revenue Icon"
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative text-[16px] text-center text-nowrap text-red-500">
            <p className="block leading-[normal] whitespace-pre"></p>
          </div>
        </div>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[16px] text-left text-nowrap text-red-500"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">10.4%</p>
      </div>
    </div>
  );
}

function Frame1000004615() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-start p-0 relative shrink-0">
      <RevenueIcon5 />
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">vs last period</p>
      </div>
    </div>
  );
}

function Frame1000004616() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start leading-[0] p-0 relative shrink-0 text-left text-nowrap">
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-[17px] text-[rgba(0,11,37,0.57)]">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          Analytics
        </p>
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] text-nowrap whitespace-pre">
          Analytics
        </p>
      </div>
    </div>
  );
}

function Frame1000004617() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
      <div className="flex flex-row items-center self-stretch">
        <Frame1000004615 />
      </div>
      <Frame1000004616 />
    </div>
  );
}

function Frame1000004618() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame1000004617 />
    </div>
  );
}

function Frame1000004619() {
  return (
    <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame1000004608 />
      <Frame1000004614 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 288 1"
          >
            <line
              id="Line 1"
              stroke="var(--stroke-0, #E2E8F0)"
              x2="288"
              y1="0.5"
              y2="0.5"
            />
          </svg>
        </div>
      </div>
      <Frame1000004618 />
    </div>
  );
}

function Container2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow h-full items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Frame1000004619 />
    </div>
  );
}

function Textfield10() {
  return (
    <div
      className="absolute bg-[#fff5e6] h-[31px] left-[316px] rounded-[21.927px] top-[-12px]"
      data-name="Textfield"
    >
      <div className="box-border content-stretch flex flex-row gap-[6.049px] h-[31px] items-center justify-start overflow-clip px-[9.073px] py-[3.024px] relative">
        <div className="font-['Font_Awesome_6_Pro:Solid',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e88b00] text-[12.854px] text-left text-nowrap">
          <p className="block leading-[normal] whitespace-pre"></p>
        </div>
      </div>
      <div className="absolute border-[#ffd08a] border-[0.756px] border-solid inset-0 pointer-events-none rounded-[21.927px]" />
    </div>
  );
}

function TotalRevenueCard2() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-2xl shrink-0"
      data-name="Total Revenue Card"
    >
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-2xl" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[24px] relative w-full">
          <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
            <Container2 />
          </div>
          <Textfield10 />
        </div>
      </div>
    </div>
  );
}

function Frame1000004620() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[17px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">
          CX / Voice of Customer
        </p>
      </div>
    </div>
  );
}

function Textfield11() {
  return (
    <div className="relative rounded-[29px] shrink-0" data-name="Textfield">
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start overflow-clip px-3 py-1 relative">
        <div
          className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#0066ff] text-[14px] text-left text-nowrap"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          <p className="block leading-[1.2] whitespace-pre">20%</p>
        </div>
      </div>
      <div className="absolute border border-[rgba(0,85,255,0.2)] border-solid inset-0 pointer-events-none rounded-[29px]" />
    </div>
  );
}

function Frame1000004621() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
      <Frame1000004620 />
      <Textfield11 />
    </div>
  );
}

function RevenueIcon6() {
  return (
    <div
      className="bg-[rgba(59,130,246,0.1)] box-border content-stretch flex flex-row gap-[5.889px] h-[57px] items-center justify-center p-0 relative rounded-[7.361px] shrink-0 w-[53px]"
      data-name="Revenue Icon"
    >
      <div className="absolute border-[1.472px] border-[rgba(59,130,246,0.2)] border-solid inset-0 pointer-events-none rounded-[7.361px]" />
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0066ff] text-[29.444px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">phone</p>
      </div>
    </div>
  );
}

function Frame1000004622() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] p-0 relative shrink-0 text-[16px] text-left w-full">
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-[rgba(0,11,37,0.57)] text-nowrap">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[rgba(0,11,37,0.64)] w-[279px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px]">Threshold: 80%</p>
      </div>
    </div>
  );
}

function Frame1000004492() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div
        className="bg-clip-text bg-gradient-to-t font-['Roboto:Bold',_sans-serif] font-bold from-[#274afa] leading-[0] relative shrink-0 text-[32px] text-left text-nowrap to-[#4a43fbcc]"
        style={{
          WebkitTextFillColor: "transparent",
          fontVariationSettings: "'wdth' 100",
        }}
      >
        <p className="block leading-[1.2] whitespace-pre">85%</p>
      </div>
      <Frame1000004622 />
    </div>
  );
}

function Frame1000004623() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row gap-3 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
      <RevenueIcon6 />
      <Frame1000004492 />
    </div>
  );
}

function Frame1000004624() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full">
      <Frame1000004623 />
    </div>
  );
}

function Frame1000004625() {
  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame1000004624 />
    </div>
  );
}

function Frame1000004626() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <Frame1000004625 />
    </div>
  );
}

function Frame1000004627() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
      <Frame1000004626 />
    </div>
  );
}

function RevenueIcon7() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center p-0 relative rounded-[5px] shrink-0 text-[16px] text-green-500"
      data-name="Revenue Icon"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-center">
        <p className="block leading-[normal] text-nowrap whitespace-pre"></p>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">+12.2%</p>
      </div>
    </div>
  );
}

function Frame1000004628() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-start leading-[0] p-0 relative shrink-0 text-nowrap">
      <RevenueIcon7 />
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">
          vs last period
        </p>
      </div>
    </div>
  );
}

function Frame1000004629() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start leading-[0] p-0 relative shrink-0 text-left text-nowrap">
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-[17px] text-[rgba(0,11,37,0.57)]">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          Analytics
        </p>
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] text-nowrap whitespace-pre">
          Analytics
        </p>
      </div>
    </div>
  );
}

function Frame1000004630() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
      <div className="flex flex-row items-center self-stretch">
        <Frame1000004628 />
      </div>
      <Frame1000004629 />
    </div>
  );
}

function Frame1000004631() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame1000004630 />
    </div>
  );
}

function Frame1000004632() {
  return (
    <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame1000004621 />
      <Frame1000004627 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 288 1"
          >
            <line
              id="Line 1"
              stroke="var(--stroke-0, #E2E8F0)"
              x2="288"
              y1="0.5"
              y2="0.5"
            />
          </svg>
        </div>
      </div>
      <Frame1000004631 />
    </div>
  );
}

function Container3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow h-full items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Frame1000004632 />
    </div>
  );
}

function TotalRevenueCard3() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-2xl shrink-0"
      data-name="Total Revenue Card"
    >
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-2xl" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[24px] relative w-full">
          <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
            <Container3 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1000004564() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative shrink-0 w-full">
      <TotalRevenueCard />
      <TotalRevenueCard1 />
      <TotalRevenueCard2 />
      <TotalRevenueCard3 />
    </div>
  );
}

function Image9() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-9 items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Image9"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0066ff] text-[24px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">calculator</p>
      </div>
    </div>
  );
}

function Element11() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 11"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000000] text-[22px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Payout Calculation</p>
      </div>
    </div>
  );
}

function Element7() {
  return (
    <div
      className="[flex-flow:wrap] basis-0 box-border content-center flex gap-3 grow items-center justify-start min-h-px min-w-[335px] overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 7"
    >
      <Image9 />
      <Element11 />
    </div>
  );
}

function Element17() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 17"
    >
      <div
        className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#42be65] text-[24px] text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">90%</p>
      </div>
    </div>
  );
}

function Element20() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 20"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-gray-500 text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">Achievement</p>
      </div>
    </div>
  );
}

function Element15() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-end justify-center overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 15"
    >
      <Element17 />
      <Element20 />
    </div>
  );
}

function Element5() {
  return (
    <div
      className="[flex-flow:wrap] box-border content-center flex gap-0 items-center justify-start min-w-[335px] overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 5"
    >
      <Element7 />
      <Element15 />
    </div>
  );
}

function Element31() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 31"
    >
      <div
        className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000b25] text-[16px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px]">Revenue</p>
      </div>
    </div>
  );
}

function Element34() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 34"
    >
      <div
        className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[16px] text-gray-500 text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px]">(50% weight)</p>
      </div>
    </div>
  );
}

function Element29() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 29"
    >
      <Element31 />
      <Element34 />
    </div>
  );
}

function Element38() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-end justify-center leading-[0] overflow-clip p-0 relative shrink-0 text-left text-nowrap"
      data-name="ELEMENT 38"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-[#000b25] text-[22px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">95%</p>
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] text-green-700"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] text-nowrap whitespace-pre">
          x 0.5=47.5%
        </p>
      </div>
    </div>
  );
}

function Element27() {
  return (
    <div
      className="bg-green-50 min-w-[335px] relative rounded-xl shrink-0 w-full"
      data-name="ELEMENT 27"
    >
      <div className="flex flex-row items-center min-w-inherit overflow-clip relative size-full">
        <div className="[flex-flow:wrap] box-border content-center flex gap-0 items-center justify-start min-w-inherit p-[16px] relative w-full">
          <Element29 />
          <Element38 />
        </div>
      </div>
      <div className="absolute border border-[rgba(73,209,111,0.02)] border-solid inset-0 pointer-events-none rounded-xl" />
    </div>
  );
}

function Element46() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 46"
    >
      <div
        className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000b25] text-[16px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px]">Strategic Priorities</p>
      </div>
    </div>
  );
}

function Element49() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 49"
    >
      <div
        className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px]">(30% weight)</p>
      </div>
    </div>
  );
}

function Element44() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 44"
    >
      <Element46 />
      <Element49 />
    </div>
  );
}

function Element39() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-end justify-center leading-[0] overflow-clip p-0 relative shrink-0 text-left text-nowrap"
      data-name="ELEMENT 38"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-[#000b25] text-[22px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">82%</p>
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] text-orange-700"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] text-nowrap whitespace-pre">
          x 0.3=24.6%
        </p>
      </div>
    </div>
  );
}

function Element42() {
  return (
    <div
      className="bg-orange-50 min-w-[335px] relative rounded-xl shrink-0 w-full"
      data-name="ELEMENT 42"
    >
      <div className="flex flex-row items-center min-w-inherit overflow-clip relative size-full">
        <div className="[flex-flow:wrap] box-border content-center flex gap-0 items-center justify-start min-w-inherit p-[16px] relative w-full">
          <Element44 />
          <Element39 />
        </div>
      </div>
      <div className="absolute border border-[rgba(249,115,22,0.15)] border-solid inset-0 pointer-events-none rounded-xl" />
    </div>
  );
}

function Element61() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 61"
    >
      <div
        className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000b25] text-[16px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px]">CX / Voice of Customer</p>
      </div>
    </div>
  );
}

function Element64() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 64"
    >
      <div
        className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px]">(20% weight)</p>
      </div>
    </div>
  );
}

function Element59() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 59"
    >
      <Element61 />
      <Element64 />
    </div>
  );
}

function Element40() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-end justify-center leading-[0] overflow-clip p-0 relative shrink-0 text-left text-nowrap"
      data-name="ELEMENT 38"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-[#000b25] text-[22px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">88%</p>
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] text-blue-700"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] text-nowrap whitespace-pre">
          x 0.2=17.6%
        </p>
      </div>
    </div>
  );
}

function Element57() {
  return (
    <div
      className="bg-blue-50 min-w-[335px] relative rounded-xl shrink-0 w-full"
      data-name="ELEMENT 57"
    >
      <div className="flex flex-row items-center min-w-inherit overflow-clip relative size-full">
        <div className="[flex-flow:wrap] box-border content-center flex gap-0 items-center justify-start min-w-inherit p-[16px] relative w-full">
          <Element59 />
          <Element40 />
        </div>
      </div>
      <div className="absolute border border-[rgba(59,130,246,0.15)] border-solid inset-0 pointer-events-none rounded-xl" />
    </div>
  );
}

function Element25() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start min-w-[335px] overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 25"
    >
      <Element27 />
      <Element42 />
      <Element57 />
    </div>
  );
}

function Element62() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 61"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000b25] text-[19px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Total Achievement</p>
      </div>
    </div>
  );
}

function Element60() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 59"
    >
      <Element62 />
    </div>
  );
}

function Element18() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 17"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#42be65] text-[24px] text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">90%</p>
      </div>
    </div>
  );
}

function Element16() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-end justify-center overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 15"
    >
      <Element18 />
    </div>
  );
}

function Element63() {
  return (
    <div
      className="[flex-flow:wrap] box-border content-center flex gap-0 items-center justify-start min-w-[335px] overflow-clip p-0 relative rounded-xl shrink-0 w-full"
      data-name="ELEMENT 57"
    >
      <Element60 />
      <Element16 />
    </div>
  );
}

function Element21() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 20"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[17px] text-[rgba(0,11,37,0.64)] text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">100 OMR</p>
      </div>
    </div>
  );
}

function Frame1000004571() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">Base payout</p>
      </div>
      <Element21 />
    </div>
  );
}

function Frame1000004576() {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full">
      <Element63 />
      <Frame1000004571 />
    </div>
  );
}

function Element65() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 61"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000b25] text-[22px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Calculated payout</p>
      </div>
    </div>
  );
}

function Element66() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 59"
    >
      <Element65 />
    </div>
  );
}

function Element19() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 17"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#34944f] text-[22px] text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">897 OMR</p>
      </div>
    </div>
  );
}

function Element22() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-end justify-center overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 15"
    >
      <Element19 />
    </div>
  );
}

function Element58() {
  return (
    <div
      className="[flex-flow:wrap] box-border content-center flex gap-0 items-center justify-start min-w-[335px] overflow-clip p-0 relative rounded-xl shrink-0 w-full"
      data-name="ELEMENT 58"
    >
      <Element66 />
      <Element22 />
    </div>
  );
}

function Frame1000004578() {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full">
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 616 1"
          >
            <line
              id="Line 2"
              stroke="var(--stroke-0, #E2E8F0)"
              x2="616"
              y1="0.5"
              y2="0.5"
            />
          </svg>
        </div>
      </div>
      <Element58 />
    </div>
  );
}

function Frame1000004572() {
  return (
    <div className="bg-slate-50 relative rounded shrink-0 w-full">
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-[12px] relative w-full">
          <Frame1000004576 />
          <Frame1000004578 />
        </div>
      </div>
    </div>
  );
}

function Element8() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-2xl self-stretch shrink-0"
      data-name="ELEMENT 5"
    >
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-[24px] relative size-full">
          <Element5 />
          <Element25 />
          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 640 1"
              >
                <line
                  id="Line 1"
                  stroke="var(--stroke-0, #E2E8F0)"
                  x2="640"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
          <Frame1000004572 />
        </div>
      </div>
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-2xl" />
    </div>
  );
}

function Image10() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-9 items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Image9"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0066ff] text-[24px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">phone</p>
      </div>
    </div>
  );
}

function Element12() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 11"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000000] text-[22px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">CX / Voice of Customer</p>
      </div>
    </div>
  );
}

function Element9() {
  return (
    <div
      className="[flex-flow:wrap] basis-0 box-border content-center flex gap-3 grow items-center justify-start min-h-px min-w-[335px] overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 7"
    >
      <Image10 />
      <Element12 />
    </div>
  );
}

function Frame() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Element9 />
      <div
        className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#42be65] text-[24px] text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">88%</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2.5 h-[13px] items-start justify-end left-0 overflow-clip p-0 top-1/2 translate-y-[-50%] w-[576px]"
      data-name="FRAME"
    >
      <div
        className="bg-blue-500 h-[13px] rounded shrink-0 w-[542px]"
        data-name="FRAME"
      />
    </div>
  );
}

function Frame2() {
  return (
    <div
      className="bg-[rgba(0,133,202,0.15)] h-[9px] overflow-clip relative rounded-br-[4px] rounded-tr-[4px] shrink-0 w-full"
      data-name="FRAME"
    >
      <div
        className="absolute flex h-4 items-center justify-center left-0 right-0 translate-y-[-50%]"
        style={{ top: "calc(50% + 0.5px)" }}
      >
        <div className="flex-none h-4 scale-y-[-100%] w-[640px]">
          <div className="bg-blue-50 rounded size-full" data-name="FRAME" />
        </div>
      </div>
      <Frame1 />
    </div>
  );
}

function Frame3() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row gap-2.5 items-center justify-center overflow-clip p-0 relative shrink-0"
      data-name="FRAME"
    >
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">0%</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Frame3 />
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">Target: 100%</p>
      </div>
    </div>
  );
}

function ProgressBarContent() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Progress Bar Content"
    >
      <Frame2 />
      <Frame4 />
    </div>
  );
}

function ProgressBarContainer() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-end justify-start p-0 relative shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <ProgressBarContent />
    </div>
  );
}

function ProgressBarContent1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Progress Bar Content"
    >
      <Frame />
      <ProgressBarContainer />
    </div>
  );
}

function ProgressBarContainer1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-end justify-start p-0 relative shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <ProgressBarContent1 />
    </div>
  );
}

function Image11() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-9 items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Image9"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(0,11,37,0.57)] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">phone</p>
      </div>
    </div>
  );
}

function Element13() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 11"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[17px] text-[rgba(0,11,37,0.64)] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Average CSAT Score</p>
      </div>
    </div>
  );
}

function Element10() {
  return (
    <div
      className="[flex-flow:wrap] basis-0 box-border content-center flex gap-3 grow items-center justify-start min-h-px min-w-[335px] overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 7"
    >
      <Image11 />
      <Element13 />
    </div>
  );
}

function RevenueIcon8() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center leading-[0] p-0 relative rounded-[5px] shrink-0 text-nowrap"
      data-name="Revenue Icon"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-[14px] text-center text-green-500">
        <p className="block leading-[normal] text-nowrap whitespace-pre"></p>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-[#42be65] text-[16px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">5.2%</p>
      </div>
    </div>
  );
}

function Frame1000004569() {
  return (
    <div className="box-border content-stretch flex flex-row gap-3 h-full items-center justify-start p-0 relative shrink-0">
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#000b25] text-[19px] text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">4.3/5</p>
      </div>
      <RevenueIcon8 />
    </div>
  );
}

function Frame8() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Element10 />
      <div className="flex flex-row items-center self-stretch">
        <Frame1000004569 />
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2.5 h-[7px] items-start justify-end left-0 overflow-clip p-0 translate-y-[-50%] w-[489px]"
      data-name="FRAME"
      style={{ top: "calc(50% + 0.5px)" }}
    >
      <div
        className="bg-blue-500 h-[7px] rounded-bl-[4px] rounded-tl-[4px] shrink-0 w-[572px]"
        data-name="FRAME"
      />
    </div>
  );
}

function Frame10() {
  return (
    <div
      className="basis-0 bg-[rgba(0,133,202,0.15)] grow h-[7px] min-h-px min-w-px overflow-clip relative rounded-br-[4px] rounded-tr-[4px] shrink-0"
      data-name="FRAME"
    >
      <div className="absolute bottom-[-0.83px] flex items-center justify-center left-0 right-0 top-[6.83px]">
        <div className="flex-none h-px scale-y-[-100%] w-[509px]">
          <div className="bg-gray-100 rounded size-full" data-name="FRAME" />
        </div>
      </div>
      <Frame9 />
    </div>
  );
}

function Frame1000004570() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full">
      <Frame10 />
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left w-[91px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Target: 5</p>
      </div>
    </div>
  );
}

function ProgressBarContent2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Progress Bar Content"
    >
      <Frame8 />
      <Frame1000004570 />
    </div>
  );
}

function ProgressBarContainer2() {
  return (
    <div
      className="bg-slate-50 relative rounded-lg shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-end relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 items-end justify-start p-[16px] relative w-full">
          <ProgressBarContent2 />
        </div>
      </div>
    </div>
  );
}

function Image12() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-9 items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Image9"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(0,11,37,0.57)] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Element14() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 11"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[17px] text-[rgba(0,11,37,0.64)] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Net Promoter Score</p>
      </div>
    </div>
  );
}

function Element23() {
  return (
    <div
      className="[flex-flow:wrap] basis-0 box-border content-center flex gap-3 grow items-center justify-start min-h-px min-w-[335px] overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 7"
    >
      <Image12 />
      <Element14 />
    </div>
  );
}

function RevenueIcon9() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center leading-[0] p-0 relative rounded-[5px] shrink-0 text-nowrap"
      data-name="Revenue Icon"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-[14px] text-center text-green-500">
        <p className="block leading-[normal] text-nowrap whitespace-pre"></p>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-[#42be65] text-[16px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">8.1%</p>
      </div>
    </div>
  );
}

function Frame1000004633() {
  return (
    <div className="box-border content-stretch flex flex-row gap-3 h-full items-center justify-start p-0 relative shrink-0">
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#000b25] text-[19px] text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">45</p>
      </div>
      <RevenueIcon9 />
    </div>
  );
}

function Frame11() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Element23 />
      <div className="flex flex-row items-center self-stretch">
        <Frame1000004633 />
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2.5 h-[7px] items-start justify-end left-0 overflow-clip p-0 translate-y-[-50%] w-[449px]"
      data-name="FRAME"
      style={{ top: "calc(50% + 0.5px)" }}
    >
      <div
        className="bg-blue-500 h-[7px] rounded-bl-[4px] rounded-tl-[4px] shrink-0 w-[572px]"
        data-name="FRAME"
      />
    </div>
  );
}

function Frame13() {
  return (
    <div
      className="basis-0 bg-[rgba(0,133,202,0.15)] grow h-[7px] min-h-px min-w-px overflow-clip relative rounded-br-[4px] rounded-tr-[4px] shrink-0"
      data-name="FRAME"
    >
      <div className="absolute bottom-[-0.83px] flex items-center justify-center left-0 right-0 top-[6.83px]">
        <div className="flex-none h-px scale-y-[-100%] w-[509px]">
          <div className="bg-gray-100 rounded size-full" data-name="FRAME" />
        </div>
      </div>
      <Frame12 />
    </div>
  );
}

function Frame1000004634() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full">
      <Frame13 />
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left w-[91px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">{` Target: 50`}</p>
      </div>
    </div>
  );
}

function ProgressBarContent3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Progress Bar Content"
    >
      <Frame11 />
      <Frame1000004634 />
    </div>
  );
}

function ProgressBarContainer3() {
  return (
    <div
      className="bg-slate-50 relative rounded-lg shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-end relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 items-end justify-start p-[16px] relative w-full">
          <ProgressBarContent3 />
        </div>
      </div>
    </div>
  );
}

function Image13() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-9 items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Image9"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(0,11,37,0.57)] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Element24() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 11"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[17px] text-[rgba(0,11,37,0.64)] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">High-Frequency Score</p>
      </div>
    </div>
  );
}

function Element28() {
  return (
    <div
      className="[flex-flow:wrap] basis-0 box-border content-center flex gap-3 grow items-center justify-start min-h-px min-w-[335px] overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 7"
    >
      <Image13 />
      <Element24 />
    </div>
  );
}

function RevenueIcon10() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center leading-[0] p-0 relative rounded-[5px] shrink-0 text-nowrap"
      data-name="Revenue Icon"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-[14px] text-center text-green-500">
        <p className="block leading-[normal] text-nowrap whitespace-pre"></p>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-[#42be65] text-[16px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">8.1%</p>
      </div>
    </div>
  );
}

function Frame1000004635() {
  return (
    <div className="box-border content-stretch flex flex-row gap-3 h-full items-center justify-start p-0 relative shrink-0">
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#000b25] text-[19px] text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">96.88%</p>
      </div>
      <RevenueIcon10 />
    </div>
  );
}

function Frame14() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Element28 />
      <div className="flex flex-row items-center self-stretch">
        <Frame1000004635 />
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2.5 h-[7px] items-start justify-end left-0 overflow-clip p-0 translate-y-[-50%] w-[475px]"
      data-name="FRAME"
      style={{ top: "calc(50% + 0.5px)" }}
    >
      <div
        className="bg-blue-500 h-[7px] rounded-bl-[4px] rounded-tl-[4px] shrink-0 w-[572px]"
        data-name="FRAME"
      />
    </div>
  );
}

function Frame16() {
  return (
    <div
      className="basis-0 bg-[rgba(0,133,202,0.15)] grow h-[7px] min-h-px min-w-px overflow-clip relative rounded-br-[4px] rounded-tr-[4px] shrink-0"
      data-name="FRAME"
    >
      <div className="absolute bottom-[-0.83px] flex items-center justify-center left-0 right-0 top-[6.83px]">
        <div className="flex-none h-px scale-y-[-100%] w-[509px]">
          <div className="bg-gray-100 rounded size-full" data-name="FRAME" />
        </div>
      </div>
      <Frame15 />
    </div>
  );
}

function Frame1000004636() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full">
      <Frame16 />
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left w-[91px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Target: 95%</p>
      </div>
    </div>
  );
}

function ProgressBarContent4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Progress Bar Content"
    >
      <Frame14 />
      <Frame1000004636 />
    </div>
  );
}

function ProgressBarContainer4() {
  return (
    <div
      className="bg-slate-50 relative rounded-lg shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-end relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 items-end justify-start p-[16px] relative w-full">
          <ProgressBarContent4 />
        </div>
      </div>
    </div>
  );
}

function Image14() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-9 items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Image9"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(0,11,37,0.57)] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">star</p>
      </div>
    </div>
  );
}

function Element30() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 11"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[17px] text-[rgba(0,11,37,0.64)] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Positive vs Critical Feedback</p>
      </div>
    </div>
  );
}

function Element32() {
  return (
    <div
      className="[flex-flow:wrap] basis-0 box-border content-center flex gap-3 grow items-center justify-start min-h-px min-w-[335px] overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 7"
    >
      <Image14 />
      <Element30 />
    </div>
  );
}

function RevenueIcon11() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center p-0 relative rounded-[5px] shrink-0"
      data-name="Revenue Icon"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#42be65] text-[16px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">{`Gold: 58 `}</p>
      </div>
    </div>
  );
}

function Frame1000004637() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-start p-0 relative shrink-0">
      <RevenueIcon11 />
      <div className="flex h-[20px] items-center justify-center relative shrink-0 w-[0px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-5">
            <div
              className="absolute bottom-0 left-0 right-0 top-[-1px]"
              style={
                {
                  "--stroke-0": "rgba(226, 232, 240, 1)",
                } as React.CSSProperties
              }
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                role="presentation"
                viewBox="0 0 20 1"
              >
                <line
                  id="Line 4"
                  stroke="var(--stroke-0, #E2E8F0)"
                  x2="20"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[16px] text-left text-nowrap text-red-500"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">Red: 1</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Element32 />
      <div className="flex flex-row items-center self-stretch">
        <Frame1000004637 />
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2.5 h-2.5 items-start justify-end left-0 overflow-clip p-0 translate-y-[-50%] w-[497px]"
      data-name="FRAME"
      style={{ top: "calc(50% - 0.5px)" }}
    >
      <div
        className="bg-green-500 h-2 rounded-bl-[4px] rounded-tl-[4px] shrink-0 w-[572px]"
        data-name="FRAME"
      />
    </div>
  );
}

function Frame19() {
  return (
    <div
      className="basis-0 bg-[rgba(73,209,111,0.15)] grow h-[7px] min-h-px min-w-px overflow-clip relative rounded-br-[4px] rounded-tr-[4px] shrink-0"
      data-name="FRAME"
    >
      <div className="absolute bottom-[-0.83px] flex items-center justify-center left-0 right-0 top-[6.83px]">
        <div className="flex-none h-px scale-y-[-100%] w-[509px]">
          <div className="bg-gray-100 rounded size-full" data-name="FRAME" />
        </div>
      </div>
      <Frame18 />
    </div>
  );
}

function Frame1000004638() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full">
      <Frame19 />
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left w-[91px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">59</p>
      </div>
    </div>
  );
}

function ProgressBarContent5() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Progress Bar Content"
    >
      <Frame17 />
      <Frame1000004638 />
    </div>
  );
}

function ProgressBarContainer5() {
  return (
    <div
      className="bg-slate-50 relative rounded-lg shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-end relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 items-end justify-start p-[16px] relative w-full">
          <ProgressBarContent5 />
        </div>
      </div>
    </div>
  );
}

function Element33() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start min-w-[335px] overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 25"
    >
      <ProgressBarContainer2 />
      <ProgressBarContainer3 />
      <ProgressBarContainer4 />
      <ProgressBarContainer5 />
    </div>
  );
}

function Element35() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-2xl shrink-0"
      data-name="ELEMENT 7"
    >
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-[24px] relative w-full">
          <ProgressBarContainer1 />
          <Element33 />
        </div>
      </div>
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-2xl" />
    </div>
  );
}

function Frame1000004639() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative shrink-0 w-full">
      <Element8 />
      <Element35 />
    </div>
  );
}

function Image15() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-9 items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Image9"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0066ff] text-[24px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Element36() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 11"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000000] text-[22px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">
          Strategic Priorities - Q3 to Q4 Growth
        </p>
      </div>
    </div>
  );
}

function Element37() {
  return (
    <div
      className="[flex-flow:wrap] basis-0 box-border content-center flex gap-3 grow items-center justify-start min-h-px min-w-[335px] overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 7"
    >
      <Image15 />
      <Element36 />
    </div>
  );
}

function Textfield12() {
  return (
    <div className="relative rounded-[29px] shrink-0" data-name="Textfield">
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start overflow-clip px-3 py-1 relative">
        <div
          className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#0066ff] text-[14px] text-left text-nowrap"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          <p className="block leading-[1.2] whitespace-pre">5 Categories</p>
        </div>
      </div>
      <div className="absolute border border-[rgba(0,85,255,0.2)] border-solid inset-0 pointer-events-none rounded-[29px]" />
    </div>
  );
}

function Frame1000004598() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
      <Textfield12 />
      <div
        className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#ffad33] text-[24px] text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">75%</p>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Element37 />
      <Frame1000004598 />
    </div>
  );
}

function ProgressBarContent6() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Progress Bar Content"
    >
      <Frame20 />
    </div>
  );
}

function ProgressBarContainer6() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-end justify-start p-0 relative shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <ProgressBarContent6 />
    </div>
  );
}

function Element41() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 11"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[19px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">SMS</p>
      </div>
    </div>
  );
}

function Frame1000004573() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full">
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">
          Market Share: 28.9%
        </p>
      </div>
    </div>
  );
}

function ProgressBarContent7() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-center justify-center p-0 relative shrink-0 w-[180px]"
      data-name="Progress Bar Content"
    >
      <Element41 />
      <Frame1000004573 />
    </div>
  );
}

function Frame1000004579() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row gap-4 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="relative shrink-0 size-3">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 12 12"
        >
          <circle
            cx="6"
            cy="6"
            fill="var(--fill-0, #6366F1)"
            id="Ellipse 11"
            r="6"
          />
        </svg>
      </div>
      <ProgressBarContent7 />
    </div>
  );
}

function ProgressBarContainer7() {
  return (
    <div
      className="bg-slate-50 relative rounded-lg shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-10 items-center justify-center p-[16px] relative w-full">
          <Frame1000004579 />
          <div
            className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#42be65] text-[24px] text-nowrap text-right"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="block leading-[1.2] whitespace-pre">95%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Element43() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 11"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[19px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">Mobile</p>
      </div>
    </div>
  );
}

function Frame1000004640() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full">
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">
          Market Share: 45.3%
        </p>
      </div>
    </div>
  );
}

function ProgressBarContent8() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-center justify-center p-0 relative shrink-0 w-[180px]"
      data-name="Progress Bar Content"
    >
      <Element43 />
      <Frame1000004640 />
    </div>
  );
}

function Frame1000004641() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row gap-4 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="relative shrink-0 size-3">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 12 12"
        >
          <circle
            cx="6"
            cy="6"
            fill="var(--fill-0, #EF4444)"
            id="Ellipse 11"
            r="6"
          />
        </svg>
      </div>
      <ProgressBarContent8 />
    </div>
  );
}

function ProgressBarContainer8() {
  return (
    <div
      className="bg-slate-50 relative rounded-lg shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-10 items-center justify-center p-[16px] relative w-full">
          <Frame1000004641 />
          <div
            className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#42be65] text-[24px] text-nowrap text-right"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="block leading-[1.2] whitespace-pre">90%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1000004601() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <ProgressBarContainer7 />
      <ProgressBarContainer8 />
    </div>
  );
}

function Element45() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 11"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[19px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">{`Fixed `}</p>
      </div>
    </div>
  );
}

function Frame1000004642() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full">
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">
          Market Share: 28.9%
        </p>
      </div>
    </div>
  );
}

function ProgressBarContent9() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-center justify-center p-0 relative shrink-0 w-[180px]"
      data-name="Progress Bar Content"
    >
      <Element45 />
      <Frame1000004642 />
    </div>
  );
}

function Frame1000004643() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row gap-4 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="relative shrink-0 size-3">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 12 12"
        >
          <circle
            cx="6"
            cy="6"
            fill="var(--fill-0, #F97316)"
            id="Ellipse 11"
            r="6"
          />
        </svg>
      </div>
      <ProgressBarContent9 />
    </div>
  );
}

function ProgressBarContainer9() {
  return (
    <div
      className="bg-slate-50 relative rounded-lg shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-10 items-center justify-center p-[16px] relative w-full">
          <Frame1000004643 />
          <div
            className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#42be65] text-[24px] text-nowrap text-right"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="block leading-[1.2] whitespace-pre">95%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Element47() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 11"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[19px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">Device</p>
      </div>
    </div>
  );
}

function Frame1000004644() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full">
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">
          Market Share: 38.7%
        </p>
      </div>
    </div>
  );
}

function ProgressBarContent10() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-center justify-center p-0 relative shrink-0 w-[180px]"
      data-name="Progress Bar Content"
    >
      <Element47 />
      <Frame1000004644 />
    </div>
  );
}

function Frame1000004645() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row gap-4 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="relative shrink-0 size-3">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 12 12"
        >
          <circle
            cx="6"
            cy="6"
            fill="var(--fill-0, #0EA5E9)"
            id="Ellipse 11"
            r="6"
          />
        </svg>
      </div>
      <ProgressBarContent10 />
    </div>
  );
}

function ProgressBarContainer10() {
  return (
    <div
      className="bg-slate-50 relative rounded-lg shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-10 items-center justify-center p-[16px] relative w-full">
          <Frame1000004645 />
          <div
            className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#ffb500] text-[24px] text-nowrap text-right"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="block leading-[1.2] whitespace-pre">77%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1000004602() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <ProgressBarContainer9 />
      <ProgressBarContainer10 />
    </div>
  );
}

function Frame1000004603() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame1000004601 />
      <Frame1000004602 />
    </div>
  );
}

function Element48() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 11"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[19px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">ICT</p>
      </div>
    </div>
  );
}

function Frame1000004646() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full">
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">
          Market Share: 22.1%
        </p>
      </div>
    </div>
  );
}

function ProgressBarContent11() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-center justify-center p-0 relative shrink-0 w-[180px]"
      data-name="Progress Bar Content"
    >
      <Element48 />
      <Frame1000004646 />
    </div>
  );
}

function Frame1000004647() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row gap-4 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="relative shrink-0 size-3">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 12 12"
        >
          <circle
            cx="6"
            cy="6"
            fill="var(--fill-0, #00B0B2)"
            id="Ellipse 11"
            r="6"
          />
        </svg>
      </div>
      <ProgressBarContent11 />
    </div>
  );
}

function ProgressBarContainer11() {
  return (
    <div
      className="bg-slate-50 box-border content-stretch flex flex-row gap-10 items-center justify-center p-[16px] relative rounded-lg shrink-0 w-[668px]"
      data-name="Progress Bar Container"
    >
      <Frame1000004647 />
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#42be65] text-[24px] text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">88%</p>
      </div>
    </div>
  );
}

function Frame1000004575() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full">
      <Frame1000004603 />
      <ProgressBarContainer11 />
    </div>
  );
}

function Element26() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-center min-w-[335px] overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 26"
    >
      <Frame1000004575 />
    </div>
  );
}

function Frame1000004584() {
  return (
    <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
      <Element26 />
    </div>
  );
}

function Image16() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Image9"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0066ff] text-[24px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Element50() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 11"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000000] text-[22px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Overall Strategic Score</p>
      </div>
    </div>
  );
}

function Element51() {
  return (
    <div
      className="[flex-flow:wrap] box-border content-center flex gap-3 items-center justify-start min-w-[335px] overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 7"
    >
      <Image16 />
      <Element50 />
    </div>
  );
}

function Frame1000004582() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
      <Element51 />
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">
          Weighted performance across all strategic priorities
        </p>
      </div>
    </div>
  );
}

function RevenueIcon12() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center leading-[0] p-0 relative rounded-[5px] shrink-0 text-green-500 text-nowrap"
      data-name="Revenue Icon"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-[16px] text-center">
        <p className="block leading-[normal] text-nowrap whitespace-pre"></p>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-[14px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">
          +5.2% QoQ
        </p>
      </div>
    </div>
  );
}

function Frame1000004648() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-0 relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <RevenueIcon12 />
      </div>
    </div>
  );
}

function Frame1000004583() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-center justify-center p-0 relative shrink-0">
      <div
        className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[32px] text-blue-500 text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">75%</p>
      </div>
      <Frame1000004648 />
    </div>
  );
}

function Frame21() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Frame1000004582 />
      <Frame1000004583 />
    </div>
  );
}

function Frame22() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row gap-2.5 items-center justify-center overflow-clip p-0 relative shrink-0"
      data-name="FRAME"
    >
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">
          Strategic Goal Achievement
        </p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Frame22 />
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">
          75% of 85% threshold
        </p>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2.5 h-[11px] items-start justify-end left-0 overflow-clip p-0 rounded top-1/2 translate-y-[-50%] w-[1035px]"
      data-name="FRAME"
    >
      <div
        className="basis-0 bg-blue-500 grow min-h-px min-w-px rounded-bl-[4px] rounded-tl-[4px] shrink-0 w-full"
        data-name="FRAME"
      />
    </div>
  );
}

function Frame25() {
  return (
    <div
      className="bg-[rgba(0,133,202,0.15)] h-[11px] overflow-clip relative rounded shrink-0 w-full"
      data-name="FRAME"
    >
      <div
        className="absolute flex h-[25px] items-center justify-center left-0 right-0 translate-y-[-50%]"
        style={{ top: "calc(50% - 4px)" }}
      >
        <div className="flex-none h-[25px] scale-y-[-100%] w-[1296px]">
          <div className="bg-[#ffffff] rounded size-full" data-name="FRAME" />
        </div>
      </div>
      <Frame24 />
    </div>
  );
}

function ProgressBarContent12() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Progress Bar Content"
    >
      <Frame23 />
      <Frame25 />
    </div>
  );
}

function ProgressBarContainer12() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-end justify-start p-0 relative shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <ProgressBarContent12 />
    </div>
  );
}

function ProgressBarContent13() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Progress Bar Content"
    >
      <Frame21 />
      <ProgressBarContainer12 />
    </div>
  );
}

function ProgressBarContainer13() {
  return (
    <div
      className="bg-[#f2f6ff] relative rounded-lg shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <div className="absolute border border-[rgba(59,130,246,0.4)] border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-end relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 items-end justify-start p-[24px] relative w-full">
          <ProgressBarContent13 />
        </div>
      </div>
    </div>
  );
}

function Element52() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-2xl shrink-0"
      data-name="ELEMENT 7"
    >
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-[24px] relative w-full">
          <ProgressBarContainer6 />
          <Frame1000004584 />
          <ProgressBarContainer13 />
        </div>
      </div>
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-2xl" />
    </div>
  );
}

function Frame1000004600() {
  return (
    <div className="box-border content-stretch flex flex-row gap-6 items-start justify-start p-0 relative shrink-0 w-full">
      <Element52 />
    </div>
  );
}

function Image17() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-9 items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Image9"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0066ff] text-[24px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Element53() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 11"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000000] text-[22px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Team Performance Leaderboard</p>
      </div>
    </div>
  );
}

function Element54() {
  return (
    <div
      className="[flex-flow:wrap] basis-0 box-border content-center flex gap-3 grow items-center justify-start min-h-px min-w-[335px] overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 7"
    >
      <Image17 />
      <Element53 />
    </div>
  );
}

function Frame26() {
  return (
    <div
      className="basis-0 bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row grow items-center justify-between min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="FRAME"
    >
      <Element54 />
    </div>
  );
}

function Icon13() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0 size-5"
      data-name="Icon"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[17px] text-[rgba(0,11,37,0.64)] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">search</p>
      </div>
    </div>
  );
}

function Textfield13() {
  return (
    <div
      className="bg-[#ffffff] h-[38px] relative rounded shrink-0"
      data-name="Textfield"
    >
      <div className="box-border content-stretch flex flex-row gap-3 h-[38px] items-center justify-start overflow-clip px-3 py-0 relative">
        <Icon13 />
        <div
          className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          <p className="block leading-[24px] whitespace-pre">
            Overall Achievement
          </p>
        </div>
      </div>
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded" />
    </div>
  );
}

function Icon15() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0 size-5"
      data-name="Icon"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[17px] text-[rgba(0,11,37,0.64)] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">angle-down</p>
      </div>
    </div>
  );
}

function Textfield14() {
  return (
    <div
      className="bg-[#ffffff] h-[38px] relative rounded shrink-0"
      data-name="Textfield"
    >
      <div className="box-border content-stretch flex flex-row gap-3 h-[38px] items-center justify-start overflow-clip px-3 py-0 relative">
        <div
          className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          <p className="block leading-[24px] whitespace-pre">
            Overall Achievement
          </p>
        </div>
        <Icon15 />
      </div>
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded" />
    </div>
  );
}

function ProgressBarContent14() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-4 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Progress Bar Content"
    >
      <Frame26 />
      <Textfield13 />
      <Textfield14 />
    </div>
  );
}

function ProgressBarContainer14() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-end justify-start p-0 relative shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <ProgressBarContent14 />
    </div>
  );
}

function Status() {
  return (
    <div
      className="absolute right-3.5 size-3 top-[-3.5px]"
      data-name="Status"
    />
  );
}

function Icon16() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-0 relative rounded-3xl shrink-0 size-10"
      data-name="icon"
    >
      <div className="absolute border-2 border-slate-200 border-solid inset-0 pointer-events-none rounded-3xl" />
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffb500] text-[20px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
      <Status />
    </div>
  );
}

function Cell() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 h-16 items-start justify-start px-0 py-3 relative shrink-0"
      data-name="Cell"
    >
      <Icon16 />
    </div>
  );
}

function Status1() {
  return (
    <div
      className="absolute right-3.5 size-3 top-[-3.5px]"
      data-name="Status"
    />
  );
}

function Icon17() {
  return (
    <div
      className="bg-[#2d6ef0] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-0 relative rounded-3xl shrink-0 size-10"
      data-name="icon"
    >
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">A</p>
      </div>
      <Status1 />
    </div>
  );
}

function Frame1000004589() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center p-0 relative shrink-0">
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">
          Senior Account Manager
        </p>
      </div>
      <div className="relative shrink-0 size-1">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 4 4"
        >
          <circle
            cx="2"
            cy="2"
            fill="var(--fill-0, #000B25)"
            fillOpacity="0.57"
            id="Ellipse 20"
            r="2"
          />
        </svg>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#42be65] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="leading-[1.2] whitespace-pre">
          <span className="text-[rgba(0,11,37,0.64)]">Payout:</span>
          <span>{` 942 OMR`}</span>
        </p>
      </div>
    </div>
  );
}

function Frame1000004649() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center p-0 relative shrink-0">
      <Frame1000004589 />
    </div>
  );
}

function Text() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-start justify-center p-0 relative shrink-0"
      data-name="text"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#000b25] text-[16px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">Ahmed Al-Rashid</p>
      </div>
      <Frame1000004649 />
    </div>
  );
}

function Frame40903() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0">
      <Icon17 />
      <Text />
    </div>
  );
}

function Cell1() {
  return (
    <div
      className="basis-0 grow h-16 min-h-px min-w-px relative shrink-0"
      data-name="Cell"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 h-16 items-start justify-start px-4 py-3 relative w-full">
          <Frame40903 />
        </div>
      </div>
    </div>
  );
}

function Textfield15() {
  return (
    <div
      className="bg-orange-50 relative rounded-[29px] shrink-0"
      data-name="Textfield"
    >
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start leading-[0] overflow-clip px-3 py-1 relative text-[#ff9900] text-nowrap">
        <div className="font-['Font_Awesome_6_Pro:Solid',_sans-serif] not-italic relative shrink-0 text-[13px] text-center">
          <p className="block leading-[normal] text-nowrap whitespace-pre">
            #1
          </p>
        </div>
        <div
          className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-[14px] text-left"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          <p className="block leading-[1.2] text-nowrap whitespace-pre">
            Performer
          </p>
        </div>
      </div>
      <div className="absolute border border-[rgba(249,115,22,0.2)] border-solid inset-0 pointer-events-none rounded-[29px]" />
    </div>
  );
}

function RevenueIcon13() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center leading-[0] p-0 relative rounded-[5px] shrink-0 text-[16px] text-green-500 text-nowrap"
      data-name="Revenue Icon"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-center">
        <p className="block leading-[normal] text-nowrap whitespace-pre"></p>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">+12.2%</p>
      </div>
    </div>
  );
}

function Frame1000004650() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <RevenueIcon13 />
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">vs last period</p>
      </div>
    </div>
  );
}

function Frame1000004591() {
  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-center justify-center p-0 relative shrink-0">
      <Textfield15 />
      <Frame1000004650 />
    </div>
  );
}

function Circle() {
  return (
    <div className="relative shrink-0 size-16" data-name="Circle">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 64 64"
      >
        <g id="Circle">
          <g id="base" opacity="0.2">
            <mask fill="white" id="path-1-inside-1_1_3974">
              <path d={svgPaths.p35840e00} />
            </mask>
            <path
              d={svgPaths.p35840e00}
              fill="var(--fill-0, #B0D9EF)"
              mask="url(#path-1-inside-1_1_3974)"
              stroke="var(--stroke-0, #B0D9EF)"
              strokeLinecap="round"
              strokeWidth="4.26667"
            />
          </g>
          <g id="Ellipse">
            <mask fill="white" id="path-2-inside-2_1_3974">
              <path d={svgPaths.p31adb370} />
            </mask>
            <path
              d={svgPaths.p31adb370}
              fill="var(--fill-0, #0066FF)"
              mask="url(#path-2-inside-2_1_3974)"
              stroke="var(--stroke-0, #0066FF)"
              strokeLinecap="round"
              strokeWidth="4.26667"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Number() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-0.5 items-center justify-center left-1/2 p-0 top-1/2 translate-x-[-50%] translate-y-[-50%]"
      data-name="number"
    >
      <div
        className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0066ff] text-[16px] text-center text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre" dir="auto">
          90%
        </p>
      </div>
    </div>
  );
}

function Circle1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[7.111px] items-start justify-start p-0 relative shrink-0"
      data-name="circle"
    >
      <Circle />
      <Number />
    </div>
  );
}

function Frame1000004590() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0">
      <Frame1000004591 />
      <Circle1 />
    </div>
  );
}

function Tr() {
  return (
    <div
      className="bg-[#fff8e6] relative rounded-lg shrink-0 w-full"
      data-name="TR"
    >
      <div className="absolute border border-[rgba(255,181,0,0.3)] border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative w-full">
          <Cell />
          <Cell1 />
          <Frame1000004590 />
        </div>
      </div>
    </div>
  );
}

function Status2() {
  return (
    <div
      className="absolute right-3.5 size-3 top-[-3.5px]"
      data-name="Status"
    />
  );
}

function Icon19() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-0 relative rounded-3xl shrink-0 size-10"
      data-name="icon"
    >
      <div className="absolute border-2 border-slate-200 border-solid inset-0 pointer-events-none rounded-3xl" />
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-left text-nowrap text-slate-500">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
      <Status2 />
    </div>
  );
}

function Cell2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 h-16 items-start justify-start px-0 py-3 relative shrink-0"
      data-name="Cell"
    >
      <Icon19 />
    </div>
  );
}

function Status3() {
  return (
    <div
      className="absolute right-3.5 size-3 top-[-3.5px]"
      data-name="Status"
    />
  );
}

function Icon20() {
  return (
    <div
      className="bg-[#2d6ef0] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-0 relative rounded-3xl shrink-0 size-10"
      data-name="icon"
    >
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">F</p>
      </div>
      <Status3 />
    </div>
  );
}

function Frame1000004651() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center p-0 relative shrink-0">
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">
          Senior Account Manager
        </p>
      </div>
      <div className="relative shrink-0 size-1">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 4 4"
        >
          <circle
            cx="2"
            cy="2"
            fill="var(--fill-0, #000B25)"
            fillOpacity="0.57"
            id="Ellipse 20"
            r="2"
          />
        </svg>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#42be65] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="leading-[1.2] whitespace-pre">
          <span className="text-[rgba(0,11,37,0.64)]">Payout:</span>
          <span>{` 365 OMR`}</span>
        </p>
      </div>
    </div>
  );
}

function Frame1000004652() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center p-0 relative shrink-0">
      <Frame1000004651 />
    </div>
  );
}

function Text1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-start justify-center p-0 relative shrink-0"
      data-name="text"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#000b25] text-[16px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">Fatima Al-Zahra</p>
      </div>
      <Frame1000004652 />
    </div>
  );
}

function Frame40904() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0">
      <Icon20 />
      <Text1 />
    </div>
  );
}

function Cell3() {
  return (
    <div
      className="basis-0 grow h-16 min-h-px min-w-px relative shrink-0"
      data-name="Cell"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 h-16 items-start justify-start px-4 py-3 relative w-full">
          <Frame40904 />
        </div>
      </div>
    </div>
  );
}

function RevenueIcon14() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center leading-[0] p-0 relative rounded-[5px] shrink-0 text-[16px] text-green-500 text-nowrap"
      data-name="Revenue Icon"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-center">
        <p className="block leading-[normal] text-nowrap whitespace-pre"></p>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">+7.8%</p>
      </div>
    </div>
  );
}

function Frame1000004653() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <RevenueIcon14 />
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">vs last period</p>
      </div>
    </div>
  );
}

function Circle2() {
  return (
    <div className="relative shrink-0 size-16" data-name="Circle">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 64 64"
      >
        <g id="Circle">
          <g id="base" opacity="0.2">
            <mask fill="white" id="path-1-inside-1_1_4020">
              <path d={svgPaths.p35840e00} />
            </mask>
            <path
              d={svgPaths.p35840e00}
              fill="var(--fill-0, #B0D9EF)"
              mask="url(#path-1-inside-1_1_4020)"
              stroke="var(--stroke-0, #B0D9EF)"
              strokeLinecap="round"
              strokeWidth="4.26667"
            />
          </g>
          <g id="Ellipse">
            <mask fill="white" id="path-2-inside-2_1_4020">
              <path d={svgPaths.pb76d400} />
            </mask>
            <path
              d={svgPaths.pb76d400}
              fill="var(--fill-0, #0066FF)"
              mask="url(#path-2-inside-2_1_4020)"
              stroke="var(--stroke-0, #0066FF)"
              strokeLinecap="round"
              strokeWidth="4.26667"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Number1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-0.5 items-center justify-center left-1/2 p-0 top-1/2 translate-x-[-50%] translate-y-[-50%]"
      data-name="number"
    >
      <div
        className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0066ff] text-[16px] text-center text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre" dir="auto">
          84%
        </p>
      </div>
    </div>
  );
}

function Circle3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[7.111px] items-start justify-start p-0 relative shrink-0"
      data-name="circle"
    >
      <Circle2 />
      <Number1 />
    </div>
  );
}

function Frame1000004654() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0">
      <Frame1000004653 />
      <Circle3 />
    </div>
  );
}

function Tr1() {
  return (
    <div
      className="bg-slate-50 relative rounded-lg shrink-0 w-full"
      data-name="TR"
    >
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative w-full">
          <Cell2 />
          <Cell3 />
          <Frame1000004654 />
        </div>
      </div>
    </div>
  );
}

function Status4() {
  return (
    <div
      className="absolute right-3.5 size-3 top-[-3.5px]"
      data-name="Status"
    />
  );
}

function Icon21() {
  return (
    <div
      className="bg-[#fff8e6] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-0 relative rounded-3xl shrink-0 size-10"
      data-name="icon"
    >
      <div className="absolute border-2 border-slate-200 border-solid inset-0 pointer-events-none rounded-3xl" />
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b58100] text-[20px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
      <Status4 />
    </div>
  );
}

function Cell4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 h-16 items-start justify-start px-0 py-3 relative shrink-0"
      data-name="Cell"
    >
      <Icon21 />
    </div>
  );
}

function Status5() {
  return (
    <div
      className="absolute right-3.5 size-3 top-[-3.5px]"
      data-name="Status"
    />
  );
}

function Icon22() {
  return (
    <div
      className="bg-[#2d6ef0] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-0 relative rounded-3xl shrink-0 size-10"
      data-name="icon"
    >
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">M</p>
      </div>
      <Status5 />
    </div>
  );
}

function Frame1000004655() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center p-0 relative shrink-0">
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">
          Senior Account Manager
        </p>
      </div>
      <div className="relative shrink-0 size-1">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 4 4"
        >
          <circle
            cx="2"
            cy="2"
            fill="var(--fill-0, #000B25)"
            fillOpacity="0.57"
            id="Ellipse 20"
            r="2"
          />
        </svg>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#42be65] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="leading-[1.2] whitespace-pre">
          <span className="text-[rgba(0,11,37,0.64)]">Payout:</span>
          <span>{` 547 OMR`}</span>
        </p>
      </div>
    </div>
  );
}

function Frame1000004656() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center p-0 relative shrink-0">
      <Frame1000004655 />
    </div>
  );
}

function Text2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-start justify-center p-0 relative shrink-0"
      data-name="text"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#000b25] text-[16px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">Mohamed Al-Balushi</p>
      </div>
      <Frame1000004656 />
    </div>
  );
}

function Frame40905() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0">
      <Icon22 />
      <Text2 />
    </div>
  );
}

function Cell5() {
  return (
    <div
      className="basis-0 grow h-16 min-h-px min-w-px relative shrink-0"
      data-name="Cell"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 h-16 items-start justify-start px-4 py-3 relative w-full">
          <Frame40905 />
        </div>
      </div>
    </div>
  );
}

function RevenueIcon15() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center leading-[0] p-0 relative rounded-[5px] shrink-0 text-[16px] text-green-500 text-nowrap"
      data-name="Revenue Icon"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-center">
        <p className="block leading-[normal] text-nowrap whitespace-pre"></p>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">+9.1%</p>
      </div>
    </div>
  );
}

function Frame1000004657() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <RevenueIcon15 />
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">vs last period</p>
      </div>
    </div>
  );
}

function Circle4() {
  return (
    <div className="relative shrink-0 size-16" data-name="Circle">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 64 64"
      >
        <g id="Circle">
          <g id="base" opacity="0.2">
            <mask fill="white" id="path-1-inside-1_1_4004">
              <path d={svgPaths.p35840e00} />
            </mask>
            <path
              d={svgPaths.p35840e00}
              fill="var(--fill-0, #B0D9EF)"
              mask="url(#path-1-inside-1_1_4004)"
              stroke="var(--stroke-0, #B0D9EF)"
              strokeLinecap="round"
              strokeWidth="4.26667"
            />
          </g>
          <g id="Ellipse">
            <mask fill="white" id="path-2-inside-2_1_4004">
              <path d={svgPaths.p6b3d340} />
            </mask>
            <path
              d={svgPaths.p6b3d340}
              fill="var(--fill-0, #0066FF)"
              mask="url(#path-2-inside-2_1_4004)"
              stroke="var(--stroke-0, #0066FF)"
              strokeLinecap="round"
              strokeWidth="4.26667"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Number2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-0.5 items-center justify-center left-1/2 p-0 top-1/2 translate-x-[-50%] translate-y-[-50%]"
      data-name="number"
    >
      <div
        className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0066ff] text-[16px] text-center text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre" dir="auto">
          68%
        </p>
      </div>
    </div>
  );
}

function Circle5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[7.111px] items-start justify-start p-0 relative shrink-0"
      data-name="circle"
    >
      <Circle4 />
      <Number2 />
    </div>
  );
}

function Frame1000004658() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0">
      <Frame1000004657 />
      <Circle5 />
    </div>
  );
}

function Tr2() {
  return (
    <div
      className="bg-slate-50 relative rounded-lg shrink-0 w-full"
      data-name="TR"
    >
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative w-full">
          <Cell4 />
          <Cell5 />
          <Frame1000004658 />
        </div>
      </div>
    </div>
  );
}

function Status6() {
  return (
    <div
      className="absolute right-3.5 size-3 top-[-3.5px]"
      data-name="Status"
    />
  );
}

function Icon23() {
  return (
    <div
      className="bg-slate-200 box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-0 relative rounded-3xl shrink-0 size-10"
      data-name="icon"
    >
      <div className="absolute border-2 border-slate-200 border-solid inset-0 pointer-events-none rounded-3xl" />
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-left text-nowrap text-slate-500">
        <p className="block leading-[normal] whitespace-pre">4</p>
      </div>
      <Status6 />
    </div>
  );
}

function Cell6() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 h-16 items-start justify-start px-0 py-3 relative shrink-0"
      data-name="Cell"
    >
      <Icon23 />
    </div>
  );
}

function Status7() {
  return (
    <div
      className="absolute right-3.5 size-3 top-[-3.5px]"
      data-name="Status"
    />
  );
}

function Icon24() {
  return (
    <div
      className="bg-[#2d6ef0] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-0 relative rounded-3xl shrink-0 size-10"
      data-name="icon"
    >
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">s</p>
      </div>
      <Status7 />
    </div>
  );
}

function Frame1000004659() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center p-0 relative shrink-0">
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">
          Senior Account Manager
        </p>
      </div>
      <div className="relative shrink-0 size-1">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 4 4"
        >
          <circle
            cx="2"
            cy="2"
            fill="var(--fill-0, #000B25)"
            fillOpacity="0.57"
            id="Ellipse 20"
            r="2"
          />
        </svg>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#42be65] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="leading-[1.2] whitespace-pre">
          <span className="text-[rgba(0,11,37,0.64)]">Payout:</span>
          <span>{` 112 OMR`}</span>
        </p>
      </div>
    </div>
  );
}

function Frame1000004660() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center p-0 relative shrink-0">
      <Frame1000004659 />
    </div>
  );
}

function Text3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-start justify-center p-0 relative shrink-0"
      data-name="text"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#000b25] text-[16px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">Sarah Al-Kindi</p>
      </div>
      <Frame1000004660 />
    </div>
  );
}

function Frame40906() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0">
      <Icon24 />
      <Text3 />
    </div>
  );
}

function Cell7() {
  return (
    <div
      className="basis-0 grow h-16 min-h-px min-w-px relative shrink-0"
      data-name="Cell"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 h-16 items-start justify-start px-4 py-3 relative w-full">
          <Frame40906 />
        </div>
      </div>
    </div>
  );
}

function RevenueIcon16() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center p-0 relative rounded-[5px] shrink-0"
      data-name="Revenue Icon"
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative text-[16px] text-center text-nowrap text-red-500">
            <p className="block leading-[normal] whitespace-pre"></p>
          </div>
        </div>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[16px] text-left text-nowrap text-red-500"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">-2.5%</p>
      </div>
    </div>
  );
}

function Frame1000004661() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <RevenueIcon16 />
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">vs last period</p>
      </div>
    </div>
  );
}

function Circle6() {
  return (
    <div className="relative shrink-0 size-16" data-name="Circle">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 64 64"
      >
        <g id="Circle">
          <g id="base" opacity="0.2">
            <mask fill="white" id="path-1-inside-1_1_3978">
              <path d={svgPaths.p35840e00} />
            </mask>
            <path
              d={svgPaths.p35840e00}
              fill="var(--fill-0, #B0D9EF)"
              mask="url(#path-1-inside-1_1_3978)"
              stroke="var(--stroke-0, #B0D9EF)"
              strokeLinecap="round"
              strokeWidth="4.26667"
            />
          </g>
          <g id="Ellipse">
            <mask fill="white" id="path-2-inside-2_1_3978">
              <path d={svgPaths.p13284d00} />
            </mask>
            <path
              d={svgPaths.p13284d00}
              fill="var(--fill-0, #0066FF)"
              mask="url(#path-2-inside-2_1_3978)"
              stroke="var(--stroke-0, #0066FF)"
              strokeLinecap="round"
              strokeWidth="4.26667"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Number3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-0.5 items-center justify-center left-1/2 p-0 top-1/2 translate-x-[-50%] translate-y-[-50%]"
      data-name="number"
    >
      <div
        className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0066ff] text-[16px] text-center text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre" dir="auto">
          95%
        </p>
      </div>
    </div>
  );
}

function Circle7() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[7.111px] items-start justify-start p-0 relative shrink-0"
      data-name="circle"
    >
      <Circle6 />
      <Number3 />
    </div>
  );
}

function Frame1000004662() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0">
      <Frame1000004661 />
      <Circle7 />
    </div>
  );
}

function Tr3() {
  return (
    <div
      className="bg-slate-50 relative rounded-lg shrink-0 w-full"
      data-name="TR"
    >
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative w-full">
          <Cell6 />
          <Cell7 />
          <Frame1000004662 />
        </div>
      </div>
    </div>
  );
}

function Status8() {
  return (
    <div
      className="absolute right-3.5 size-3 top-[-3.5px]"
      data-name="Status"
    />
  );
}

function Icon25() {
  return (
    <div
      className="bg-slate-200 box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-0 relative rounded-3xl shrink-0 size-10"
      data-name="icon"
    >
      <div className="absolute border-2 border-slate-200 border-solid inset-0 pointer-events-none rounded-3xl" />
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-left text-nowrap text-slate-500">
        <p className="block leading-[normal] whitespace-pre">5</p>
      </div>
      <Status8 />
    </div>
  );
}

function Cell8() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 h-16 items-start justify-start px-0 py-3 relative shrink-0"
      data-name="Cell"
    >
      <Icon25 />
    </div>
  );
}

function Status9() {
  return (
    <div
      className="absolute right-3.5 size-3 top-[-3.5px]"
      data-name="Status"
    />
  );
}

function Icon26() {
  return (
    <div
      className="bg-[#2d6ef0] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-0 relative rounded-3xl shrink-0 size-10"
      data-name="icon"
    >
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">M</p>
      </div>
      <Status9 />
    </div>
  );
}

function Frame1000004663() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center p-0 relative shrink-0">
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">
          Senior Account Manager
        </p>
      </div>
      <div className="relative shrink-0 size-1">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 4 4"
        >
          <circle
            cx="2"
            cy="2"
            fill="var(--fill-0, #000B25)"
            fillOpacity="0.57"
            id="Ellipse 20"
            r="2"
          />
        </svg>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#42be65] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="leading-[1.2] whitespace-pre">
          <span className="text-[rgba(0,11,37,0.64)]">Payout:</span>
          <span>{` 879 OMR`}</span>
        </p>
      </div>
    </div>
  );
}

function Frame1000004664() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center p-0 relative shrink-0">
      <Frame1000004663 />
    </div>
  );
}

function Text4() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-start justify-center p-0 relative shrink-0"
      data-name="text"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#000b25] text-[16px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">Michael Chen</p>
      </div>
      <Frame1000004664 />
    </div>
  );
}

function Frame40907() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0">
      <Icon26 />
      <Text4 />
    </div>
  );
}

function Cell9() {
  return (
    <div
      className="basis-0 grow h-16 min-h-px min-w-px relative shrink-0"
      data-name="Cell"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 h-16 items-start justify-start px-4 py-3 relative w-full">
          <Frame40907 />
        </div>
      </div>
    </div>
  );
}

function RevenueIcon17() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center leading-[0] p-0 relative rounded-[5px] shrink-0 text-[16px] text-green-500 text-nowrap"
      data-name="Revenue Icon"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-center">
        <p className="block leading-[normal] text-nowrap whitespace-pre"></p>
      </div>
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">+10.2%</p>
      </div>
    </div>
  );
}

function Frame1000004665() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <RevenueIcon17 />
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">vs last period</p>
      </div>
    </div>
  );
}

function Circle8() {
  return (
    <div className="relative shrink-0 size-16" data-name="Circle">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 64 64"
      >
        <g id="Circle">
          <g id="base" opacity="0.2">
            <mask fill="white" id="path-1-inside-1_1_4012">
              <path d={svgPaths.p35840e00} />
            </mask>
            <path
              d={svgPaths.p35840e00}
              fill="var(--fill-0, #B0D9EF)"
              mask="url(#path-1-inside-1_1_4012)"
              stroke="var(--stroke-0, #B0D9EF)"
              strokeLinecap="round"
              strokeWidth="4.26667"
            />
          </g>
          <g id="Ellipse">
            <mask fill="white" id="path-2-inside-2_1_4012">
              <path d={svgPaths.p2fc54f00} />
            </mask>
            <path
              d={svgPaths.p2fc54f00}
              fill="var(--fill-0, #0066FF)"
              mask="url(#path-2-inside-2_1_4012)"
              stroke="var(--stroke-0, #0066FF)"
              strokeLinecap="round"
              strokeWidth="4.26667"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Number4() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-0.5 items-center justify-center left-1/2 p-0 top-1/2 translate-x-[-50%] translate-y-[-50%]"
      data-name="number"
    >
      <div
        className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0066ff] text-[16px] text-center text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre" dir="auto">
          75%
        </p>
      </div>
    </div>
  );
}

function Circle9() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[7.111px] items-start justify-start p-0 relative shrink-0"
      data-name="circle"
    >
      <Circle8 />
      <Number4 />
    </div>
  );
}

function Frame1000004666() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0">
      <Frame1000004665 />
      <Circle9 />
    </div>
  );
}

function Tr4() {
  return (
    <div
      className="bg-slate-50 relative rounded-lg shrink-0 w-full"
      data-name="TR"
    >
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative w-full">
          <Cell8 />
          <Cell9 />
          <Frame1000004666 />
        </div>
      </div>
    </div>
  );
}

function Table() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Table"
    >
      <Tr />
      <Tr1 />
      <Tr2 />
      <Tr3 />
      <Tr4 />
    </div>
  );
}

function PaginationItem() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center opacity-50 p-0 relative rounded-bl-[4px] rounded-tl-[4px] shrink-0 size-10"
      data-name="Pagination item"
    >
      <div className="absolute border border-neutral-100 border-solid inset-[-0.5px] pointer-events-none rounded-bl-[4.5px] rounded-tl-[4.5px]" />
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,11,37,0.57)] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
    </div>
  );
}

function PaginationItem1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center opacity-50 p-0 relative shrink-0 size-10"
      data-name="Pagination item"
    >
      <div className="absolute border border-neutral-100 border-solid inset-[-0.5px] pointer-events-none" />
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,11,37,0.57)] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">angle-left</p>
      </div>
    </div>
  );
}

function PaginationItem2() {
  return (
    <div
      className="bg-[#2d6ef0] box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 size-10"
      data-name="Pagination item"
    >
      <div className="absolute border border-[#2d6ef0] border-solid inset-[-0.5px] pointer-events-none" />
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">1</p>
      </div>
    </div>
  );
}

function PaginationItem3() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 size-10"
      data-name="Pagination item"
    >
      <div className="absolute border border-neutral-100 border-solid inset-[-0.5px] pointer-events-none" />
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-center text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function PaginationItem4() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 size-10"
      data-name="Pagination item"
    >
      <div className="absolute border border-neutral-100 border-solid inset-[-0.5px] pointer-events-none" />
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-center text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function PaginationItem5() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 size-10"
      data-name="Pagination item"
    >
      <div className="absolute border border-neutral-100 border-solid inset-[-0.5px] pointer-events-none" />
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-center text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">4</p>
      </div>
    </div>
  );
}

function PaginationItem6() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 size-10"
      data-name="Pagination item"
    >
      <div className="absolute border border-neutral-100 border-solid inset-[-0.5px] pointer-events-none" />
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">angle-right</p>
      </div>
    </div>
  );
}

function PaginationItem7() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-br-[4px] rounded-tr-[4px] shrink-0 size-10"
      data-name="Pagination item"
    >
      <div className="absolute border border-neutral-100 border-solid inset-[-0.5px] pointer-events-none rounded-br-[4.5px] rounded-tr-[4.5px]" />
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">angles-right</p>
      </div>
    </div>
  );
}

function Pagination() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0"
      data-name="Pagination"
    >
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

function CardContent() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-end justify-start p-0 relative shrink-0 w-full"
      data-name="Card content"
    >
      <Table />
      <Pagination />
    </div>
  );
}

function SectionRevenueByService() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-6 items-center justify-center p-[16px] relative rounded-2xl shrink-0 w-[870px]"
      data-name="Section - Revenue By Service"
    >
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-2xl" />
      <ProgressBarContainer14 />
      <CardContent />
      <div className="absolute left-[638px] size-[5px] top-[219px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 5 5"
        >
          <circle
            cx="2.5"
            cy="2.5"
            id="Ellipse 19"
            r="2"
            stroke="var(--stroke-0, #16A249)"
          />
        </svg>
      </div>
    </div>
  );
}

function Image18() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-9 items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Image9"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0066ff] text-[24px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Element55() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 11"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000000] text-[22px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Revenue Breakdown</p>
      </div>
    </div>
  );
}

function Element56() {
  return (
    <div
      className="[flex-flow:wrap] basis-0 box-border content-center flex gap-3 grow items-center justify-start min-h-px min-w-[335px] overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 7"
    >
      <Image18 />
      <Element55 />
    </div>
  );
}

function Frame27() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Element56 />
      <div
        className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#42be65] text-[24px] text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">98%</p>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row gap-2.5 items-center justify-center overflow-clip p-0 relative shrink-0"
      data-name="FRAME"
    >
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">0%</p>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Frame28 />
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">Target: 100%</p>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2.5 h-[13px] items-start justify-end left-0 overflow-clip p-0 top-1/2 translate-y-[-50%] w-[627px]"
      data-name="FRAME"
    >
      <div
        className="bg-blue-500 h-[13px] rounded shrink-0 w-[627px]"
        data-name="FRAME"
      />
    </div>
  );
}

function Frame31() {
  return (
    <div
      className="bg-[rgba(0,133,202,0.15)] h-[9px] overflow-clip relative rounded-br-[4px] rounded-tr-[4px] shrink-0 w-full"
      data-name="FRAME"
    >
      <div
        className="absolute flex h-4 items-center justify-center left-0 right-0 translate-y-[-50%]"
        style={{ top: "calc(50% + 0.5px)" }}
      >
        <div className="flex-none h-4 scale-y-[-100%] w-[458px]">
          <div className="bg-blue-50 rounded size-full" data-name="FRAME" />
        </div>
      </div>
      <Frame30 />
    </div>
  );
}

function Frame1000004596() {
  return (
    <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame29 />
      <Frame31 />
    </div>
  );
}

function Frame32() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row gap-2.5 items-center justify-center overflow-clip p-0 relative shrink-0"
      data-name="FRAME"
    >
      <div
        className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#000b25] text-[16px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">Current: 2.5M OMR</p>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Frame32 />
      <div
        className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#000b25] text-[16px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">Target: 2.5M OMR</p>
      </div>
    </div>
  );
}

function ProgressBarContent15() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Progress Bar Content"
    >
      <Frame1000004596 />
      <Frame33 />
    </div>
  );
}

function ProgressBarContent16() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Progress Bar Content"
    >
      <Frame27 />
      <ProgressBarContent15 />
    </div>
  );
}

function ProgressBarContainer15() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-end justify-start p-0 relative shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <ProgressBarContent16 />
    </div>
  );
}

function Element67() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 31"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000b25] text-[17px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Mobile</p>
      </div>
    </div>
  );
}

function Element68() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 29"
    >
      <Element67 />
    </div>
  );
}

function Element69() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-end justify-center leading-[0] overflow-clip p-0 relative shrink-0 text-left text-nowrap"
      data-name="ELEMENT 38"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-[#42be65] text-[17px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">
          2.5M OMR
        </p>
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] text-nowrap whitespace-pre">
          100% of target
        </p>
      </div>
    </div>
  );
}

function Element70() {
  return (
    <div
      className="min-w-[335px] relative rounded-xl shrink-0 w-full"
      data-name="ELEMENT 27"
    >
      <div className="[flex-flow:wrap] box-border content-center flex gap-0 items-center justify-start min-w-inherit overflow-clip pb-3 pt-4 px-0 relative w-full">
        <Element68 />
        <Element69 />
      </div>
      <div className="absolute border-[0px_0px_1px] border-slate-200 border-solid inset-0 pointer-events-none rounded-xl" />
    </div>
  );
}

function Element71() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 46"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000b25] text-[17px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Fixed</p>
      </div>
    </div>
  );
}

function Element72() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 44"
    >
      <Element71 />
    </div>
  );
}

function Element73() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-end justify-center leading-[0] overflow-clip p-0 relative shrink-0 text-left text-nowrap"
      data-name="ELEMENT 38"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-[#42be65] text-[17px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">
          2.3M OMR
        </p>
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] text-nowrap whitespace-pre">
          94% of target
        </p>
      </div>
    </div>
  );
}

function Element74() {
  return (
    <div
      className="min-w-[335px] relative rounded-xl shrink-0 w-full"
      data-name="ELEMENT 42"
    >
      <div className="[flex-flow:wrap] box-border content-center flex gap-0 items-center justify-start min-w-inherit overflow-clip px-0 py-3 relative w-full">
        <Element72 />
        <Element73 />
      </div>
      <div className="absolute border-[0px_0px_1px] border-slate-200 border-solid inset-0 pointer-events-none rounded-xl" />
    </div>
  );
}

function Element75() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 61"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000b25] text-[17px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">SMS</p>
      </div>
    </div>
  );
}

function Element76() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 59"
    >
      <Element75 />
    </div>
  );
}

function Element77() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-end justify-center leading-[0] overflow-clip p-0 relative shrink-0 text-left text-nowrap"
      data-name="ELEMENT 38"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-[17px] text-orange-500"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">
          195K OMR
        </p>
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] text-nowrap whitespace-pre">
          77% of target
        </p>
      </div>
    </div>
  );
}

function Element78() {
  return (
    <div
      className="min-w-[335px] relative rounded-xl shrink-0 w-full"
      data-name="ELEMENT 57"
    >
      <div className="[flex-flow:wrap] box-border content-center flex gap-0 items-center justify-start min-w-inherit overflow-clip px-0 py-3 relative w-full">
        <Element76 />
        <Element77 />
      </div>
      <div className="absolute border-[0px_0px_1px] border-slate-200 border-solid inset-0 pointer-events-none rounded-xl" />
    </div>
  );
}

function Element79() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 61"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000b25] text-[17px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Device</p>
      </div>
    </div>
  );
}

function Element80() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 59"
    >
      <Element79 />
    </div>
  );
}

function Element81() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-end justify-center leading-[0] overflow-clip p-0 relative shrink-0 text-left text-nowrap"
      data-name="ELEMENT 38"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-[#42be65] text-[17px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">
          2.5M OMR
        </p>
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] text-nowrap whitespace-pre">
          102% of target
        </p>
      </div>
    </div>
  );
}

function Element82() {
  return (
    <div
      className="min-w-[335px] relative rounded-xl shrink-0 w-full"
      data-name="ELEMENT 58"
    >
      <div className="[flex-flow:wrap] box-border content-center flex gap-0 items-center justify-start min-w-inherit overflow-clip px-0 py-3 relative w-full">
        <Element80 />
        <Element81 />
      </div>
      <div className="absolute border-[0px_0px_1px] border-slate-200 border-solid inset-0 pointer-events-none rounded-xl" />
    </div>
  );
}

function Element83() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 61"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000b25] text-[17px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">ICT</p>
      </div>
    </div>
  );
}

function Element84() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 59"
    >
      <Element83 />
    </div>
  );
}

function Element85() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-end justify-center leading-[0] overflow-clip p-0 relative shrink-0 text-left text-nowrap"
      data-name="ELEMENT 38"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-[#42be65] text-[17px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] text-nowrap whitespace-pre">
          2.3M OMR
        </p>
      </div>
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] text-[rgba(0,11,37,0.64)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] text-nowrap whitespace-pre">
          92% of target
        </p>
      </div>
    </div>
  );
}

function Element86() {
  return (
    <div
      className="[flex-flow:wrap] box-border content-center flex gap-0 items-center justify-start min-w-[335px] overflow-clip pb-4 pt-3 px-0 relative rounded-xl shrink-0 w-full"
      data-name="ELEMENT 59"
    >
      <Element84 />
      <Element85 />
    </div>
  );
}

function Element87() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start min-w-[335px] overflow-clip p-0 relative rounded-lg shrink-0 w-full"
      data-name="ELEMENT 25"
    >
      <Element70 />
      <Element74 />
      <Element78 />
      <Element82 />
      <Element86 />
    </div>
  );
}

function Element88() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="ELEMENT 61"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000b25] text-[22px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Total Revenue</p>
      </div>
    </div>
  );
}

function Element89() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 59"
    >
      <Element88 />
    </div>
  );
}

function Element90() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 17"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#34944f] text-[22px] text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">2.5M OMR</p>
      </div>
    </div>
  );
}

function Element91() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-end justify-center overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 15"
    >
      <Element90 />
    </div>
  );
}

function Element92() {
  return (
    <div
      className="[flex-flow:wrap] box-border content-center flex gap-0 items-center justify-start min-w-[335px] overflow-clip p-0 relative rounded-xl shrink-0 w-full"
      data-name="ELEMENT 58"
    >
      <Element89 />
      <Element91 />
    </div>
  );
}

function Frame1000004667() {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full">
      <Element92 />
    </div>
  );
}

function Frame1000004668() {
  return (
    <div className="basis-0 bg-slate-50 grow min-h-px min-w-px relative rounded shrink-0 w-full">
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="flex flex-col justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-start justify-center p-[12px] relative size-full">
          <Frame1000004667 />
        </div>
      </div>
    </div>
  );
}

function Element6() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow h-[681px] min-h-px min-w-px relative rounded-2xl shrink-0"
      data-name="ELEMENT 6"
    >
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-4 h-[681px] items-start justify-start p-[24px] relative w-full">
          <ProgressBarContainer15 />
          <Element87 />
          <Frame1000004668 />
        </div>
      </div>
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-2xl" />
    </div>
  );
}

function Frame1000004599() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative shrink-0 w-full">
      <SectionRevenueByService />
      <Element6 />
    </div>
  );
}

function Image19() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-9 items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Image9"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0066ff] text-[24px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Element93() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 11"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000000] text-[22px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Performance Trends - Q3</p>
      </div>
    </div>
  );
}

function Element94() {
  return (
    <div
      className="[flex-flow:wrap] basis-0 box-border content-center flex gap-3 grow items-center justify-start min-h-px min-w-[335px] overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 7"
    >
      <Image19 />
      <Element93 />
    </div>
  );
}

function Frame34() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Element94 />
    </div>
  );
}

function ProgressBarContent17() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Progress Bar Content"
    >
      <Frame34 />
    </div>
  );
}

function ProgressBarContainer16() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-end justify-start p-0 relative shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <ProgressBarContent17 />
    </div>
  );
}

function Target() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0"
      data-name="Target"
    >
      <div className="bg-[#2d6ef0] h-[9px] rounded shrink-0 w-[31px]" />
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[12px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre" dir="auto">
          Achievement
        </p>
      </div>
    </div>
  );
}

function Target1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0"
      data-name="Target"
    >
      <div className="bg-[#16a249] h-[9px] rounded shrink-0 w-[31px]" />
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[12px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">Target</p>
      </div>
    </div>
  );
}

function Legonds() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="legonds"
    >
      <Target />
      <Target1 />
    </div>
  );
}

function ChartActions() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0"
      data-name="Chart actions"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000b25] text-[10px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">100%</p>
      </div>
    </div>
  );
}

function ChartActions1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0"
      data-name="Chart actions"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000b25] text-[10px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">80%</p>
      </div>
    </div>
  );
}

function ChartActions2() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0"
      data-name="Chart actions"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000b25] text-[10px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">60%</p>
      </div>
    </div>
  );
}

function ChartActions3() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0"
      data-name="Chart actions"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000b25] text-[10px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">40%</p>
      </div>
    </div>
  );
}

function ChartActions4() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0"
      data-name="Chart actions"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000b25] text-[10px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">30%</p>
      </div>
    </div>
  );
}

function ChartActions5() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0"
      data-name="Chart actions"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000b25] text-[10px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">20%</p>
      </div>
    </div>
  );
}

function ChartActions6() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0"
      data-name="Chart actions"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000b25] text-[10px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">10%</p>
      </div>
    </div>
  );
}

function ChartActions7() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0"
      data-name="Chart actions"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000b25] text-[10px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">0%</p>
      </div>
    </div>
  );
}

function LeftYAxis() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-between pb-4 pt-0 px-0 relative self-stretch shrink-0"
      data-name="Left Y Axis"
    >
      <ChartActions />
      <ChartActions1 />
      <ChartActions2 />
      <ChartActions3 />
      <ChartActions4 />
      <ChartActions5 />
      <ChartActions6 />
      <ChartActions7 />
    </div>
  );
}

function HorizontalLines() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-between min-h-px min-w-px p-0 relative shrink-0 w-full"
      data-name="horizontal lines"
    >
      <div className="bg-slate-200 h-px shrink-0 w-full" data-name="Line" />
      <div className="bg-slate-200 h-px shrink-0 w-full" data-name="Line" />
      <div className="bg-slate-200 h-px shrink-0 w-full" data-name="Line" />
      <div className="bg-slate-200 h-px shrink-0 w-full" data-name="Line" />
      <div className="bg-slate-200 h-px shrink-0 w-full" data-name="Line" />
      <div className="bg-slate-200 h-px shrink-0 w-full" data-name="Line" />
      <div className="bg-slate-200 h-px shrink-0 w-full" data-name="Line" />
      <div className="bg-slate-200 h-px shrink-0 w-full" data-name="Line" />
    </div>
  );
}

function Group() {
  return (
    <div
      className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-29px] mask-size-[950px_172.721px]"
      data-name="Group"
      style={{ maskImage: `url('${imgGroup}')` }}
    >
      <div className="absolute bottom-0 left-0 right-0 top-[-0.538%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 951 144"
        >
          <g id="Group">
            <path
              d={svgPaths.p1a522700}
              fill="var(--fill-0, #2A9D90)"
              fillOpacity="0.2"
              id="Vector"
            />
            <path
              d={svgPaths.pfd8550f}
              id="Vector_2"
              stroke="var(--stroke-0, #16A249)"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div
      className="absolute bottom-[0.892%] contents left-0 right-[-0.067%] top-[44.231%]"
      data-name="Group"
    >
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div
      className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[3.215px_-48px] mask-size-[950px_172.721px]"
      data-name="Group"
      style={{ maskImage: `url('${imgGroup}')` }}
    >
      <div className="absolute bottom-0 left-0 right-0 top-[-0.644%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 954 126"
        >
          <g id="Group">
            <path
              d={svgPaths.p30b05a40}
              fill="var(--fill-0, #2D6EF0)"
              fillOpacity="0.15"
              id="Vector"
            />
            <g id="Vector_2">
              <path
                d={svgPaths.p19563e00}
                fill="var(--fill-0, #2D6EF0)"
                fillOpacity="0.2"
              />
              <path
                d={svgPaths.p19563e00}
                stroke="var(--stroke-0, #2D6EF0)"
                strokeWidth="2"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div
      className="absolute bottom-[0.385%] contents left-[-0.338%] right-0 top-[51.538%]"
      data-name="Group"
    >
      <Group2 />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div
      className="absolute bottom-[0.492%] contents left-0 right-0 top-[33.077%]"
      data-name="Clip path group"
    >
      <Group1 />
      <Group3 />
    </div>
  );
}

function ChartData() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2.5 grow h-full items-end justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Chart data"
    >
      <HorizontalLines />
      <ClipPathGroup />
    </div>
  );
}

function ChartVisualization() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow h-full items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Chart visualization"
    >
      <div className="bg-slate-200 h-full shrink-0 w-px" data-name="Line" />
      <ChartData />
      <div className="absolute flex h-[140px] items-center justify-center left-0 top-[5px] w-[0px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[140px]">
            <div
              className="absolute bottom-0 left-0 right-0 top-[-1px]"
              style={
                {
                  "--stroke-0": "rgba(226, 232, 240, 1)",
                } as React.CSSProperties
              }
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                role="presentation"
                viewBox="0 0 140 1"
              >
                <line
                  id="Line 3"
                  stroke="var(--stroke-0, #E2E8F0)"
                  x2="140"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartVisualization1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0 w-full"
      data-name="Chart visualization"
    >
      <ChartVisualization />
      <div className="absolute left-[-1px] size-[5px] top-[132px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 5 5"
        >
          <circle
            cx="2.5"
            cy="2.5"
            id="Ellipse 12"
            r="2"
            stroke="var(--stroke-0, #2D6EF0)"
          />
        </svg>
      </div>
      <div className="absolute left-[-1px] size-[5px] top-[113px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 5 5"
        >
          <circle
            cx="2.5"
            cy="2.5"
            id="Ellipse 19"
            r="2"
            stroke="var(--stroke-0, #16A249)"
          />
        </svg>
      </div>
      <div className="absolute left-[333px] size-[5px] top-[113px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 5 5"
        >
          <circle
            cx="2.5"
            cy="2.5"
            id="Ellipse 19"
            r="2"
            stroke="var(--stroke-0, #16A249)"
          />
        </svg>
      </div>
      <div className="absolute left-[938px] size-[5px] top-[113px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 5 5"
        >
          <circle
            cx="2.5"
            cy="2.5"
            id="Ellipse 19"
            r="2"
            stroke="var(--stroke-0, #16A249)"
          />
        </svg>
      </div>
      <div className="absolute left-[333px] size-[5px] top-[132px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 5 5"
        >
          <circle
            cx="2.5"
            cy="2.5"
            id="Ellipse 12"
            r="2"
            stroke="var(--stroke-0, #2D6EF0)"
          />
        </svg>
      </div>
      <div className="absolute left-[938px] size-[5px] top-[132px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 5 5"
        >
          <circle
            cx="2.5"
            cy="2.5"
            id="Ellipse 12"
            r="2"
            stroke="var(--stroke-0, #2D6EF0)"
          />
        </svg>
      </div>
      <div className="absolute left-[596px] size-[5px] top-[133px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 5 5"
        >
          <circle
            cx="2.5"
            cy="2.5"
            id="Ellipse 12"
            r="2"
            stroke="var(--stroke-0, #2D6EF0)"
          />
        </svg>
      </div>
    </div>
  );
}

function ChartActions8() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0"
      data-name="Chart actions"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000b25] text-[12px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">Week 1</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-0.5 items-center justify-start p-0 relative shrink-0"
      data-name="Text"
    >
      <ChartActions8 />
    </div>
  );
}

function ChartActions9() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0"
      data-name="Chart actions"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000b25] text-[12px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">Week 2</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-0.5 grow items-end justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Text"
    >
      <ChartActions9 />
    </div>
  );
}

function ChartActions10() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0"
      data-name="Chart actions"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000b25] text-[12px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">Week 3</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-0.5 grow items-end justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Text"
    >
      <ChartActions10 />
    </div>
  );
}

function ChartActions11() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0"
      data-name="Chart actions"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000b25] text-[12px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">Week 4</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-0.5 grow items-end justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Text"
    >
      <ChartActions11 />
    </div>
  );
}

function X() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="X"
    >
      <Text5 />
      <Text6 />
      <Text7 />
      <Text8 />
    </div>
  );
}

function Content() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow h-[282px] items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="content"
    >
      <ChartVisualization1 />
      <X />
    </div>
  );
}

function ChartElements() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Chart elements"
    >
      <LeftYAxis />
      <Content />
    </div>
  );
}

function Frame1000004505() {
  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
      <Legonds />
      <ChartElements />
    </div>
  );
}

function SectionRevenueByService1() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-2xl shrink-0"
      data-name="Section - Revenue By Service"
    >
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-2xl" />
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-6 items-center justify-center p-[16px] relative w-full">
          <ProgressBarContainer16 />
          <Frame1000004505 />
          <div className="absolute left-[645px] size-[5px] top-[219px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 5 5"
            >
              <circle
                cx="2.5"
                cy="2.5"
                id="Ellipse 19"
                r="2"
                stroke="var(--stroke-0, #16A249)"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1000004588() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row gap-6 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <SectionRevenueByService1 />
    </div>
  );
}

function Image20() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-9 items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Image9"
    >
      <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0066ff] text-[24px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Element95() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 11"
    >
      <div
        className="basis-0 font-['Roboto:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#000000] text-[22px] text-left"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Score Distribution</p>
      </div>
    </div>
  );
}

function Element96() {
  return (
    <div
      className="[flex-flow:wrap] basis-0 box-border content-center flex gap-3 grow items-center justify-start min-h-px min-w-[335px] overflow-clip p-0 relative shrink-0"
      data-name="ELEMENT 7"
    >
      <Image20 />
      <Element95 />
    </div>
  );
}

function Frame35() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Element96 />
    </div>
  );
}

function ProgressBarContent18() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Progress Bar Content"
    >
      <Frame35 />
    </div>
  );
}

function ProgressBarContainer17() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-end justify-start p-0 relative shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <ProgressBarContent18 />
    </div>
  );
}

function Component10() {
  return (
    <div
      className="absolute bottom-[-1.341px] left-[-1.34px] right-[-1.34px] top-[-1.339px]"
      data-name="10"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 212 212"
      >
        <g id="10"></g>
      </svg>
    </div>
  );
}

function Component09() {
  return (
    <div
      className="absolute bottom-[-1.341px] left-[-1.34px] right-[-1.34px] top-[-1.339px]"
      data-name="09"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 212 212"
      >
        <g id="09"></g>
      </svg>
    </div>
  );
}

function Component08() {
  return (
    <div
      className="absolute bottom-[-1.34px] left-[-1.34px] right-[-1.34px] top-[-1.339px]"
      data-name="08"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 212 212"
      >
        <g id="08"></g>
      </svg>
    </div>
  );
}

function Component07() {
  return (
    <div
      className="absolute bottom-[-1.341px] left-[-1.34px] right-[-1.34px] top-[-1.339px]"
      data-name="07"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 212 212"
      >
        <g id="07"></g>
      </svg>
    </div>
  );
}

function Component06() {
  return (
    <div
      className="absolute bottom-[-1.341px] left-[-1.34px] right-[-1.34px] top-[-1.339px]"
      data-name="06"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 212 212"
      >
        <g id="06"></g>
      </svg>
    </div>
  );
}

function Component05() {
  return (
    <div
      className="absolute bottom-[-1.301px] left-[-1.713px] right-[-0.967px] top-[-1.379px]"
      data-name="05"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 212 212"
      >
        <g id="05"></g>
      </svg>
    </div>
  );
}

function Component04() {
  return (
    <div
      className="absolute bottom-[-1.341px] left-[-1.34px] right-[-1.34px] top-[-1.339px]"
      data-name="04"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 212 212"
      >
        <g id="04"></g>
      </svg>
    </div>
  );
}

function Component03() {
  return (
    <div
      className="absolute bottom-[-1.341px] left-[-1.34px] right-[-1.34px] top-[-1.339px]"
      data-name="03"
    >
      <div className="absolute bottom-[-0.782%] left-0 right-[-0.782%] top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 214 214"
        >
          <g id="03">
            <path
              d={svgPaths.pb8d4f00}
              fill="var(--fill-0, #16A249)"
              id="å½¢æ"
              stroke="var(--stroke-0, #FDFDFD)"
              strokeWidth="1.33977"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Component02() {
  return (
    <div
      className="absolute bottom-[-1.341px] left-[-1.34px] right-[-1.34px] top-[-1.339px]"
      data-name="02"
    >
      <div className="absolute bottom-[-0.782%] left-[-0.633%] right-0 top-[-0.633%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 214 216"
        >
          <g id="02">
            <path
              d={svgPaths.p385c1180}
              fill="var(--fill-0, #2D6EF0)"
              id="å½¢æ"
              stroke="var(--stroke-0, #FDFDFD)"
              strokeWidth="1.33977"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Component01() {
  return (
    <div
      className="absolute bottom-[-1.34px] left-[-1.341px] right-[-1.339px] top-[-1.34px]"
      data-name="01"
    >
      <div className="absolute bottom-0 left-0 right-0 top-[-0.633%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 212 214"
        >
          <g id="01">
            <path
              d={svgPaths.p7d89630}
              fill="var(--fill-0, #AF57DB)"
              id="å½¢æ"
              stroke="var(--stroke-0, #FDFDFD)"
              strokeWidth="1.33977"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div
      className="absolute bottom-0 left-[-0.001px] right-[0.001px] top-0"
      data-name="形状"
    >
      <Component10 />
      <Component09 />
      <Component08 />
      <Component07 />
      <Component06 />
      <Component05 />
      <Component04 />
      <Component03 />
      <Component02 />
      <Component01 />
    </div>
  );
}

function Component2() {
  return (
    <div
      className="absolute bottom-[14.744%] left-[14.743%] right-[14.744%] top-[14.744%]"
      data-name="遮挡"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 148 148"
      >
        <g id="é®æ¡"></g>
      </svg>
    </div>
  );
}

function Component3() {
  return (
    <div
      className="absolute bottom-[-1.04%] left-[0.001%] right-[3.175%] top-[3.829%]"
      data-name="02-饼环图"
    >
      <Component1 />
      <Component2 />
    </div>
  );
}

function Svg() {
  return (
    <div className="h-[215px] relative shrink-0 w-[215.86px]" data-name="SVG">
      <Component3 />
    </div>
  );
}

function CardBody() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2.5 grow items-center justify-center min-h-px min-w-px overflow-clip p-0 relative shrink-0 w-full"
      data-name="card-body"
    >
      <Svg />
    </div>
  );
}

function Frame5() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row gap-2.5 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="bg-[#2d6ef0] h-[9px] rounded shrink-0 w-[31px]" />
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#000000] text-[15px] text-left text-nowrap tracking-[0.5px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[23px] whitespace-pre">
          Revenue(50%)
        </p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row gap-2.5 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="bg-[#16a249] h-[9px] rounded shrink-0 w-[31px]" />
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#000000] text-[15px] text-left text-nowrap tracking-[0.5px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[23px] whitespace-pre">
          Strategie (30%)
        </p>
      </div>
    </div>
  );
}

function Frame1000004587() {
  return (
    <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative shrink-0 w-full">
      <div className="bg-[#af57db] h-[9px] rounded shrink-0 w-[31px]" />
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#000000] text-[15px] text-left text-nowrap tracking-[0.5px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[23px] whitespace-pre">
          CX (20%)
        </p>
      </div>
    </div>
  );
}

function ChartLeyend() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 h-[58px] items-start justify-start overflow-clip p-0 relative shrink-0 w-full"
      data-name="chart-leyend"
    >
      <Frame1000004587 />
      <Frame7 />
    </div>
  );
}

function Frame1000004586() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px p-0 relative shrink-0 w-full">
      <CardBody />
      <ChartLeyend />
    </div>
  );
}

function Card() {
  return (
    <div
      className="bg-[#ffffff] h-[404px] relative rounded-lg shrink-0 w-[360px]"
      data-name="card"
    >
      <div className="box-border content-stretch flex flex-col h-[404px] items-start justify-start overflow-clip p-[24px] relative w-[360px]">
        <ProgressBarContainer17 />
        <Frame1000004586 />
      </div>
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-lg" />
    </div>
  );
}

function Frame1000004585() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame1000004588 />
      <Card />
    </div>
  );
}

function ContentSection() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Content-section"
    >
      <Frame1000004564 />
      <Frame1000004639 />
      <Frame1000004600 />
      <Frame1000004599 />
      <Frame1000004585 />
    </div>
  );
}

function Content1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-[24px] relative w-full">
          <ContentSection />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <TopBar1 />
      <Content1 />
    </div>
  );
}

export default function Screen() {
  return (
    <div
      className="bg-[#f2f5f8] box-border content-stretch flex flex-row items-start justify-start p-0 relative size-full"
      data-name="Screen"
    >
      <Container4 />
    </div>
  );
}