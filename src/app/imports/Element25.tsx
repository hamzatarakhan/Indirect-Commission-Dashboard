function Image9() {
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

function Element11() {
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

function RevenueIcon() {
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

function AverageCsatScoreContainer() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 h-full items-center justify-start p-0 relative shrink-0"
      data-name="Average CSAT Score Container"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#000b25] text-[19px] text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">4.3/5</p>
      </div>
      <RevenueIcon />
    </div>
  );
}

function Frame() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Element7 />
      <div className="flex flex-row items-center self-stretch">
        <AverageCsatScoreContainer />
      </div>
    </div>
  );
}

function Frame1() {
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

function Frame2() {
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
      <Frame1 />
    </div>
  );
}

function AverageCsatScoreBarContainer() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Average CSAT Score Bar Container"
    >
      <Frame2 />
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left w-[91px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Target: 5</p>
      </div>
    </div>
  );
}

function ProgressBarContent() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Progress Bar Content"
    >
      <Frame />
      <AverageCsatScoreBarContainer />
    </div>
  );
}

function ProgressBarContainer() {
  return (
    <div
      className="bg-slate-50 relative rounded-lg shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-end relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 items-end justify-start p-[16px] relative w-full">
          <ProgressBarContent />
        </div>
      </div>
    </div>
  );
}

function Image10() {
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

function Element12() {
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

function Element8() {
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

function RevenueIcon1() {
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

function NetPromoterScoreContainer() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 h-full items-center justify-start p-0 relative shrink-0"
      data-name="Net Promoter Score Container"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#000b25] text-[19px] text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">45</p>
      </div>
      <RevenueIcon1 />
    </div>
  );
}

function Frame3() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Element8 />
      <div className="flex flex-row items-center self-stretch">
        <NetPromoterScoreContainer />
      </div>
    </div>
  );
}

function Frame4() {
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

function Frame5() {
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
      <Frame4 />
    </div>
  );
}

function NetPromoterScoreBarContainer() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Net Promoter Score Bar Container"
    >
      <Frame5 />
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left w-[91px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">{` Target: 50`}</p>
      </div>
    </div>
  );
}

function ProgressBarContent1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Progress Bar Content"
    >
      <Frame3 />
      <NetPromoterScoreBarContainer />
    </div>
  );
}

function ProgressBarContainer1() {
  return (
    <div
      className="bg-slate-50 relative rounded-lg shrink-0 w-full"
      data-name="Progress Bar Container"
    >
      <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-end relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 items-end justify-start p-[16px] relative w-full">
          <ProgressBarContent1 />
        </div>
      </div>
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
        <p className="block leading-[normal] whitespace-pre"></p>
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
        <p className="block leading-[1.2]">High-Frequency Score</p>
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
      <Image11 />
      <Element13 />
    </div>
  );
}

function RevenueIcon2() {
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

function HighFrequencyScoreContainer() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 h-full items-center justify-start p-0 relative shrink-0"
      data-name="High-Frequency Score Container"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#000b25] text-[19px] text-nowrap text-right"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2] whitespace-pre">96.88%</p>
      </div>
      <RevenueIcon2 />
    </div>
  );
}

function Frame6() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Element9 />
      <div className="flex flex-row items-center self-stretch">
        <HighFrequencyScoreContainer />
      </div>
    </div>
  );
}

function Frame7() {
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

function Frame8() {
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
      <Frame7 />
    </div>
  );
}

function HighFrequencyScoreBarContainer() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="High-Frequency Score Bar Container"
    >
      <Frame8 />
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left w-[91px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">Target: 95%</p>
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
      <Frame6 />
      <HighFrequencyScoreBarContainer />
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
        <p className="block leading-[normal] whitespace-pre">star</p>
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
        <p className="block leading-[1.2]">Positive vs Critical Feedback</p>
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
      <Image12 />
      <Element14 />
    </div>
  );
}

function RevenueIcon3() {
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

function PositiveVsCriticalFeedbackContainer() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-start p-0 relative shrink-0"
      data-name="Positive vs Critical Feedback Container"
    >
      <RevenueIcon3 />
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

function Frame9() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="FRAME"
    >
      <Element10 />
      <div className="flex flex-row items-center self-stretch">
        <PositiveVsCriticalFeedbackContainer />
      </div>
    </div>
  );
}

function Frame10() {
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

function Frame11() {
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
      <Frame10 />
    </div>
  );
}

function PositiveVsCriticalFeedbackBarContainer() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Positive vs Critical Feedback Bar Container"
    >
      <Frame11 />
      <div
        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(0,11,37,0.64)] text-left w-[91px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[1.2]">59</p>
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
      <Frame9 />
      <PositiveVsCriticalFeedbackBarContainer />
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

export default function Element25() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative size-full"
      data-name="ELEMENT 25"
    >
      <ProgressBarContainer />
      <ProgressBarContainer1 />
      <ProgressBarContainer2 />
      <ProgressBarContainer3 />
    </div>
  );
}