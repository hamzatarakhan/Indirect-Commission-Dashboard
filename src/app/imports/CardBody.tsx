export default function CardBody() {
  return (
    <div className="bg-[#fff8e6] relative rounded-[4px] size-full" data-name="Card body">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col font-['Roboto:Medium',_sans-serif] font-medium gap-[4px] items-center justify-center leading-[1.2] px-[16px] py-[24px] relative size-full text-nowrap whitespace-pre">
          <p className="relative shrink-0 text-[#ffb500] text-[17px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
            5.46M
          </p>
          <p className="relative shrink-0 text-[#ffc433] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Revenue from Fixed Services
          </p>
        </div>
      </div>
    </div>
  );
}