import svgPaths from "./svg-6zgzz060fx";

function RevenueMatrix() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[54.906px]" data-name="RevenueMatrix">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.5px] relative w-[54.906px]">
        <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold leading-[19.5px] left-0 text-[#000b25] text-[13px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Quarter 1
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute box-border content-stretch flex h-[42px] items-center justify-between left-px px-[14px] py-0 top-px w-[780px]" data-name="Container">
      <RevenueMatrix />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[14.39%_7.72%_0.7%_7.38%]" data-name="Group">
      <div className="absolute bottom-0 left-[-8.05%] right-[-8.05%] top-[-16.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 198 99">
          <g id="Group">
            <path d={svgPaths.p3dc41800} id="Vector" stroke="url(#paint0_linear_10073_11053)" strokeWidth="27.3381" />
            <path d={svgPaths.p33019860} id="Vector_2" stroke="url(#paint1_linear_10073_11053)" strokeWidth="27.3381" />
            <path d={svgPaths.p26cba680} id="Vector_3" stroke="var(--stroke-0, #F25F33)" strokeDasharray="0.72 0.72" strokeLinecap="round" strokeWidth="2.30216" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10073_11053" x1="98.5759" x2="98.5759" y1="13.6691" y2="98.5759">
              <stop stopColor="#FFD572" />
              <stop offset="1" stopColor="#FEBD38" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10073_11053" x1="86.104" x2="86.104" y1="13.6691" y2="98.5759">
              <stop stopColor="#FF9364" />
              <stop offset="1" stopColor="#F25F33" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function RevenueMatrix1() {
  return (
    <div className="h-[100px] relative shrink-0 w-[200px]" data-name="RevenueMatrix">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[100px] relative w-[200px]">
        <Group />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex h-[100px] items-center justify-center left-0 top-0 w-[200px]" data-name="Container">
      <RevenueMatrix1 />
    </div>
  );
}

function Paragraph() {
  return <div className="absolute h-[24px] left-[65.72px] top-[74.44px] w-[69.281px]" data-name="Paragraph" />;
}

function Paragraph1() {
  return (
    <div className="absolute h-[18px] left-[3.75px] top-[103.5px] w-[17.328px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#6a7282] text-[12px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[18px] left-[163.86px] top-[103.5px] w-[24.141px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-[8.14px] text-[#6a7282] text-[12px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        25M
      </p>
    </div>
  );
}

function RevenueMatrix2() {
  return (
    <div className="absolute h-[100px] left-[291px] top-[57px] w-[200px]" data-name="RevenueMatrix">
      <Container1 />
      <Paragraph />
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8.568px] items-center justify-center relative">
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[16.708px] relative shrink-0 text-[#000b25] text-[11.139px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Details `}</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[11.996px] py-[3.427px] relative w-full">
          <Text />
        </div>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`2025 `}</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Revenue `}</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Achievement
      </p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Target
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[3.427px] items-start relative shrink-0">
      <Paragraph4 />
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6.855px] items-start relative">
        <Paragraph3 />
        <Frame />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`2024 `}</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Revenue `}</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Achievement
      </p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Target
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[3.427px] items-start relative shrink-0">
      <Paragraph8 />
      <Paragraph9 />
      <Paragraph10 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6.855px] items-start relative">
        <Paragraph7 />
        <Frame4 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6.855px] items-start pb-0 pt-[2.999px] px-0 relative">
        <Frame1 />
        <Frame2 />
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[14.566px] relative shrink-0 w-[21.421px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14.566px] w-[21.421px]" />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        55 M
      </p>
    </div>
  );
}

