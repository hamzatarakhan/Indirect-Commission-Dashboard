import svgPaths from "./svg-tp70icpswy";

function Group() {
  return (
    <div className="absolute contents inset-[12.5%_8.33%]" data-name="Group">
      <div className="absolute inset-[37.5%_8.33%_45.83%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-25%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 4">
            <path d={svgPaths.p3ab203c0} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.5%_33.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
            <path d={svgPaths.p17bf7080} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_45.83%_54.17%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d={svgPaths.p3ca63380} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group />
    </div>
  );
}

function UserIconSvg() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[14px] top-[1.75px]" data-name="UserIconSVG">
      <Icon />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[17.5px] items-start left-[24.5px] top-0 w-[143.891px]" data-name="Text">
      <p className="font-['Arial:Bold',_sans-serif] leading-[17.5px] not-italic relative shrink-0 text-[#101828] text-[12.25px] text-nowrap whitespace-pre">Senior Manager Overview</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[17.5px] left-[21px] top-[calc(50%+0.344px)] translate-y-[-50%] w-[645.328px]" data-name="Container">
      <UserIconSvg />
      <Text />
    </div>
  );
}

function Icon1() {
  return (
    <div className="basis-0 grow h-[12.25px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[12.25px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute inset-[8.33%_8.27%_50%_8.35%]" data-name="Vector">
          <div className="absolute inset-[-10%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
              <path d={svgPaths.paa63700} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[29.18%] left-[8.33%] right-[8.33%] top-1/2" data-name="Vector">
          <div className="absolute inset-[-20.01%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 5">
              <path d={svgPaths.p13a5b380} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[70.83%_8.33%_8.34%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-20.01%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 5">
              <path d={svgPaths.p13a5b380} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountManagerCsatCard() {
  return (
    <div className="h-[14px] relative shrink-0 w-[6.047px]" data-name="AccountManagerCSATCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[14px] items-start relative w-[6.047px]">
        <p className="font-['Arial:Bold',_sans-serif] leading-[14px] not-italic relative shrink-0 text-[#101828] text-[10.5px] text-nowrap whitespace-pre">8</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[14px] relative shrink-0 w-[20.047px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[1.75px] h-[14px] items-center relative w-[20.047px]">
        <Icon1 />
        <AccountManagerCsatCard />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#d1d5dc] h-[14px] relative shrink-0 w-px" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] w-px" />
    </div>
  );
}

function Icon2() {
  return (
    <div className="basis-0 grow h-[12.25px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[12.25px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute bottom-[8.33%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-5%_-8.33%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 12">
              <path d={svgPaths.p2ce4adc0} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-[8.33%] right-3/4 top-1/2" data-name="Vector">
          <div className="absolute inset-[-10%_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 7">
              <path d={svgPaths.p216e1180} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-3/4 right-[8.33%] top-[37.5%]" data-name="Vector">
          <div className="absolute inset-[-7.69%_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 9">
              <path d={svgPaths.p38afd500} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-3/4 left-[41.67%] right-[41.67%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-0.51px_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
              <path d="M1 1H3.04167" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[41.67%_41.67%_58.33%_41.67%]" data-name="Vector">
          <div className="absolute inset-[-0.51px_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
              <path d="M1 1H3.04167" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[58.33%_41.67%_41.67%_41.67%]" data-name="Vector">
          <div className="absolute inset-[-0.51px_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
              <path d="M1 1H3.04167" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/4 left-[41.67%] right-[41.67%] top-3/4" data-name="Vector">
          <div className="absolute inset-[-0.51px_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
              <path d="M1 1H3.04167" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountManagerCsatCard1() {
  return (
    <div className="h-[14px] relative shrink-0 w-[12.094px]" data-name="AccountManagerCSATCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[14px] items-start relative w-[12.094px]">
        <p className="font-['Arial:Bold',_sans-serif] leading-[14px] not-italic relative shrink-0 text-[#101828] text-[10.5px] text-nowrap whitespace-pre">87</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[14px] relative shrink-0 w-[26.094px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[1.75px] h-[14px] items-center relative w-[26.094px]">
        <Icon2 />
        <AccountManagerCsatCard1 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="basis-0 grow h-[12.25px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[12.25px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute inset-[62.5%_33.33%_12.5%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-16.67%_-7.14%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5">
              <path d={svgPaths.p282d5200} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[13.03%_20.85%_54.7%_66.67%]" data-name="Vector">
          <div className="absolute inset-[-12.92%_-33.38%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 6">
              <path d={svgPaths.p325702c0} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[63.04%_8.33%_12.5%_79.17%]" data-name="Vector">
          <div className="absolute inset-[-17.04%_-33.33%_-17.04%_-33.34%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 5">
              <path d={svgPaths.p32e0be80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[12.5%_45.83%_54.17%_20.83%]" data-name="Vector">
          <div className="absolute inset-[-12.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
              <path d={svgPaths.p33930070} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountManagerCsatCard2() {
  return (
    <div className="h-[14px] relative shrink-0 w-[12.094px]" data-name="AccountManagerCSATCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[14px] items-start relative w-[12.094px]">
        <p className="font-['Arial:Bold',_sans-serif] leading-[14px] not-italic relative shrink-0 text-[#101828] text-[10.5px] text-nowrap whitespace-pre">24</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="basis-0 grow h-[14px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[1.75px] h-[14px] items-center relative w-full">
        <Icon3 />
        <AccountManagerCsatCard2 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex gap-[8.75px] h-[14px] items-center left-[557.09px] top-[calc(50%-0.406px)] translate-y-[-50%] w-[109.234px]" data-name="Container">
      <Container1 />
      <Container2 />
      <Container3 />
      <Container2 />
      <Container5 />
    </div>
  );
}

function AccountManagerCsatCard3() {
  return (
    <div className="h-[94px] relative shrink-0 w-full" data-name="AccountManagerCSATCard">
      <Container />
      <Container6 />
    </div>
  );
}

export default function Container7() {
  return (
    <div className="bg-[rgba(239,246,255,0.4)] relative rounded-[8.75px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(190,219,255,0.5)] border-solid inset-0 pointer-events-none rounded-[8.75px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center p-[2px] relative size-full">
          <AccountManagerCsatCard3 />
        </div>
      </div>
    </div>
  );
}