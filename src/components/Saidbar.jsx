import ThemeToggle from "./ThemeToggle";

function Saidbar() {
  return (
    <>
      <div className="flex w-full h-20  justify-between items-center bg-[rgba(55,59,83,1)] lg:rounded-tr-[20px] lg:rounded-br-[20px] fixed right-0 left-0 top-0 bottom-0 z-50 lg:w-[103px] lg:h-[100vh]  lg:flex-col">
        <img
          className="w-20 h-20 lg:w-[103px] lg:h-[103px] cursor-pointer"
          src="/Logo.png"
          alt=""
        />

        <div className="flex lg:flex-col items-center gap-6 lg:gap-6 lg:mb-6">
          <ThemeToggle />

          <hr className="hidden lg:block w-[103px] border-none h-[1px] bg-[#494E6E]" />
          <span className="w-[1px] h-20 bg-[#494E6E] lg:hidden"></span>

          <img
            className="w-10 h-10 mr-6 lg:w-16 lg:h-16 mx-auto rounded-full"
            src="/Account.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
export default Saidbar;