function RevenueMatrix3() {
  return (
    <div className="content-stretch flex h-[5.998px] items-center justify-center relative shrink-0 w-full" data-name="RevenueMatrix">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[9.163px] relative shrink-0 text-[#009b7b] text-[6.108px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        89.4% Target
      </p>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#e0f7f4] box-border content-stretch flex flex-col items-center justify-center p-[3.759px] relative rounded-[1.57664e+07px] shrink-0" data-name="Container">
      <RevenueMatrix3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[3.427px] items-start relative">
        <Paragraph12 />
        <Container4 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[6.855px] items-start pb-0 pt-[2.999px] px-0 relative shrink-0" data-name="Container">
      <Paragraph11 />
      <Frame5 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[5.998px] items-start justify-center relative">
        {[...Array(2).keys()].map((_, i) => (
          <Container5 key={i} />
        ))}
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="box-border content-stretch flex gap-[11.996px] items-start px-[11.996px] py-0 relative shrink-0" data-name="Container">
      <Container3 />
      <Frame3 />
    </div>
  );
}

function ServiceMatrix() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col items-start left-[628px] p-[0.857px] rounded-[7.497px] top-[12px]" data-name="ServiceMatrix">
      <div aria-hidden="true" className="absolute border-[0.857px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[7.497px]" />
      <Container2 />
      <Container6 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[14.39%_7.72%_0.7%_7.38%]" data-name="Group">
      <div className="absolute bottom-0 left-[-8.05%] right-[-8.05%] top-[-16.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 121 61">
          <g id="Group">
            <path d={svgPaths.p1bdd6a00} id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeOpacity="0.5" strokeWidth="16.6763" />
            <path d={svgPaths.pc3f5eb0} id="Vector_2" stroke="url(#paint0_linear_10073_11048)" strokeWidth="16.6763" />
            <path d={svgPaths.p15adc800} id="Vector_3" stroke="var(--stroke-0, #F25F33)" strokeDasharray="0.44 0.44" strokeLinecap="round" strokeWidth="1.40432" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10073_11048" x1="52.5233" x2="52.5233" y1="8.33813" y2="60.1313">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#234C90" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function RevenueMatrix4() {
  return (
    <div className="h-[61px] relative shrink-0 w-[122px]" data-name="RevenueMatrix">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[61px] relative w-[122px]">
        <Group1 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex h-[61px] items-center justify-center left-0 top-0 w-[122px]" data-name="Container">
      <RevenueMatrix4 />
    </div>
  );
}

function Paragraph13() {
  return <div className="absolute h-[14.64px] left-[40.09px] top-[45.41px] w-[42.262px]" data-name="Paragraph" />;
}

function Paragraph14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] items-center justify-center left-[2.29px] top-[63.13px] w-[10.57px]" data-name="Paragraph">
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[10.98px] relative shrink-0 text-[#6a7282] text-[7.32px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center left-[104px] top-[63.13px]" data-name="Paragraph">
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[10.98px] relative shrink-0 text-[#6a7282] text-[7.32px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        25M
      </p>
    </div>
  );
}

function RevenueMatrix5() {
  return (
    <div className="absolute h-[61px] left-[329px] top-[93px] w-[122px]" data-name="RevenueMatrix">
      <Container7 />
      <Paragraph13 />
      <Paragraph14 />
      <Paragraph15 />
    </div>
  );
}

function Container8() {
  return (
    <div className="[grid-area:1_/_1] bg-[rgba(239,246,255,0.6)] relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(219,234,254,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container />
      <RevenueMatrix2 />
      <ServiceMatrix />
      <RevenueMatrix5 />
    </div>
  );
}

function RevenueMatrix6() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[54.906px]" data-name="RevenueMatrix">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.5px] relative w-[54.906px]">
        <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold leading-[19.5px] left-0 text-[#000b25] text-[13px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Quarter 2
        </p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute box-border content-stretch flex h-[42px] items-center justify-between left-px px-[14px] py-0 top-px w-[780px]" data-name="Container">
      <RevenueMatrix6 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[14.39%_7.72%_0.7%_7.38%]" data-name="Group">
      <div className="absolute bottom-0 left-[-8.05%] right-[-8.05%] top-[-16.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 198 99">
          <g id="Group">
            <path d={svgPaths.p3dc41800} id="Vector" stroke="url(#paint0_linear_10073_11053)" strokeWidth="27.3381" />
            <path d={svgPaths.p33019860} id="Vector_2" stroke="url(#paint1_linear_10073_11053)" strokeWidth="27.3381" />
            <path d={svgPaths.p26cba680} id="Vector_3" stroke="var(--stroke-0, #F25F33)" strokeDasharray="0.72 0.72" strokeLinecap="round" strokeWidth="2.30216" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10073_11053" x1="98.5759" x2="98.5759" y1="13.6691" y2="98.5759">
              <stop stopColor="#FFD572" />
              <stop offset="1" stopColor="#FEBD38" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10073_11053" x1="86.104" x2="86.104" y1="13.6691" y2="98.5759">
              <stop stopColor="#FF9364" />
              <stop offset="1" stopColor="#F25F33" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function RevenueMatrix7() {
  return (
    <div className="h-[100px] relative shrink-0 w-[200px]" data-name="RevenueMatrix">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[100px] relative w-[200px]">
        <Group2 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex h-[100px] items-center justify-center left-0 top-0 w-[200px]" data-name="Container">
      <RevenueMatrix7 />
    </div>
  );
}

function Paragraph16() {
  return <div className="absolute h-[24px] left-[65.72px] top-[74.44px] w-[69.281px]" data-name="Paragraph" />;
}

function Paragraph17() {
  return (
    <div className="absolute h-[18px] left-[3.75px] top-[103.5px] w-[17.328px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#6a7282] text-[12px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute h-[18px] left-[163.86px] top-[103.5px] w-[24.141px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-[8.14px] text-[#6a7282] text-[12px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        25M
      </p>
    </div>
  );
}

function RevenueMatrix8() {
  return (
    <div className="absolute h-[100px] left-[291px] top-[57px] w-[200px]" data-name="RevenueMatrix">
      <Container10 />
      <Paragraph16 />
      <Paragraph17 />
      <Paragraph18 />
    </div>
  );
}

function Text1() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8.568px] items-center justify-center relative">
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[16.708px] relative shrink-0 text-[#000b25] text-[11.139px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Details `}</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[11.996px] py-[3.427px] relative w-full">
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`2025 `}</p>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Revenue `}</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Achievement
      </p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Target
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[3.427px] items-start relative shrink-0">
      <Paragraph20 />
      <Paragraph21 />
      <Paragraph22 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6.855px] items-start relative">
        <Paragraph19 />
        <Frame6 />
      </div>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`2024 `}</p>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Revenue `}</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Achievement
      </p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Target
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[3.427px] items-start relative shrink-0">
      <Paragraph24 />
      <Paragraph25 />
      <Paragraph26 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6.855px] items-start relative">
        <Paragraph23 />
        <Frame8 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6.855px] items-start pb-0 pt-[2.999px] px-0 relative">
        <Frame7 />
        <Frame9 />
      </div>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="h-[14.566px] relative shrink-0 w-[21.421px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14.566px] w-[21.421px]" />
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        55 M
      </p>
    </div>
  );
}

