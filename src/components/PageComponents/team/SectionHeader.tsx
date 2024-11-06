interface Props {
  title: string;
  length?: string;
  addText?: string;
  onAddClick?: () => void;
}

export default function SectionHeader({
  title,
  length,
  addText,
  onAddClick = () => {},
}: Props) {
  return (
    <div className="flex cursor-default items-center justify-between">
      <div className="flex gap-2">
        <span className="text-text-lg font-medium text-text-primary">
          {title}
        </span>
        {length ? (
          <span className="text-text-lg font-regular text-text-default">{`(${length})`}</span>
        ) : null}
      </div>
      {addText ? (
        <p
          className="cursor-pointer text-text-md font-regular text-brand-primary"
          onClick={onAddClick}
        >
          {addText}
        </p>
      ) : null}
    </div>
  );
}
