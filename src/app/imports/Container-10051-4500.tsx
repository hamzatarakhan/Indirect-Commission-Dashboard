import svgPaths from "./svg-k8xsk09bgf";

function Heading1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[54.9px]" data-name="Heading 5">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.5px] relative w-[54.9px]">
        <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold leading-[19.5px] left-0 text-[#000b25] text-[13px] text-nowrap top-[-0.4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Quarter 1
        </p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Text">
      <p className="absolute font-['Roboto:Bold',sans-serif] font-bold leading-[15px] left-0 text-[#009b7b] text-[10px] top-[-2px] w-[28px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        88.4%
      </p>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#e0f7f4] h-[24.5px] relative rounded-[2.68435e+07px] shrink-0 w-[41.513px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[24.5px] items-start pb-0 pt-[8.15px] px-[7px] relative w-[41.513px]">
        <Text />
      </div>
    </div>
  );
}

function RevenueMatrix() {
  return (
    <div className="absolute box-border content-stretch flex h-[42px] items-center justify-between left-[0.8px] px-[14px] py-0 top-[0.8px] w-[268.9px]" data-name="RevenueMatrix">
      <Heading1 />
      <Container />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[14.39%_7.72%_0.7%_7.38%]" data-name="Group">
      <div className="absolute bottom-0 left-[-8.05%] right-[-8.05%] top-[-16.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 198 99">
          <g id="Group">
            <path d={svgPaths.p3dc41800} id="Vector" stroke="url(#paint0_linear_10051_4504)" strokeWidth="27.3381" />
            <path d={svgPaths.p33019860} id="Vector_2" stroke="url(#paint1_linear_10051_4504)" strokeWidth="27.3381" />
            <path d={svgPaths.p26cba680} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2.30216" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10051_4504" x1="98.5759" x2="98.5759" y1="13.6691" y2="98.5759">
              <stop stopColor="#FFD572" />
              <stop offset="1" stopColor="#FEBD38" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10051_4504" x1="86.104" x2="86.104" y1="13.6691" y2="98.5759">
              <stop stopColor="#FF9364" />
              <stop offset="1" stopColor="#F25F33" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[100px] relative shrink-0 w-[200px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[100px] overflow-clip relative rounded-[inherit] w-[200px]">
        <Group />
        <p className="absolute font-['Roboto:Bold',sans-serif] font-bold inset-[74.45%_32.32%_1.55%_32.68%] leading-[24px] text-[#000b25] text-[24px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          22.1M
        </p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex h-[100px] items-center justify-center left-0 top-0 w-[200px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Paragraph() {
  return <div className="absolute h-[24px] left-[65.36px] top-[50px] w-[69.287px]" data-name="Paragraph" />;
}

function Paragraph1() {
  return (
    <div className="absolute h-[18px] left-[12px] top-[103.5px] w-[17.325px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-[-8.25px] text-[#6a7282] text-[12px] text-nowrap top-[-0.05px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[18px] left-[172.75px] top-[103.45px] w-[24.138px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#6a7282] text-[12px] text-nowrap top-[-0.4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        25M
      </p>
    </div>
  );
}

function RevenueMatrix1() {
  return (
    <div className="absolute h-[100px] left-[35.25px] top-[56.8px] w-[200px]" data-name="RevenueMatrix">
      <Container1 />
      <Paragraph />
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[rgba(239,246,255,0.6)] h-[213.6px] left-0 rounded-[14px] top-0 w-[270.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(219,234,254,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <RevenueMatrix />
      <RevenueMatrix1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[54.9px]" data-name="Heading 5">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.5px] relative w-[54.9px]">
        <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold leading-[19.5px] left-0 text-[#000b25] text-[13px] text-nowrap top-[-0.4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Quarter 2
        </p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Text">
      <p className="absolute font-['Roboto:Bold',sans-serif] font-bold leading-[15px] left-0 text-[#009b7b] text-[10px] top-[-2px] w-[28px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        72.5%
      </p>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#e0f7f4] h-[24.5px] relative rounded-[2.68435e+07px] shrink-0 w-[41.513px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[24.5px] items-start pb-0 pt-[8.15px] px-[7px] relative w-[41.513px]">
        <Text1 />
      </div>
    </div>
  );
}

function RevenueMatrix2() {
  return (
    <div className="absolute box-border content-stretch flex h-[42px] items-center justify-between left-[0.8px] px-[14px] py-0 top-[0.8px] w-[268.9px]" data-name="RevenueMatrix">
      <Heading2 />
      <Container3 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[14.39%_7.72%_0.7%_7.38%]" data-name="Group">
      <div className="absolute bottom-0 left-[-8.05%] right-[-8.05%] top-[-16.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 198 99">
          <g id="Group">
            <path d={svgPaths.p3dc41800} id="Vector" stroke="url(#paint0_linear_10051_4504)" strokeWidth="27.3381" />
            <path d={svgPaths.p33019860} id="Vector_2" stroke="url(#paint1_linear_10051_4504)" strokeWidth="27.3381" />
            <path d={svgPaths.p26cba680} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2.30216" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10051_4504" x1="98.5759" x2="98.5759" y1="13.6691" y2="98.5759">
              <stop stopColor="#FFD572" />
              <stop offset="1" stopColor="#FEBD38" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10051_4504" x1="86.104" x2="86.104" y1="13.6691" y2="98.5759">
              <stop stopColor="#FF9364" />
              <stop offset="1" stopColor="#F25F33" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[100px] relative shrink-0 w-[200px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[100px] overflow-clip relative rounded-[inherit] w-[200px]">
        <Group1 />
        <p className="absolute font-['Roboto:Bold',sans-serif] font-bold inset-[75.45%_32.32%_0.55%_32.68%] leading-[24px] text-[#000b25] text-[24px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          20.3M
        </p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex h-[100px] items-center justify-center left-0 top-0 w-[200px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Paragraph3() {
  return <div className="absolute h-[24px] left-[65.36px] top-[50px] w-[69.287px]" data-name="Paragraph" />;
}

function Paragraph4() {
  return (
    <div className="absolute h-[18px] left-[12px] top-[103.5px] w-[17.325px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-[-8.75px] text-[#6a7282] text-[12px] text-nowrap top-[-0.4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[18px] left-[163.86px] top-[103.5px] w-[24.138px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-[8.39px] text-[#6a7282] text-[12px] text-nowrap top-[-0.4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        28M
      </p>
    </div>
  );
}

function RevenueMatrix3() {
  return (
    <div className="absolute h-[100px] left-[35.25px] top-[56.8px] w-[200px]" data-name="RevenueMatrix">
      <Container4 />
      <Paragraph3 />
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-[rgba(239,246,255,0.6)] h-[213.6px] left-[284.5px] rounded-[14px] top-0 w-[270.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(219,234,254,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <RevenueMatrix2 />
      <RevenueMatrix3 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[54.9px]" data-name="Heading 5">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.5px] relative w-[54.9px]">
        <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold leading-[19.5px] left-0 text-[#000b25] text-[13px] text-nowrap top-[-0.4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Quarter 3
        </p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Text">
      <p className="absolute font-['Roboto:Bold',sans-serif] font-bold leading-[15px] left-0 text-[#009b7b] text-[10px] top-[-2px] w-[28px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        96.5%
      </p>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#e0f7f4] h-[24.5px] relative rounded-[2.68435e+07px] shrink-0 w-[41.513px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[24.5px] items-start pb-0 pt-[8.15px] px-[7px] relative w-[41.513px]">
        <Text2 />
      </div>
    </div>
  );
}

function RevenueMatrix4() {
  return (
    <div className="absolute box-border content-stretch flex h-[42px] items-center justify-between left-[0.8px] px-[14px] py-0 top-[0.8px] w-[268.9px]" data-name="RevenueMatrix">
      <Heading3 />
      <Container6 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[14.39%_7.72%_0.7%_7.38%]" data-name="Group">
      <div className="absolute bottom-0 left-[-8.05%] right-[-8.05%] top-[-16.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 198 99">
          <g id="Group">
            <path d={svgPaths.p3dc41800} id="Vector" stroke="url(#paint0_linear_10051_4504)" strokeWidth="27.3381" />
            <path d={svgPaths.p33019860} id="Vector_2" stroke="url(#paint1_linear_10051_4504)" strokeWidth="27.3381" />
            <path d={svgPaths.p26cba680} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2.30216" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10051_4504" x1="98.5759" x2="98.5759" y1="13.6691" y2="98.5759">
              <stop stopColor="#FFD572" />
              <stop offset="1" stopColor="#FEBD38" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10051_4504" x1="86.104" x2="86.104" y1="13.6691" y2="98.5759">
              <stop stopColor="#FF9364" />
              <stop offset="1" stopColor="#F25F33" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[100px] relative shrink-0 w-[200px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[100px] overflow-clip relative rounded-[inherit] w-[200px]">
        <Group2 />
        <p className="absolute font-['Roboto:Bold',sans-serif] font-bold inset-[74.85%_32.32%_1.15%_32.68%] leading-[24px] text-[#000b25] text-[24px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          24.9M
        </p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex h-[100px] items-center justify-center left-0 top-0 w-[200px]" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Paragraph6() {
  return <div className="absolute h-[24px] left-[65.36px] top-[50px] w-[69.287px]" data-name="Paragraph" />;
}

function Paragraph7() {
  return (
    <div className="absolute h-[18px] left-[12px] top-[103.5px] w-[17.325px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-[-5.25px] text-[#6a7282] text-[12px] text-nowrap top-[-0.4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[18px] left-[153.7px] top-[103.5px] w-[34.3px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-[12.05px] text-[#6a7282] text-[12px] text-nowrap top-[-0.4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        25.8M
      </p>
    </div>
  );
}

function RevenueMatrix5() {
  return (
    <div className="absolute h-[100px] left-[35.25px] top-[56.8px] w-[200px]" data-name="RevenueMatrix">
      <Container7 />
      <Paragraph6 />
      <Paragraph7 />
      <Paragraph8 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-[rgba(239,246,255,0.6)] h-[213.6px] left-0 rounded-[14px] top-[227.6px] w-[270.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(219,234,254,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <RevenueMatrix4 />
      <RevenueMatrix5 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[54.9px]" data-name="Heading 5">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.5px] relative w-[54.9px]">
        <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold leading-[19.5px] left-0 text-[#000b25] text-[13px] text-nowrap top-[-0.4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Quarter 4
        </p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Text">
      <p className="absolute font-['Roboto:Bold',sans-serif] font-bold leading-[15px] left-0 text-[#009b7b] text-[10px] top-[-2px] w-[28px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        55.7%
      </p>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#e0f7f4] h-[24.5px] relative rounded-[2.68435e+07px] shrink-0 w-[41.513px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[24.5px] items-start pb-0 pt-[8.15px] px-[7px] relative w-[41.513px]">
        <Text3 />
      </div>
    </div>
  );
}

function RevenueMatrix6() {
  return (
    <div className="absolute box-border content-stretch flex h-[42px] items-center justify-between left-[0.8px] px-[14px] py-0 top-[0.8px] w-[268.9px]" data-name="RevenueMatrix">
      <Heading4 />
      <Container9 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[14.39%_7.72%_0.7%_7.38%]" data-name="Group">
      <div className="absolute bottom-0 left-[-8.05%] right-[-8.05%] top-[-16.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 198 99">
          <g id="Group">
            <path d={svgPaths.p3dc41800} id="Vector" stroke="url(#paint0_linear_10051_4504)" strokeWidth="27.3381" />
            <path d={svgPaths.p33019860} id="Vector_2" stroke="url(#paint1_linear_10051_4504)" strokeWidth="27.3381" />
            <path d={svgPaths.p26cba680} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2.30216" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10051_4504" x1="98.5759" x2="98.5759" y1="13.6691" y2="98.5759">
              <stop stopColor="#FFD572" />
              <stop offset="1" stopColor="#FEBD38" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10051_4504" x1="86.104" x2="86.104" y1="13.6691" y2="98.5759">
              <stop stopColor="#FF9364" />
              <stop offset="1" stopColor="#F25F33" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[100px] relative shrink-0 w-[200px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[100px] overflow-clip relative rounded-[inherit] w-[200px]">
        <Group3 />
        <p className="absolute font-['Roboto:Bold',sans-serif] font-bold inset-[75.85%_32.32%_0.15%_32.68%] leading-[24px] text-[#000b25] text-[24px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          16.7M
        </p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex h-[100px] items-center justify-center left-0 top-0 w-[200px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Paragraph9() {
  return <div className="absolute h-[24px] left-[65.36px] top-[50px] w-[69.287px]" data-name="Paragraph" />;
}

function Paragraph10() {
  return (
    <div className="absolute h-[18px] left-[12px] top-[103.5px] w-[17.325px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-[-5.75px] text-[#6a7282] text-[12px] text-nowrap top-[-0.4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[18px] left-[172.25px] top-[103.5px] w-[24.138px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#6a7282] text-[12px] text-nowrap top-[-0.4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        30M
      </p>
    </div>
  );
}

function RevenueMatrix7() {
  return (
    <div className="absolute h-[100px] left-[35.25px] top-[56.8px] w-[200px]" data-name="RevenueMatrix">
      <Container10 />
      <Paragraph9 />
      <Paragraph10 />
      <Paragraph11 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bg-[rgba(239,246,255,0.6)] h-[213.6px] left-[284.5px] rounded-[14px] top-[227.6px] w-[270.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(219,234,254,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <RevenueMatrix6 />
      <RevenueMatrix7 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[441.2px] left-[541px] top-0 w-[555px]" data-name="Container">
      <Container2 />
      <Container5 />
      <Container8 />
      <Container11 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[121.713px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.5px] relative w-[121.713px]">
        <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold leading-[22.5px] left-0 text-[#000b25] text-[15px] text-nowrap top-[-0.4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Year Performance
        </p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex h-[15.2px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[19.5px] relative shrink-0 text-[#009b7b] text-[13px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        89.4% Target
      </p>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#e0f7f4] h-[32.4px] relative rounded-[2.68435e+07px] shrink-0 w-[97.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[32.4px] items-start pb-0 pt-[9.25px] px-[10.5px] relative w-[97.2px]">
        <Text4 />
      </div>
    </div>
  );
}

function RevenueMatrix8() {
  return (
    <div className="absolute box-border content-stretch flex h-[56.9px] items-center justify-between left-[0.8px] px-[21px] py-0 top-[0.8px] w-[518.4px]" data-name="RevenueMatrix">
      <Heading />
      <Container13 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute bottom-0 left-[7.25%] right-[7.25%] top-[14.49%]" data-name="Group">
      <div className="absolute bottom-0 left-[-8.19%] right-[-8.19%] top-[-16.38%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 339 170">
          <g id="Group">
            <path d={svgPaths.p1dc8300} id="Vector" stroke="url(#paint0_linear_10051_4509)" strokeWidth="47.6329" />
            <path d={svgPaths.p20188700} id="Vector_2" stroke="url(#paint1_linear_10051_4509)" strokeWidth="47.6329" />
            <path d={svgPaths.p161880} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="4.10628" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10051_4509" x1="169.179" x2="169.179" y1="23.8164" y2="169.179">
              <stop stopColor="#FFD572" />
              <stop offset="1" stopColor="#FEBD38" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10051_4509" x1="147.826" x2="147.826" y1="23.8164" y2="169.179">
              <stop stopColor="#FF9364" />
              <stop offset="1" stopColor="#F25F33" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[170px] relative shrink-0 w-[340px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[170px] overflow-clip relative rounded-[inherit] w-[340px]">
        <Group4 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex h-[170px] items-center justify-center left-0 top-0 w-[340px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[40px] left-[129.54px] top-[129.7px] w-[80.925px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Bold',sans-serif] font-bold leading-[40px] left-0 text-[#000b25] text-[40px] text-nowrap top-[-1.8px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        84M
      </p>
    </div>
  );
}

function Paragraph13() {
  return <div className="absolute h-[19.5px] left-[3.4px] top-[173.5px] w-[18.763px]" data-name="Paragraph" />;
}

function Paragraph14() {
  return (
    <div className="absolute h-[19.5px] left-[310.45px] top-[173.5px] w-[26.15px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[19.5px] left-[-6.45px] text-[#6a7282] text-[13px] text-nowrap top-[-0.4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        94M
      </p>
    </div>
  );
}

function RevenueMatrix9() {
  return (
    <div className="absolute h-[170px] left-[90px] top-[78.7px] w-[340px]" data-name="RevenueMatrix">
      <Container14 />
      <Paragraph12 />
      <Paragraph13 />
      <Paragraph14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-[rgba(239,246,255,0.6)] h-[319.5px] left-0 rounded-[14px] top-[60.85px] w-[520px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(219,234,254,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <RevenueMatrix8 />
      <RevenueMatrix9 />
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[19.5px] left-[103px] text-[#6a7282] text-[13px] text-nowrap top-[251.8px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

export default function Container16() {
  return (
    <div className="relative size-full" data-name="Container">
      <Container12 />
      <Container15 />
    </div>
  );
}