function RevenueMatrix9() {
  return (
    <div className="content-stretch flex h-[5.998px] items-center justify-center relative shrink-0 w-full" data-name="RevenueMatrix">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[9.163px] relative shrink-0 text-[#009b7b] text-[6.108px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        89.4% Target
      </p>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#e0f7f4] box-border content-stretch flex flex-col items-center justify-center p-[3.759px] relative rounded-[1.57664e+07px] shrink-0" data-name="Container">
      <RevenueMatrix9 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[3.427px] items-start relative">
        <Paragraph28 />
        <Container13 />
        <Paragraph28 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[6.855px] items-start pb-0 pt-[2.999px] px-0 relative shrink-0" data-name="Container">
      <Paragraph27 />
      <Frame10 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[5.998px] items-start justify-center relative">
        {[...Array(2).keys()].map((_, i) => (
          <Container14 key={i} />
        ))}
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="box-border content-stretch flex gap-[11.996px] items-start px-[11.996px] py-0 relative shrink-0" data-name="Container">
      <Container12 />
      <Frame11 />
    </div>
  );
}

function ServiceMatrix1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col items-start left-[628px] p-[0.857px] rounded-[7.497px] top-[12px]" data-name="ServiceMatrix">
      <div aria-hidden="true" className="absolute border-[0.857px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[7.497px]" />
      <Container11 />
      <Container15 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[14.39%_7.72%_0.7%_7.38%]" data-name="Group">
      <div className="absolute bottom-0 left-[-8.05%] right-[-8.05%] top-[-16.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 121 61">
          <g id="Group">
            <path d={svgPaths.p1bdd6a00} id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeOpacity="0.5" strokeWidth="16.6763" />
            <path d={svgPaths.pc3f5eb0} id="Vector_2" stroke="url(#paint0_linear_10073_11048)" strokeWidth="16.6763" />
            <path d={svgPaths.p15adc800} id="Vector_3" stroke="var(--stroke-0, #F25F33)" strokeDasharray="0.44 0.44" strokeLinecap="round" strokeWidth="1.40432" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10073_11048" x1="52.5233" x2="52.5233" y1="8.33813" y2="60.1313">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#234C90" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function RevenueMatrix10() {
  return (
    <div className="h-[61px] relative shrink-0 w-[122px]" data-name="RevenueMatrix">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[61px] relative w-[122px]">
        <Group3 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex h-[61px] items-center justify-center left-0 top-0 w-[122px]" data-name="Container">
      <RevenueMatrix10 />
    </div>
  );
}

function Paragraph29() {
  return <div className="absolute h-[14.64px] left-[40.09px] top-[45.41px] w-[42.262px]" data-name="Paragraph" />;
}

function Paragraph30() {
  return (
    <div className="absolute h-[10.98px] left-[2.29px] top-[63.13px] w-[10.57px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[10.98px] left-0 text-[#6a7282] text-[7.32px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="absolute h-[10.98px] left-[99.95px] top-[63.13px] w-[14.726px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[10.98px] left-[4.97px] text-[#6a7282] text-[7.32px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        25M
      </p>
    </div>
  );
}

function RevenueMatrix11() {
  return (
    <div className="absolute h-[61px] left-[329px] top-[93px] w-[122px]" data-name="RevenueMatrix">
      <Container16 />
      <Paragraph29 />
      <Paragraph30 />
      <Paragraph31 />
    </div>
  );
}

function Container17() {
  return (
    <div className="[grid-area:1_/_2] bg-[rgba(239,246,255,0.6)] relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(219,234,254,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container9 />
      <RevenueMatrix8 />
      <ServiceMatrix1 />
      <RevenueMatrix11 />
    </div>
  );
}

function RevenueMatrix12() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[54.906px]" data-name="RevenueMatrix">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.5px] relative w-[54.906px]">
        <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold leading-[19.5px] left-0 text-[#000b25] text-[13px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Quarter 3
        </p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute box-border content-stretch flex h-[42px] items-center justify-between left-px px-[14px] py-0 top-px w-[780px]" data-name="Container">
      <RevenueMatrix12 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[14.39%_7.72%_0.7%_7.38%]" data-name="Group">
      <div className="absolute bottom-0 left-[-8.05%] right-[-8.05%] top-[-16.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 198 99">
          <g id="Group">
            <path d={svgPaths.p3dc41800} id="Vector" stroke="url(#paint0_linear_10073_11053)" strokeWidth="27.3381" />
            <path d={svgPaths.p33019860} id="Vector_2" stroke="url(#paint1_linear_10073_11053)" strokeWidth="27.3381" />
            <path d={svgPaths.p26cba680} id="Vector_3" stroke="var(--stroke-0, #F25F33)" strokeDasharray="0.72 0.72" strokeLinecap="round" strokeWidth="2.30216" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10073_11053" x1="98.5759" x2="98.5759" y1="13.6691" y2="98.5759">
              <stop stopColor="#FFD572" />
              <stop offset="1" stopColor="#FEBD38" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10073_11053" x1="86.104" x2="86.104" y1="13.6691" y2="98.5759">
              <stop stopColor="#FF9364" />
              <stop offset="1" stopColor="#F25F33" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function RevenueMatrix13() {
  return (
    <div className="h-[100px] relative shrink-0 w-[200px]" data-name="RevenueMatrix">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[100px] relative w-[200px]">
        <Group4 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex h-[100px] items-center justify-center left-0 top-0 w-[200px]" data-name="Container">
      <RevenueMatrix13 />
    </div>
  );
}

function Paragraph32() {
  return <div className="absolute h-[24px] left-[65.72px] top-[74.44px] w-[69.281px]" data-name="Paragraph" />;
}

function Paragraph33() {
  return (
    <div className="absolute h-[18px] left-[3.75px] top-[103.5px] w-[17.328px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#6a7282] text-[12px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="absolute h-[18px] left-[163.86px] top-[103.5px] w-[24.141px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-[8.14px] text-[#6a7282] text-[12px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        25M
      </p>
    </div>
  );
}

function RevenueMatrix14() {
  return (
    <div className="absolute h-[100px] left-[291px] top-[57px] w-[200px]" data-name="RevenueMatrix">
      <Container19 />
      <Paragraph32 />
      <Paragraph33 />
      <Paragraph34 />
    </div>
  );
}

function Text2() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8.568px] items-center justify-center relative">
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[16.708px] relative shrink-0 text-[#000b25] text-[11.139px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Details `}</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[11.996px] py-[3.427px] relative w-full">
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`2025 `}</p>
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Revenue `}</p>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Achievement
      </p>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Target
      </p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[3.427px] items-start relative shrink-0">
      <Paragraph36 />
      <Paragraph37 />
      <Paragraph38 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6.855px] items-start relative">
        <Paragraph35 />
        <Frame12 />
      </div>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`2024 `}</p>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Revenue `}</p>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Achievement
      </p>
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Target
      </p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[3.427px] items-start relative shrink-0">
      <Paragraph40 />
      <Paragraph41 />
      <Paragraph42 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6.855px] items-start relative">
        <Paragraph39 />
        <Frame14 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6.855px] items-start pb-0 pt-[2.999px] px-0 relative">
        <Frame13 />
        <Frame15 />
      </div>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="h-[14.566px] relative shrink-0 w-[21.421px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14.566px] w-[21.421px]" />
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        55 M
      </p>
    </div>
  );
}

