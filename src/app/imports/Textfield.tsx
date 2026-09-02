export default function Textfield() {
  return (
    <div className="relative rounded-[29px] size-full" data-name="Textfield">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start overflow-clip px-3 py-1 relative size-full">
          <div
            className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#0066ff] text-[14px] text-left text-nowrap"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="block leading-[1.2] whitespace-pre">50%</p>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[rgba(0,85,255,0.2)] border-solid inset-0 pointer-events-none rounded-[29px]"
      />
    </div>
  );
}