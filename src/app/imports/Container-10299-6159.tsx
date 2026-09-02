import svgPaths from "./svg-0ifoqfka7y";
import clsx from "clsx";

function Wrapper5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ "--transform-inner-width": "1", "--transform-inner-height": "1" } as React.CSSProperties} className="absolute flex items-center justify-center left-[25.41px] size-[14px] top-[39.3px]">
      <div className="flex-none rotate-[45deg]">{children}</div>
    </div>
  );
}

function Container5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-[45px] min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">{children}</div>
    </div>
  );
}

function Container4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-slate-100 h-[45px] relative rounded-[8.75px] shrink-0 w-[127.156px]">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pl-px pr-[11.5px] py-[6.25px] relative size-full">{children}</div>
    </div>
  );
}
type Container3Props = {
  additionalClassNames?: string;
};

function Container3({ children, additionalClassNames = "" }: React.PropsWithChildren<Container3Props>) {
  return (
    <div className={clsx("relative rounded-[12.75px] shrink-0 size-[42px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[10.5px] px-[10.5px] relative size-full">{children}</div>
    </div>
  );
}
type Wrapper4Props = {
  additionalClassNames?: string;
};

function Wrapper4({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper4Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">{children}</div>
    </div>
  );
}
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return <Wrapper4 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</Wrapper4>;
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return <Wrapper4 additionalClassNames={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>{children}</Wrapper4>;
}
type Container2Props = {
  additionalClassNames?: string;
};

function Container2({ children, additionalClassNames = "" }: React.PropsWithChildren<Container2Props>) {
  return (
    <div className={clsx("bg-white place-self-stretch relative rounded-[12.75px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">{children}</div>
      </div>
    </div>
  );
}

function CompanyDetailsPage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[340px] relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[17.5px] items-start pb-0 pt-[21px] px-[21px] relative size-full">{children}</div>
      </div>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="absolute inset-[-0.88px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          {children}
        </svg>
      </div>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return <Wrapper1 additionalClassNames={clsx("absolute left-1/2 right-[49.96%]", additionalClassNames)}>{children}</Wrapper1>;
}
type Icon4Vector1Props = {
  additionalClassNames?: string;
};

function Icon4Vector1({ additionalClassNames = "" }: Icon4Vector1Props) {
  return (
    <Wrapper1 additionalClassNames={clsx("absolute left-1/4 right-[74.96%]", additionalClassNames)}>
      <path d="M0.875 0.875H0.88375" id="Vector" stroke="var(--stroke-0, #009966)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
    </Wrapper1>
  );
}
type Icon4VectorProps = {
  additionalClassNames?: string;
};

function Icon4Vector({ additionalClassNames = "" }: Icon4VectorProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-12.5%_-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 9">
          <path d={svgPaths.p722f300} id="Vector" stroke="var(--stroke-0, #009966)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
        </svg>
      </div>
    </div>
  );
}
type TextText4Props = {
  text: string;
};

function TextText4({ text }: TextText4Props) {
  return (
    <Wrapper2 additionalClassNames="h-[15px]">
      <p className="font-['Arial:Regular',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#4a5565] text-[10px] text-nowrap whitespace-pre">{text}</p>
    </Wrapper2>
  );
}
type ContainerText6Props = {
  text: string;
};

function ContainerText6({ text }: ContainerText6Props) {
  return (
    <div className="h-[13.5px] relative shrink-0 w-full">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[13.5px] left-0 not-italic text-[#99a1af] text-[9px] top-[-2px] w-[34px]">{text}</p>
    </div>
  );
}
type ContainerText5Props = {
  text: string;
};

function ContainerText5({ text }: ContainerText5Props) {
  return (
    <div className="h-[13.5px] relative shrink-0 w-full">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[13.5px] left-0 not-italic text-[#99a1af] text-[9px] top-[-2px] w-[41px]">{text}</p>
    </div>
  );
}
type ContainerText4Props = {
  text: string;
};

function ContainerText4({ text }: ContainerText4Props) {
  return (
    <div className="h-[13.5px] relative shrink-0 w-full">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[13.5px] left-0 not-italic text-[#99a1af] text-[9px] top-[-2px] w-[40px]">{text}</p>
    </div>
  );
}
type ContainerText3Props = {
  text: string;
};

function ContainerText3({ text }: ContainerText3Props) {
  return (
    <div className="h-[13.5px] relative shrink-0 w-full">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[13.5px] left-0 not-italic text-[#99a1af] text-[9px] top-[-2px] w-[38px]">{text}</p>
    </div>
  );
}
type ContainerText2Props = {
  text: string;
};

function ContainerText2({ text }: ContainerText2Props) {
  return (
    <div className="content-stretch flex h-[16.5px] items-start relative shrink-0 w-full">
      <p className="font-['Arial:Bold',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[11px] text-nowrap text-white whitespace-pre">{text}</p>
    </div>
  );
}
type ContainerText1Props = {
  text: string;
};

function ContainerText1({ text }: ContainerText1Props) {
  return (
    <div className="h-[13.5px] relative shrink-0 w-full">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[13.5px] left-0 not-italic text-[#99a1af] text-[9px] top-[-2px] w-[37px]">{text}</p>
    </div>
  );
}
type TextText3Props = {
  text: string;
  additionalClassNames?: string;
};

function TextText3({ text, additionalClassNames = "" }: TextText3Props) {
  return (
    <div className={clsx("absolute h-[15px] left-[37.02px] w-[23.766px]", additionalClassNames)}>
      <p className="absolute font-['Arial:Bold',sans-serif] leading-[15px] left-0 not-italic text-[10px] text-white top-[-2px] w-[24px]">{text}</p>
    </div>
  );
}
type ContainerTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ContainerText({ text, additionalClassNames = "" }: ContainerTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex h-[13.5px] items-start top-[124.5px]", additionalClassNames)}>
      <p className="font-['Arial:Regular',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[#6a7282] text-[9px] text-nowrap whitespace-pre">{text}</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[14px] relative shrink-0 w-[55.016px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5.25px] items-center relative size-full">
        <div className="relative shrink-0 size-[12.25px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <g id="Icon">
              <path d={svgPaths.p120a9880} id="Vector" stroke="var(--stroke-0, #00BC7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
              <path d={svgPaths.p34035680} id="Vector_2" stroke="var(--stroke-0, #00BC7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </g>
          </svg>
        </div>
        <div className="basis-0 grow h-[14px] min-h-px min-w-px relative shrink-0">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
            <p className="absolute font-['Arial:Bold',sans-serif] leading-[14px] left-0 not-italic text-[#009966] text-[10.5px] top-[-1px] w-[38px]">{"+10.3%"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
type TextText2Props = {
  text: string;
};

function TextText2({ text }: TextText2Props) {
  return (
    <Wrapper3 additionalClassNames="h-[17.5px] w-[64.844px]">
      <p className="font-['Arial:Regular',sans-serif] leading-[17.5px] not-italic relative shrink-0 text-[#4a5565] text-[12.25px] text-nowrap whitespace-pre">{text}</p>
    </Wrapper3>
  );
}
type TextText1Props = {
  text: string;
};

function TextText1({ text }: TextText1Props) {
  return (
    <Wrapper2 additionalClassNames="w-[61.531px]">
      <p className="font-['Arial:Bold',sans-serif] leading-[17.5px] not-italic relative shrink-0 text-[#0f172b] text-[12.25px] text-nowrap whitespace-pre">{text}</p>
    </Wrapper2>
  );
}
type TextTextProps = {
  text: string;
};

function TextText({ text }: TextTextProps) {
  return (
    <Wrapper3 additionalClassNames="h-[15px] w-[104.156px]">
      <p className="font-['Arial:Bold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#62748e] text-[10px] text-nowrap tracking-[0.5px] uppercase whitespace-pre">{text}</p>
    </Wrapper3>
  );
}
type HeadingTextProps = {
  text: string;
};

function HeadingText({ text }: HeadingTextProps) {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[87.391px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Arial:Bold',sans-serif] leading-[17.5px] left-0 not-italic text-[#1e2939] text-[14px] text-nowrap top-[-2px] tracking-[-0.35px] whitespace-pre">{text}</p>
      </div>
    </div>
  );
}

export default function Container1() {
  return (
    <div className="bg-white border border-slate-200 border-solid relative rounded-[12.75px] size-full" data-name="Container">
      <div className="absolute content-stretch flex items-center justify-center left-[21px] top-[21px]" data-name="Heading 3">
        <p className="font-['Arial:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap whitespace-pre">Revenue by Product</p>
      </div>
      <div className="absolute bg-gray-100 border-[1.108px] border-gray-200 border-solid h-[37.197px] left-[1845px] rounded-[12.75px] top-[15px] w-[397.722px]" data-name="Container">
        <div className="absolute bg-[#eef7ff] h-[27.988px] left-[3.5px] rounded-[8.75px] top-[3.5px] w-[42.597px]" data-name="Button">
          <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[20.99px] not-italic text-[#1447e6] text-[12.25px] text-center text-nowrap top-[3.24px] translate-x-[-50%] whitespace-pre">All</p>
        </div>
        <div className="absolute h-[27.988px] left-[51.34px] rounded-[8.75px] top-[3.5px] w-[57.188px]" data-name="Button">
          <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[28.99px] not-italic text-[#4a5565] text-[12.25px] text-center text-nowrap top-[3.24px] translate-x-[-50%] whitespace-pre">Fixed</p>
        </div>
        <div className="absolute h-[27.988px] left-[113.77px] rounded-[8.75px] top-[3.5px] w-[66.881px]" data-name="Button">
          <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[33.49px] not-italic text-[#4a5565] text-[12.25px] text-center text-nowrap top-[3.24px] translate-x-[-50%] whitespace-pre">Mobile</p>
        </div>
        <div className="absolute h-[27.988px] left-[185.9px] rounded-[8.75px] top-[3.5px] w-[45.903px]" data-name="Button">
          <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[22.99px] not-italic text-[#4a5565] text-[12.25px] text-center text-nowrap top-[3.24px] translate-x-[-50%] whitespace-pre">ICT</p>
        </div>
        <div className="absolute h-[27.988px] left-[237.04px] rounded-[8.75px] top-[3.5px] w-[52.619px]" data-name="Button">
          <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[26.49px] not-italic text-[#4a5565] text-[12.25px] text-center text-nowrap top-[3.24px] translate-x-[-50%] whitespace-pre">SMS</p>
        </div>
        <div className="absolute h-[27.988px] left-[294.91px] rounded-[8.75px] top-[3.5px] w-[97.102px]" data-name="Button">
          <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[49.49px] not-italic text-[#4a5565] text-[12.25px] text-center text-nowrap top-[3.24px] translate-x-[-50%] whitespace-pre">Connectivity</p>
        </div>
      </div>
      <div className="absolute gap-[21px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[705px] left-[21px] top-[63px] w-[2223px]" data-name="Container">
        <Container2 additionalClassNames="[grid-area:1_/_1]">
          <CompanyDetailsPage>
            <div className="content-stretch flex gap-[10.5px] h-[45px] items-start relative shrink-0 w-full" data-name="Container">
              <Container3 additionalClassNames="bg-blue-50">
                <div className="h-[21px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                  <div className="absolute inset-[8.33%_20.83%]" data-name="Vector">
                    <div className="absolute inset-[-5%_-7.14%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 20">
                        <path d={svgPaths.p236dd070} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
                      </svg>
                    </div>
                  </div>
                  <Wrapper additionalClassNames="bottom-1/4 top-3/4">
                    <path d="M0.875 0.875H0.88375" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
                  </Wrapper>
                </div>
              </Container3>
              <Container5>
                <HeadingText text="Product Name" />
                <Container4>
                  <TextText text="Total Revenue YTD" />
                  <TextText1 text="1.8M OMR" />
                </Container4>
              </Container5>
            </div>
            <div className="content-stretch flex flex-col gap-[14px] h-[235.5px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="content-stretch flex h-[17.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
                <TextText2 text="YoY Growth" />
                <Container />
              </div>
              <div className="h-[204px] relative shrink-0 w-full" data-name="Container">
                <div className="absolute bg-[rgba(249,250,251,0.5)] border border-gray-200 border-solid h-[178.5px] left-0 rounded-[8.75px] top-0 w-[1057px]" data-name="Container">
                  <div className="absolute h-[138px] left-[7px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Jan" additionalClassNames="left-[42.19px] w-[13.422px]" />
                    <div className="absolute bg-purple-500 h-[112px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-0 w-[97.797px]" data-name="Container">
                      <TextText3 text="199K" additionalClassNames="top-[90px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText1 text="Jan 2024" />
                          <ContainerText2 text="199K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid size-[9.9px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[111.8px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Feb" additionalClassNames="left-[41.53px] w-[14.734px]" />
                    <div className="absolute bg-purple-500 h-[98.406px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[13.59px] w-[97.797px]" data-name="Container">
                      <TextText3 text="175K" additionalClassNames="top-[76.41px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText3 text="Feb 2024" />
                          <ContainerText2 text="175K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid size-[9.9px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[216.59px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Mar" additionalClassNames="left-[40.72px] w-[16.359px]" />
                    <div className="absolute bg-purple-500 h-[89.734px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[22.27px] w-[97.797px]" data-name="Container">
                      <TextText3 text="160K" additionalClassNames="top-[67.73px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText4 text="Mar 2024" />
                          <ContainerText2 text="160K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[321.39px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Apr" additionalClassNames="left-[41.5px] w-[14.797px]" />
                    <div className="absolute bg-purple-500 h-[88.547px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[23.45px] w-[97.797px]" data-name="Container">
                      <TextText3 text="158K" additionalClassNames="top-[66.55px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText3 text="Apr 2024" />
                          <ContainerText2 text="158K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[426.19px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="May" additionalClassNames="left-[40.09px] w-[17.594px]" />
                    <div className="absolute bg-purple-500 h-[89.688px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[22.31px] w-[97.797px]" data-name="Container">
                      <TextText3 text="160K" additionalClassNames="top-[67.69px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText5 text="May 2024" />
                          <ContainerText2 text="160K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid size-[9.9px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[530.98px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Jun" additionalClassNames="left-[41.86px] w-[14.078px]" />
                    <div className="absolute bg-purple-500 h-[104.031px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[7.97px] w-[97.797px]" data-name="Container">
                      <TextText3 text="185K" additionalClassNames="top-[82.03px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText1 text="Jun 2024" />
                          <ContainerText2 text="185K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid size-[9.9px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[635.78px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Jul" additionalClassNames="left-[43.31px] w-[11.172px]" />
                    <div className="absolute bg-purple-500 h-[84.719px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[27.28px] w-[97.797px]" data-name="Container">
                      <TextText3 text="151K" additionalClassNames="top-[62.72px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText6 text="Jul 2024" />
                          <ContainerText2 text="151K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid size-[9.9px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[740.58px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Aug" additionalClassNames="left-[40.53px] w-[16.719px]" />
                    <div className="absolute bg-purple-500 h-[89.875px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[22.13px] w-[97.797px]" data-name="Container">
                      <TextText3 text="160K" additionalClassNames="top-[67.88px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText4 text="Aug 2024" />
                          <ContainerText2 text="160K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid size-[9.9px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[845.38px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Sep" additionalClassNames="left-[41.34px] w-[15.109px]" />
                    <div className="absolute bg-purple-500 h-[83.328px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[28.67px] w-[97.797px]" data-name="Container">
                      <TextText3 text="148K" additionalClassNames="top-[61.33px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText3 text="Sep 2024" />
                          <ContainerText2 text="148K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid size-[9.9px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[950.17px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Oct" additionalClassNames="left-[41.75px] w-[14.297px]" />
                    <div className="absolute bg-purple-500 h-[84.672px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[27.33px] w-[97.797px]" data-name="Container">
                      <TextText3 text="151K" additionalClassNames="top-[62.67px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText1 text="Oct 2024" />
                          <ContainerText2 text="151K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute content-stretch flex gap-[5.25px] h-[15px] items-center left-[490.59px] top-[189px] w-[75.797px]" data-name="Container">
                  <div className="bg-purple-500 relative rounded-[4.75px] shrink-0 size-[8.75px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
                  </div>
                  <TextText4 text="2024 Revenue" />
                </div>
              </div>
            </div>
          </CompanyDetailsPage>
        </Container2>
        <Container2 additionalClassNames="[grid-area:1_/_2]">
          <CompanyDetailsPage>
            <div className="content-stretch flex gap-[10.5px] h-[45px] items-start relative shrink-0 w-full" data-name="Container">
              <Container3 additionalClassNames="bg-purple-50">
                <div className="h-[21px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                  <Wrapper additionalClassNames="bottom-[16.67%] top-[83.33%]">
                    <path d="M0.875 0.875H0.88375" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
                  </Wrapper>
                  <div className="absolute inset-[20.83%_8.33%_63.25%_8.33%]" data-name="Vector">
                    <div className="absolute inset-[-26.18%_-5%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 6">
                        <path d={svgPaths.p30289340} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-[41.67%_20.83%_46.42%_20.83%]" data-name="Vector">
                    <div className="absolute inset-[-34.98%_-7.14%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 5">
                        <path d={svgPaths.p2d2d0b80} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-[62.5%_35.42%_31.55%_35.42%]" data-name="Vector">
                    <div className="absolute inset-[-69.96%_-14.29%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 3">
                        <path d={svgPaths.p3669e200} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Container3>
              <Container5>
                <HeadingText text="Product Name" />
                <Container4>
                  <TextText text="Total Revenue YTD" />
                  <TextText1 text="2.4M OMR" />
                </Container4>
              </Container5>
            </div>
            <div className="content-stretch flex flex-col gap-[14px] h-[235.5px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="content-stretch flex h-[17.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
                <TextText2 text="YoY Growth" />
                <Container />
              </div>
              <div className="h-[204px] relative shrink-0 w-full" data-name="Container">
                <div className="absolute bg-[rgba(249,250,251,0.5)] border border-gray-200 border-solid h-[178.5px] left-0 rounded-[8.75px] top-0 w-[1057px]" data-name="Container">
                  <div className="absolute h-[138px] left-[7px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Jan" additionalClassNames="left-[42.19px] w-[13.422px]" />
                    <div className="absolute bg-cyan-500 h-[82.547px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[29.45px] w-[97.797px]" data-name="Container">
                      <TextText3 text="209K" additionalClassNames="top-[60.55px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText1 text="Jan 2024" />
                          <ContainerText2 text="209K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[111.8px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Feb" additionalClassNames="left-[41.53px] w-[14.734px]" />
                    <div className="absolute bg-cyan-500 h-[77.875px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[34.13px] w-[97.797px]" data-name="Container">
                      <TextText3 text="197K" additionalClassNames="top-[55.88px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText3 text="Feb 2024" />
                          <ContainerText2 text="197K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[216.59px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Mar" additionalClassNames="left-[40.72px] w-[16.359px]" />
                    <div className="absolute bg-cyan-500 h-[112px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-0 w-[97.797px]" data-name="Container">
                      <TextText3 text="283K" additionalClassNames="top-[90px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText4 text="Mar 2024" />
                          <ContainerText2 text="283K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[321.39px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Apr" additionalClassNames="left-[41.5px] w-[14.797px]" />
                    <div className="absolute bg-cyan-500 h-[79.281px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[32.72px] w-[97.797px]" data-name="Container">
                      <TextText3 text="201K" additionalClassNames="top-[57.28px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText3 text="Apr 2024" />
                          <ContainerText2 text="201K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[426.19px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="May" additionalClassNames="left-[40.09px] w-[17.594px]" />
                    <div className="absolute bg-cyan-500 h-[90.109px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[21.89px] w-[97.797px]" data-name="Container">
                      <TextText3 text="228K" additionalClassNames="top-[68.11px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText5 text="May 2024" />
                          <ContainerText2 text="228K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[530.98px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Jun" additionalClassNames="left-[41.86px] w-[14.078px]" />
                    <div className="absolute bg-cyan-500 h-[107.859px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[4.14px] w-[97.797px]" data-name="Container">
                      <TextText3 text="273K" additionalClassNames="top-[85.86px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText1 text="Jun 2024" />
                          <ContainerText2 text="273K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[635.78px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Jul" additionalClassNames="left-[43.31px] w-[11.172px]" />
                    <div className="absolute bg-cyan-500 h-[98.734px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[13.27px] w-[97.797px]" data-name="Container">
                      <TextText3 text="250K" additionalClassNames="top-[76.73px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText6 text="Jul 2024" />
                          <ContainerText2 text="250K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[740.58px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Aug" additionalClassNames="left-[40.53px] w-[16.719px]" />
                    <div className="absolute bg-cyan-500 h-[86.125px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[25.88px] w-[97.797px]" data-name="Container">
                      <TextText3 text="218K" additionalClassNames="top-[64.13px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText4 text="Aug 2024" />
                          <ContainerText2 text="218K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[845.38px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Sep" additionalClassNames="left-[41.34px] w-[15.109px]" />
                    <div className="absolute bg-cyan-500 h-[105.25px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[6.75px] w-[97.797px]" data-name="Container">
                      <TextText3 text="266K" additionalClassNames="top-[83.25px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText3 text="Sep 2024" />
                          <ContainerText2 text="266K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[950.17px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Oct" additionalClassNames="left-[41.75px] w-[14.297px]" />
                    <div className="absolute bg-cyan-500 h-[110.281px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[1.72px] w-[97.797px]" data-name="Container">
                      <TextText3 text="279K" additionalClassNames="top-[88.28px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText1 text="Oct 2024" />
                          <ContainerText2 text="279K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute content-stretch flex gap-[5.25px] h-[15px] items-center left-[490.59px] top-[189px] w-[75.797px]" data-name="Container">
                  <div className="bg-cyan-500 relative rounded-[4.75px] shrink-0 size-[8.75px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
                  </div>
                  <TextText4 text="2024 Revenue" />
                </div>
              </div>
            </div>
          </CompanyDetailsPage>
        </Container2>
        <Container2 additionalClassNames="[grid-area:2_/_1]">
          <CompanyDetailsPage>
            <div className="content-stretch flex gap-[10.5px] h-[45px] items-start relative shrink-0 w-full" data-name="Container">
              <Container3 additionalClassNames="bg-emerald-50">
                <div className="h-[21px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                  <Icon4Vector additionalClassNames="inset-[8.33%_8.33%_58.33%_8.33%]" />
                  <Icon4Vector additionalClassNames="inset-[58.33%_8.33%_8.33%_8.33%]" />
                  <Icon4Vector1 additionalClassNames="bottom-3/4 top-1/4" />
                  <Icon4Vector1 additionalClassNames="bottom-1/4 top-3/4" />
                </div>
              </Container3>
              <Container5>
                <HeadingText text="Product Name" />
                <Container4>
                  <TextText text="Total Revenue YTD" />
                  <TextText1 text="2.9M OMR" />
                </Container4>
              </Container5>
            </div>
            <div className="content-stretch flex flex-col gap-[14px] h-[235.5px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="content-stretch flex h-[17.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
                <TextText2 text="YoY Growth" />
                <Container />
              </div>
              <div className="h-[204px] relative shrink-0 w-full" data-name="Container">
                <div className="absolute bg-[rgba(249,250,251,0.5)] border border-gray-200 border-solid h-[178.5px] left-0 rounded-[8.75px] top-0 w-[1057px]" data-name="Container">
                  <div className="absolute h-[138px] left-[7px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Jan" additionalClassNames="left-[42.19px] w-[13.422px]" />
                    <div className="absolute bg-indigo-500 h-[92.422px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[19.58px] w-[97.797px]" data-name="Container">
                      <TextText3 text="275K" additionalClassNames="top-[70.42px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText1 text="Jan 2024" />
                          <ContainerText2 text="275K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid size-[9.9px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[111.8px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Feb" additionalClassNames="left-[41.53px] w-[14.734px]" />
                    <div className="absolute bg-indigo-500 h-[101.031px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[10.97px] w-[97.797px]" data-name="Container">
                      <TextText3 text="301K" additionalClassNames="top-[79.03px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText3 text="Feb 2024" />
                          <ContainerText2 text="301K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid size-[9.9px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[216.59px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Mar" additionalClassNames="left-[40.72px] w-[16.359px]" />
                    <div className="absolute bg-indigo-500 h-[98.516px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[13.48px] w-[97.797px]" data-name="Container">
                      <TextText3 text="294K" additionalClassNames="top-[76.52px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText4 text="Mar 2024" />
                          <ContainerText2 text="294K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[321.39px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Apr" additionalClassNames="left-[41.5px] w-[14.797px]" />
                    <div className="absolute bg-indigo-500 h-[81.828px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[30.17px] w-[97.797px]" data-name="Container">
                      <TextText3 text="244K" additionalClassNames="top-[59.83px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText3 text="Apr 2024" />
                          <ContainerText2 text="244K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[426.19px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="May" additionalClassNames="left-[40.09px] w-[17.594px]" />
                    <div className="absolute bg-indigo-500 h-[110.5px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[1.5px] w-[97.797px]" data-name="Container">
                      <TextText3 text="329K" additionalClassNames="top-[88.5px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText5 text="May 2024" />
                          <ContainerText2 text="329K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid size-[9.9px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[530.98px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Jun" additionalClassNames="left-[41.86px] w-[14.078px]" />
                    <div className="absolute bg-indigo-500 h-[84.281px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[27.72px] w-[97.797px]" data-name="Container">
                      <TextText3 text="251K" additionalClassNames="top-[62.28px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText1 text="Jun 2024" />
                          <ContainerText2 text="251K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid size-[9.9px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[635.78px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Jul" additionalClassNames="left-[43.31px] w-[11.172px]" />
                    <div className="absolute bg-indigo-500 h-[100.109px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[11.89px] w-[97.797px]" data-name="Container">
                      <TextText3 text="298K" additionalClassNames="top-[78.11px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText6 text="Jul 2024" />
                          <ContainerText2 text="298K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid size-[9.9px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[740.58px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Aug" additionalClassNames="left-[40.53px] w-[16.719px]" />
                    <div className="absolute bg-indigo-500 h-[82.734px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[29.27px] w-[97.797px]" data-name="Container">
                      <TextText3 text="247K" additionalClassNames="top-[60.73px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText4 text="Aug 2024" />
                          <ContainerText2 text="247K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid size-[9.9px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[845.38px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Sep" additionalClassNames="left-[41.34px] w-[15.109px]" />
                    <div className="absolute bg-indigo-500 h-[112px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-0 w-[97.797px]" data-name="Container">
                      <TextText3 text="334K" additionalClassNames="top-[90px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText3 text="Sep 2024" />
                          <ContainerText2 text="334K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid size-[9.9px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-[138px] left-[950.17px] top-[31.5px] w-[97.797px]" data-name="Container">
                    <div className="absolute bg-[#d1d5dc] h-[2px] left-0 rounded-[3.35544e+07px] top-[117.25px] w-[97.797px]" data-name="Container" />
                    <ContainerText text="Oct" additionalClassNames="left-[41.75px] w-[14.297px]" />
                    <div className="absolute bg-indigo-500 h-[102.891px] left-0 rounded-tl-[4px] rounded-tr-[4px] top-[9.11px] w-[97.797px]" data-name="Container">
                      <TextText3 text="307K" additionalClassNames="top-[80.89px]" />
                      <div className="absolute h-[44.25px] left-[11.53px] opacity-0 top-[-49px] w-[74.719px]" data-name="Container">
                        <div className="absolute bg-[#101828] content-stretch flex flex-col gap-[1.75px] h-[44.25px] items-start left-0 pb-px pt-[6.25px] px-[9.75px] rounded-[8.75px] top-0 w-[74.719px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8.75px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                          <ContainerText1 text="Oct 2024" />
                          <ContainerText2 text="307K OMR" />
                        </div>
                        <Wrapper5>
                          <div className="bg-[#101828] border-[#364153] border-[0px_1px_1px_0px] border-solid h-[9.9px] w-[9.899px]" data-name="Container" />
                        </Wrapper5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute content-stretch flex gap-[5.25px] h-[15px] items-center left-[490.59px] top-[189px] w-[75.797px]" data-name="Container">
                  <div className="bg-indigo-500 relative rounded-[4.75px] shrink-0 size-[8.75px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
                  </div>
                  <TextText4 text="2024 Revenue" />
                </div>
              </div>
            </div>
          </CompanyDetailsPage>
        </Container2>
      </div>
    </div>
  );
}