function RevenueMatrix15() {
  return (
    <div className="content-stretch flex h-[5.998px] items-center justify-center relative shrink-0 w-full" data-name="RevenueMatrix">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[9.163px] relative shrink-0 text-[#009b7b] text-[6.108px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        89.4% Target
      </p>
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-[#e0f7f4] box-border content-stretch flex flex-col items-center justify-center p-[3.759px] relative rounded-[1.57664e+07px] shrink-0" data-name="Container">
      <RevenueMatrix15 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[3.427px] items-start relative">
        <Paragraph44 />
        <Container22 />
        <Paragraph44 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[6.855px] items-start pb-0 pt-[2.999px] px-0 relative shrink-0" data-name="Container">
      <Paragraph43 />
      <Frame16 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[5.998px] items-start justify-center relative">
        {[...Array(2).keys()].map((_, i) => (
          <Container23 key={i} />
        ))}
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="box-border content-stretch flex gap-[11.996px] items-start px-[11.996px] py-0 relative shrink-0" data-name="Container">
      <Container21 />
      <Frame17 />
    </div>
  );
}

function ServiceMatrix2() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col items-start left-[628px] p-[0.857px] rounded-[7.497px] top-[12px]" data-name="ServiceMatrix">
      <div aria-hidden="true" className="absolute border-[0.857px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[7.497px]" />
      <Container20 />
      <Container24 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[14.39%_7.72%_0.7%_7.38%]" data-name="Group">
      <div className="absolute bottom-0 left-[-8.05%] right-[-8.05%] top-[-16.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 121 61">
          <g id="Group">
            <path d={svgPaths.p1bdd6a00} id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeOpacity="0.5" strokeWidth="16.6763" />
            <path d={svgPaths.pc3f5eb0} id="Vector_2" stroke="url(#paint0_linear_10073_11048)" strokeWidth="16.6763" />
            <path d={svgPaths.p15adc800} id="Vector_3" stroke="var(--stroke-0, #F25F33)" strokeDasharray="0.44 0.44" strokeLinecap="round" strokeWidth="1.40432" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10073_11048" x1="52.5233" x2="52.5233" y1="8.33813" y2="60.1313">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#234C90" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function RevenueMatrix16() {
  return (
    <div className="h-[61px] relative shrink-0 w-[122px]" data-name="RevenueMatrix">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[61px] relative w-[122px]">
        <Group5 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex h-[61px] items-center justify-center left-0 top-0 w-[122px]" data-name="Container">
      <RevenueMatrix16 />
    </div>
  );
}

function Paragraph45() {
  return <div className="absolute h-[14.64px] left-[40.09px] top-[45.41px] w-[42.262px]" data-name="Paragraph" />;
}

function Paragraph46() {
  return (
    <div className="absolute h-[10.98px] left-[2.29px] top-[63.13px] w-[10.57px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[10.98px] left-0 text-[#6a7282] text-[7.32px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="absolute h-[10.98px] left-[99.95px] top-[63.13px] w-[14.726px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[10.98px] left-[4.97px] text-[#6a7282] text-[7.32px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        25M
      </p>
    </div>
  );
}

function RevenueMatrix17() {
  return (
    <div className="absolute h-[61px] left-[329px] top-[93px] w-[122px]" data-name="RevenueMatrix">
      <Container25 />
      <Paragraph45 />
      <Paragraph46 />
      <Paragraph47 />
    </div>
  );
}

function Container26() {
  return (
    <div className="[grid-area:2_/_1] bg-[rgba(239,246,255,0.6)] relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(219,234,254,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container18 />
      <RevenueMatrix14 />
      <ServiceMatrix2 />
      <RevenueMatrix17 />
    </div>
  );
}

function RevenueMatrix18() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[54.906px]" data-name="RevenueMatrix">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.5px] relative w-[54.906px]">
        <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold leading-[19.5px] left-0 text-[#000b25] text-[13px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Quarter 4
        </p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute box-border content-stretch flex h-[42px] items-center justify-between left-px px-[14px] py-0 top-px w-[780px]" data-name="Container">
      <RevenueMatrix18 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[14.39%_7.72%_0.7%_7.38%]" data-name="Group">
      <div className="absolute bottom-0 left-[-8.05%] right-[-8.05%] top-[-16.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 198 99">
          <g id="Group">
            <path d={svgPaths.p3dc41800} id="Vector" stroke="url(#paint0_linear_10073_11053)" strokeWidth="27.3381" />
            <path d={svgPaths.p33019860} id="Vector_2" stroke="url(#paint1_linear_10073_11053)" strokeWidth="27.3381" />
            <path d={svgPaths.p26cba680} id="Vector_3" stroke="var(--stroke-0, #F25F33)" strokeDasharray="0.72 0.72" strokeLinecap="round" strokeWidth="2.30216" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10073_11053" x1="98.5759" x2="98.5759" y1="13.6691" y2="98.5759">
              <stop stopColor="#FFD572" />
              <stop offset="1" stopColor="#FEBD38" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10073_11053" x1="86.104" x2="86.104" y1="13.6691" y2="98.5759">
              <stop stopColor="#FF9364" />
              <stop offset="1" stopColor="#F25F33" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function RevenueMatrix19() {
  return (
    <div className="h-[100px] relative shrink-0 w-[200px]" data-name="RevenueMatrix">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[100px] relative w-[200px]">
        <Group6 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex h-[100px] items-center justify-center left-0 top-0 w-[200px]" data-name="Container">
      <RevenueMatrix19 />
    </div>
  );
}

function Paragraph48() {
  return <div className="absolute h-[24px] left-[65.72px] top-[74.44px] w-[69.281px]" data-name="Paragraph" />;
}

function Paragraph49() {
  return (
    <div className="absolute h-[18px] left-[3.75px] top-[103.5px] w-[17.328px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#6a7282] text-[12px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="absolute h-[18px] left-[163.86px] top-[103.5px] w-[24.141px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[18px] left-[8.14px] text-[#6a7282] text-[12px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        25M
      </p>
    </div>
  );
}

function RevenueMatrix20() {
  return (
    <div className="absolute h-[100px] left-[291px] top-[57px] w-[200px]" data-name="RevenueMatrix">
      <Container28 />
      <Paragraph48 />
      <Paragraph49 />
      <Paragraph50 />
    </div>
  );
}

function Text3() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8.568px] items-center justify-center relative">
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[16.708px] relative shrink-0 text-[#000b25] text-[11.139px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Details `}</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[11.996px] py-[3.427px] relative w-full">
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Paragraph51() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`2025 `}</p>
    </div>
  );
}

function Paragraph52() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Revenue `}</p>
    </div>
  );
}

function Paragraph53() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Achievement
      </p>
    </div>
  );
}

function Paragraph54() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Target
      </p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[3.427px] items-start relative shrink-0">
      <Paragraph52 />
      <Paragraph53 />
      <Paragraph54 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6.855px] items-start relative">
        <Paragraph51 />
        <Frame18 />
      </div>
    </div>
  );
}

function Paragraph55() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`2024 `}</p>
    </div>
  );
}

function Paragraph56() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Revenue `}</p>
    </div>
  );
}

function Paragraph57() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Achievement
      </p>
    </div>
  );
}

