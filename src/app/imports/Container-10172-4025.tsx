function RevenueMatrix() {
  return (
    <div className="h-[12.185px] relative shrink-0 w-[55.001px]" data-name="RevenueMatrix">
      <p className="absolute font-['Roboto:Regular',sans-serif] font-normal leading-[16.5px] left-0 text-[11px] text-black top-[-2px] w-[54px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Target: 4M
      </p>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[rgba(59,130,246,0.15)] relative rounded-[4px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(59,130,246,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[8px] relative size-full">
          <RevenueMatrix />
        </div>
      </div>
    </div>
  );
}