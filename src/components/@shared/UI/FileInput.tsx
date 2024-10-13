import { ChangeEvent, LabelHTMLAttributes } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  value: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

// FileInput 컴포넌트는 value, onInputChange 프롭을 쥐어주고 Children을 감싸서 만들어주면 됩니다.
// 필요한 value, onInputChange는 useImageUpload 훅에서 fileInputValue, handleFileInputChange를 받아서 내려줍니다.
// 이외의 프롭들로는 label의 속성을 사용할 수 있습니다. label 자체에 className을 할당하는 식으로 사용할 수 있습니다.

export default function FileInput({
  value,
  onInputChange,
  children,
  ...props
}: Props) {
  return (
    <label {...props}>
      {children}
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        value={value}
        onChange={onInputChange}
      />
    </label>
  );
}