function Paragraph58() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Target
      </p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[3.427px] items-start relative shrink-0">
      <Paragraph56 />
      <Paragraph57 />
      <Paragraph58 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6.855px] items-start relative">
        <Paragraph55 />
        <Frame20 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6.855px] items-start pb-0 pt-[2.999px] px-0 relative">
        <Frame19 />
        <Frame21 />
      </div>
    </div>
  );
}

function Paragraph59() {
  return (
    <div className="h-[14.566px] relative shrink-0 w-[21.421px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14.566px] w-[21.421px]" />
    </div>
  );
}

function Paragraph60() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        55 M
      </p>
    </div>
  );
}

function RevenueMatrix21() {
  return (
    <div className="content-stretch flex h-[5.998px] items-center justify-center relative shrink-0 w-full" data-name="RevenueMatrix">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[9.163px] relative shrink-0 text-[#009b7b] text-[6.108px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        89.4% Target
      </p>
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[#e0f7f4] box-border content-stretch flex flex-col items-center justify-center p-[3.759px] relative rounded-[1.57664e+07px] shrink-0" data-name="Container">
      <RevenueMatrix21 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[3.427px] items-start relative">
        <Paragraph60 />
        <Container31 />
        <Paragraph60 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[6.855px] items-start pb-0 pt-[2.999px] px-0 relative shrink-0" data-name="Container">
      <Paragraph59 />
      <Frame22 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[5.998px] items-start justify-center relative">
        {[...Array(2).keys()].map((_, i) => (
          <Container32 key={i} />
        ))}
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="box-border content-stretch flex gap-[11.996px] items-start px-[11.996px] py-0 relative shrink-0" data-name="Container">
      <Container30 />
      <Frame23 />
    </div>
  );
}

function ServiceMatrix3() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col items-start left-[628px] p-[0.857px] rounded-[7.497px] top-[12px]" data-name="ServiceMatrix">
      <div aria-hidden="true" className="absolute border-[0.857px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[7.497px]" />
      <Container29 />
      <Container33 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[14.39%_7.72%_0.7%_7.38%]" data-name="Group">
      <div className="absolute bottom-0 left-[-8.05%] right-[-8.05%] top-[-16.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 121 61">
          <g id="Group">
            <path d={svgPaths.p1bdd6a00} id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeOpacity="0.5" strokeWidth="16.6763" />
            <path d={svgPaths.pc3f5eb0} id="Vector_2" stroke="url(#paint0_linear_10073_11048)" strokeWidth="16.6763" />
            <path d={svgPaths.p15adc800} id="Vector_3" stroke="var(--stroke-0, #F25F33)" strokeDasharray="0.44 0.44" strokeLinecap="round" strokeWidth="1.40432" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10073_11048" x1="52.5233" x2="52.5233" y1="8.33813" y2="60.1313">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#234C90" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function RevenueMatrix22() {
  return (
    <div className="h-[61px] relative shrink-0 w-[122px]" data-name="RevenueMatrix">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[61px] relative w-[122px]">
        <Group7 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex h-[61px] items-center justify-center left-0 top-0 w-[122px]" data-name="Container">
      <RevenueMatrix22 />
    </div>
  );
}

function Paragraph61() {
  return <div className="absolute h-[14.64px] left-[40.09px] top-[45.41px] w-[42.262px]" data-name="Paragraph" />;
}

function Paragraph62() {
  return (
    <div className="absolute h-[10.98px] left-[2.29px] top-[63.13px] w-[10.57px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[10.98px] left-0 text-[#6a7282] text-[7.32px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

function Paragraph63() {
  return (
    <div className="absolute h-[10.98px] left-[99.95px] top-[63.13px] w-[14.726px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[10.98px] left-[4.97px] text-[#6a7282] text-[7.32px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        25M
      </p>
    </div>
  );
}

function RevenueMatrix23() {
  return (
    <div className="absolute h-[61px] left-[329px] top-[93px] w-[122px]" data-name="RevenueMatrix">
      <Container34 />
      <Paragraph61 />
      <Paragraph62 />
      <Paragraph63 />
    </div>
  );
}

function Container35() {
  return (
    <div className="[grid-area:2_/_2] bg-[rgba(239,246,255,0.6)] relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(219,234,254,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container27 />
      <RevenueMatrix20 />
      <ServiceMatrix3 />
      <RevenueMatrix23 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute gap-[14px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[442px] left-[541px] top-0 w-[1578px]" data-name="Container">
      <Container8 />
      <Container17 />
      <Container26 />
      <Container35 />
    </div>
  );
}

function RevenueMatrix24() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[121.719px]" data-name="RevenueMatrix">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.5px] relative w-[121.719px]">
        <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold leading-[22.5px] left-0 text-[#000b25] text-[15px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Year Performance
        </p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute box-border content-stretch flex h-[56.5px] items-center justify-between left-px px-[21px] py-0 top-px w-[518px]" data-name="Container">
      <RevenueMatrix24 />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute bottom-0 left-[7.25%] right-[7.25%] top-[14.49%]" data-name="Group">
      <div className="absolute bottom-0 left-[-8.19%] right-[-8.19%] top-[-16.38%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 339 170">
          <g id="Group">
            <path d={svgPaths.p1dc8300} id="Vector" stroke="url(#paint0_linear_10074_773)" strokeWidth="47.6329" />
            <path d={svgPaths.p20188700} id="Vector_2" stroke="url(#paint1_linear_10074_773)" strokeWidth="47.6329" />
            <path d={svgPaths.p161880} id="Vector_3" stroke="var(--stroke-0, #F25F33)" strokeDasharray="0.82 0.82" strokeLinecap="round" strokeWidth="4.10628" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10074_773" x1="169.179" x2="169.179" y1="23.8164" y2="169.179">
              <stop stopColor="#FFD572" />
              <stop offset="1" stopColor="#FEBD38" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10074_773" x1="147.826" x2="147.826" y1="23.8164" y2="169.179">
              <stop stopColor="#FF9364" />
              <stop offset="1" stopColor="#F25F33" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[14.39%_7.72%_0.7%_7.38%]" data-name="Group">
      <div className="absolute bottom-0 left-[-8.05%] right-[-8.05%] top-[-16.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 203 102">
          <g id="Group">
            <path d={svgPaths.p3bdd8100} id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeOpacity="0.5" strokeWidth="28.0814" />
            <path d={svgPaths.pb490220} id="Vector_2" stroke="url(#paint0_linear_10074_768)" strokeWidth="28.0814" />
            <path d={svgPaths.p1c8ba9f0} id="Vector_3" stroke="var(--stroke-0, #F25F33)" strokeDasharray="0.74 0.74" strokeLinecap="round" strokeWidth="2.36475" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10074_768" x1="88.4447" x2="88.4447" y1="14.0407" y2="101.256">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#234C90" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function RevenueMatrix25() {
  return (
    <div className="h-[102.719px] relative shrink-0 w-[205.438px]" data-name="RevenueMatrix">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[102.719px] relative w-[205.438px]">
        <Group9 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex h-[102.719px] items-center justify-center left-0 top-0 w-[205.438px]" data-name="Container">
      <RevenueMatrix25 />
    </div>
  );
}

function Paragraph64() {
  return <div className="absolute h-[24.653px] left-[67.5px] top-[76.46px] w-[71.165px]" data-name="Paragraph" />;
}

function Paragraph65() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16.839px] items-center justify-center left-[3.86px] top-[106.31px] w-[17.799px]" data-name="Paragraph">
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[18.489px] relative shrink-0 text-[#6a7282] text-[12.326px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

function Paragraph66() {
  return (
    <div className="absolute content-stretch flex gap-[16.839px] items-center justify-center left-[175.13px] top-[106.31px]" data-name="Paragraph">
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[18.489px] relative shrink-0 text-[#6a7282] text-[12.326px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        25M
      </p>
    </div>
  );
}

function RevenueMatrix26() {
  return (
    <div className="absolute inset-[39.41%_19.58%_0.17%_20%]" data-name="RevenueMatrix">
      <Container38 />
      <Paragraph64 />
      <Paragraph65 />
      <Paragraph66 />
    </div>
  );
}

function RevenueMatrix27() {
  return (
    <div className="h-[170px] relative shrink-0 w-[340px]" data-name="RevenueMatrix">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[170px] relative w-[340px]">
        <Group8 />
        <RevenueMatrix26 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex h-[170px] items-center justify-center left-0 top-0 w-[340px]" data-name="Container">
      <RevenueMatrix27 />
    </div>
  );
}

function Paragraph67() {
  return (
    <div className="absolute h-[19.5px] left-[-4.11px] top-[171.5px] w-[13.875px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[19.5px] left-0 text-[#6a7282] text-[13px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

function Paragraph68() {
  return (
    <div className="absolute h-[19.5px] left-[313.84px] top-[171.5px] w-[26.156px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[19.5px] left-[-12.84px] text-[#6a7282] text-[13px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        94M
      </p>
    </div>
  );
}

function RevenueMatrix28() {
  return (
    <div className="absolute h-[170px] left-[90px] top-[109px] w-[340px]" data-name="RevenueMatrix">
      <Container39 />
      <Paragraph67 />
      <Paragraph68 />
    </div>
  );
}

function Text4() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8.568px] items-center justify-center relative">
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[16.708px] relative shrink-0 text-[#000b25] text-[11.139px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Details `}</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[11.996px] py-[3.427px] relative w-full">
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Paragraph69() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`2025 `}</p>
    </div>
  );
}

function Paragraph70() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Revenue `}</p>
    </div>
  );
}

function Paragraph71() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Achievement
      </p>
    </div>
  );
}

function Paragraph72() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Target
      </p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[3.427px] items-start relative shrink-0">
      <Paragraph70 />
      <Paragraph71 />
      <Paragraph72 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="relative shrink-0">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-slate-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6.855px] items-start pl-0 pr-[8px] py-0 relative">
        <Paragraph69 />
        <Frame24 />
      </div>
    </div>
  );
}

function Paragraph73() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`2024 `}</p>
    </div>
  );
}

function Paragraph74() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Revenue `}</p>
    </div>
  );
}

function Paragraph75() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Achievement
      </p>
    </div>
  );
}

function Paragraph76() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Target
      </p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[3.427px] items-start relative shrink-0">
      <Paragraph74 />
      <Paragraph75 />
      <Paragraph76 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6.855px] items-start relative">
        <Paragraph73 />
        <Frame26 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6.855px] items-start pb-0 pt-[2.999px] px-0 relative">
        <Frame25 />
        <Frame27 />
      </div>
    </div>
  );
}

