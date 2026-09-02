function Title() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[17px] text-[rgba(0,11,37,0.64)] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">{`Overall Achievement `}</p>
      </div>
    </div>
  );
}

function Textfield() {
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

function Header() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <Title />
      <Textfield />
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

function Footer() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] p-0 relative shrink-0 text-[16px] text-left w-full"
      data-name="Footer"
    >
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

function Container() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <div
        className="bg-clip-text bg-gradient-to-t font-['Roboto:Bold',_sans-serif] font-bold from-[#274afa] leading-[0] relative shrink-0 text-[32px] text-left text-nowrap to-[#4a43fbcc]"
        style={{
          WebkitTextFillColor: "transparent",
          fontVariationSettings: "'wdth' 100",
        }}
      >
        <p className="block leading-[1.2] whitespace-pre">88.2%</p>
      </div>
      <Footer />
    </div>
  );
}

function Container1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-3 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <RevenueIcon />
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container1 />
    </div>
  );
}

function Container3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container2 />
    </div>
  );
}

function Container4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Container3 />
    </div>
  );
}

function Content() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Content"
    >
      <Container4 />
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

function Container5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-start leading-[0] p-0 relative shrink-0 text-nowrap"
      data-name="Container"
    >
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

function Label() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0"
      data-name="Label"
    >
      <div
        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-blue-500 text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">Master Score</p>
      </div>
    </div>
  );
}

function Footer1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Footer"
    >
      <div className="flex flex-row items-center self-stretch">
        <Container5 />
      </div>
      <Label />
    </div>
  );
}

function Container6() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Footer1 />
    </div>
  );
}

function Container7() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Header />
      <Content />
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
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow h-full items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Container7 />
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
            <Container8 />
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

function Title1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
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

function Textfield1() {
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

function Header1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <Title1 />
      <Textfield1 />
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

function Footer2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] p-0 relative shrink-0 text-[16px] text-left w-full"
      data-name="Footer"
    >
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

function Container9() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <div
        className="bg-clip-text bg-gradient-to-t font-['Roboto:Bold',_sans-serif] font-bold from-[#274afa] leading-[0] relative shrink-0 text-[32px] text-left text-nowrap to-[#4a43fbcc]"
        style={{
          WebkitTextFillColor: "transparent",
          fontVariationSettings: "'wdth' 100",
        }}
      >
        <p className="block leading-[1.2] whitespace-pre">$2.45M</p>
      </div>
      <Footer2 />
    </div>
  );
}

function Container10() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-3 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <RevenueIcon2 />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container10 />
    </div>
  );
}

function Container12() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Container12 />
    </div>
  );
}

function Content1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Content"
    >
      <Container13 />
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

function Container14() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-start p-0 relative shrink-0"
      data-name="Container"
    >
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

function Label1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start leading-[0] p-0 relative shrink-0 text-left text-nowrap"
      data-name="Label"
    >
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

function Footer3() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Footer"
    >
      <div className="flex flex-row items-center self-stretch">
        <Container14 />
      </div>
      <Label1 />
    </div>
  );
}

function Container15() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Footer3 />
    </div>
  );
}

function Container16() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Header1 />
      <Content1 />
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
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow h-full items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Container16 />
    </div>
  );
}

function Textfield2() {
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
            <Container17 />
          </div>
          <Textfield2 />
        </div>
      </div>
    </div>
  );
}

function Title2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
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

function Textfield3() {
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

function Header2() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <Title2 />
      <Textfield3 />
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

function Footer4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] p-0 relative shrink-0 text-[16px] text-left w-full"
      data-name="Footer"
    >
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

function Container18() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <div
        className="bg-clip-text bg-gradient-to-t font-['Roboto:Bold',_sans-serif] font-bold from-[#274afa] leading-[0] relative shrink-0 text-[32px] text-left text-nowrap to-[#4a43fbcc]"
        style={{
          WebkitTextFillColor: "transparent",
          fontVariationSettings: "'wdth' 100",
        }}
      >
        <p className="block leading-[1.2] whitespace-pre">75%</p>
      </div>
      <Footer4 />
    </div>
  );
}

function Container19() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-3 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <RevenueIcon4 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Container21 />
    </div>
  );
}

function Content2() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Content"
    >
      <Container22 />
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

function Container23() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-start p-0 relative shrink-0"
      data-name="Container"
    >
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

function Label2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start leading-[0] p-0 relative shrink-0 text-left text-nowrap"
      data-name="Label"
    >
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

function Footer5() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Footer"
    >
      <div className="flex flex-row items-center self-stretch">
        <Container23 />
      </div>
      <Label2 />
    </div>
  );
}

function Container24() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Footer5 />
    </div>
  );
}

function Container25() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Header2 />
      <Content2 />
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
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow h-full items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Container25 />
    </div>
  );
}

function Textfield4() {
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
            <Container26 />
          </div>
          <Textfield4 />
        </div>
      </div>
    </div>
  );
}

function Title3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
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

function Textfield5() {
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

function Header3() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <Title3 />
      <Textfield5 />
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

function Footer6() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] p-0 relative shrink-0 text-[16px] text-left w-full"
      data-name="Footer"
    >
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

function Container27() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <div
        className="bg-clip-text bg-gradient-to-t font-['Roboto:Bold',_sans-serif] font-bold from-[#274afa] leading-[0] relative shrink-0 text-[32px] text-left text-nowrap to-[#4a43fbcc]"
        style={{
          WebkitTextFillColor: "transparent",
          fontVariationSettings: "'wdth' 100",
        }}
      >
        <p className="block leading-[1.2] whitespace-pre">85%</p>
      </div>
      <Footer6 />
    </div>
  );
}

function Container28() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-3 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <RevenueIcon6 />
      <Container27 />
    </div>
  );
}

function Container29() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container28 />
    </div>
  );
}

function Container30() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Container30 />
    </div>
  );
}

function Content3() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Content"
    >
      <Container31 />
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

function Container32() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-start leading-[0] p-0 relative shrink-0 text-nowrap"
      data-name="Container"
    >
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

function Label3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start leading-[0] p-0 relative shrink-0 text-left text-nowrap"
      data-name="Label"
    >
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

function Footer7() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Footer"
    >
      <div className="flex flex-row items-center self-stretch">
        <Container32 />
      </div>
      <Label3 />
    </div>
  );
}

function Container33() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Footer7 />
    </div>
  );
}

function Container34() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Header3 />
      <Content3 />
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
      <Container33 />
    </div>
  );
}

function Container35() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow h-full items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Container34 />
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
            <Container35 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Card() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative size-full"
      data-name="Card"
    >
      <TotalRevenueCard />
      <TotalRevenueCard1 />
      <TotalRevenueCard2 />
      <TotalRevenueCard3 />
    </div>
  );
}