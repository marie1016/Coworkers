import SetupHeader from "@/components/@shared/UI/SetupHeader";
import InputLabel from "@/components/@shared/UI/InputLabel";
import Input from "@/components/@shared/UI/Input";
import Button from "@/components/@shared/UI/Button";

export default function ResetPassword() {
  return (
    <div>
      <SetupHeader />
      <div className="mt-[160px] flex w-full items-center justify-center sm:mt-[84px]">
        <form className="flex flex-col items-center gap-6 sm:w-[343px]">
          <h2 className="text-2xl text-text-primary">비밀번호 재설정</h2>
          <InputLabel label="새 비밀번호" className="text-lg text-text-primary">
            <Input
              name="password"
              type="email"
              className="h-[48px] gap-2.5 px-4 py-2.5 sm:h-[44px] sm:w-[343px]"
              placeholder="비밀번호 (영문, 숫자 포함, 12자 이내)를 입력해주세요."
            />
          </InputLabel>
          <InputLabel
            label="비밀번호 확인"
            className="text-lg text-text-primary"
          >
            <div className="relative w-full items-center">
              <Input
                name="confirmPassword"
                className="h-[48px] gap-2.5 px-4 py-2.5 sm:h-[44px] sm:w-[343px]"
                placeholder="새 비밀번호를 다시 한번 입력해주세요."
                buttonClassName="absolute top-1/2 transform -translate-y-1/2 right-3"
              />
            </div>
          </InputLabel>

          <Button variant="solid" size="large" className="mt-4">
            재설정
          </Button>
        </form>
      </div>
    </div>
  );
}