function Paragraph77() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        55 M
      </p>
    </div>
  );
}

function RevenueMatrix29() {
  return (
    <div className="content-stretch flex h-[5.998px] items-center justify-center relative shrink-0 w-full" data-name="RevenueMatrix">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[9.163px] relative shrink-0 text-[#009b7b] text-[6.108px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        89.4% Target
      </p>
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[#e0f7f4] box-border content-stretch flex flex-col items-center justify-center p-[3.759px] relative rounded-[1.57664e+07px] shrink-0" data-name="Container">
      <RevenueMatrix29 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-start justify-between relative w-full">
        <Paragraph77 />
        <Container42 />
        <Paragraph77 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="box-border content-stretch flex gap-[6.855px] items-start pb-0 pl-0 pr-[11px] pt-[2.999px] relative shrink-0 w-[133px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-slate-200 border-solid inset-0 pointer-events-none" />
      <Frame28 />
    </div>
  );
}

function Paragraph78() {
  return (
    <div className="content-stretch flex gap-[8.568px] items-center justify-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[14.138px] relative shrink-0 text-[9.425px] text-[rgba(0,11,37,0.57)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        55 M
      </p>
    </div>
  );
}

function RevenueMatrix30() {
  return (
    <div className="content-stretch flex h-[5.998px] items-center justify-center relative shrink-0 w-full" data-name="RevenueMatrix">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[9.163px] relative shrink-0 text-[#009b7b] text-[6.108px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        89.4% Target
      </p>
    </div>
  );
}

function Container44() {
  return (
    <div className="bg-[#e0f7f4] box-border content-stretch flex flex-col items-center justify-center p-[3.759px] relative rounded-[1.57664e+07px] shrink-0" data-name="Container">
      <RevenueMatrix30 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-start justify-between relative w-full">
        <Paragraph78 />
        <Container44 />
        <Paragraph78 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="box-border content-stretch flex gap-[6.855px] items-start pb-0 pl-0 pr-[10px] pt-[2.999px] relative shrink-0 w-[132px]" data-name="Container">
      <Frame29 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[5.998px] items-center relative w-full">
        <Container43 />
        <Container45 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[4px] items-start px-[11.996px] py-0 relative shrink-0" data-name="Container">
      <Container41 />
      <Frame30 />
    </div>
  );
}

function ServiceMatrix4() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col items-start left-[86px] pb-[8px] pt-[0.857px] px-[0.857px] rounded-[7.497px] top-[328px]" data-name="ServiceMatrix">
      <div aria-hidden="true" className="absolute border-[0.857px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[7.497px]" />
      <Container40 />
      <Container46 />
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bg-[rgba(239,246,255,0.6)] h-[442px] left-0 rounded-[14px] top-0 w-[520px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(219,234,254,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container37 />
      <RevenueMatrix28 />
      <ServiceMatrix4 />
    </div>
  );
}

export default function Container48() {
  return (
    <div className="relative size-full" data-name="Container">
      <Container36 />
      <Container47 />
    </div>
  );
}