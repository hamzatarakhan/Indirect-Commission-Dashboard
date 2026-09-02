import svgPaths from "./svg-s0erw305zu";

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
    <div className="absolute h-[10.98px] left-[2.29px] top-[63.13px] w-[10.57px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[10.98px] left-0 text-[#6a7282] text-[7.32px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        0M
      </p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="absolute h-[10.98px] left-[99.95px] top-[63.13px] w-[14.726px]" data-name="Paragraph">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[10.98px] left-[4.97px] text-[#6a7282] text-[7.32px] text-nowrap top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
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

export default function Container8() {
  return (
    <div className="bg-[rgba(239,246,255,0.6)] relative rounded-[14px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(219,234,254,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container />
      <RevenueMatrix2 />
      <ServiceMatrix />
      <RevenueMatrix5 />
    </div>
  );
}