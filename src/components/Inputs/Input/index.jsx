import Icon from "../../Icon";

const Input = ({ value, onChange,newChange, error, name, icon, hint, label, placeholder, type,className, ...rest }) => {


  return (
    <label className="flex flex-col">
      {label && <span className="text-[#ABABB0] text-2xl">{label}</span>}
      <div className="relative py-[0px] w-full flex gap-[8px] items-center">
        <input
          className={`peer relative h-[50px] placeholder:text-white/30 text-[18px] text-white bg-transparent border border-white/10 rounded-[8px]  px-2  w-full focus:shadow-none ${className} `}
          type="text"
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          {...rest}
        />
        {error && <Icon name="alert-error" className="!w-[18px] !h-[18px] !text-red" />}
        {/*{hint && (*/}
        {/*  <Hint text={hint}>*/}
        {/*    <Icon name="question" className="!w-[18px] !h-[18px]" />*/}
        {/*  </Hint>*/}
        {/*)}*/}
        {icon && (typeof icon === "string" ? <Icon name={icon} className="!w-[18px] absolute right-0 !h-[12px]" /> : icon)}
        <div
          className={
            "absolute inset-0 border-gray peer-focus:border-[#FFF4F3] peer-focus:shadow-input -z-10 duration-200" +
            (error ? " peer-focus:shadow-input-invalid" : "")
          }
        />
      </div>
      {error && <span className="text-[14px] text-red">{error}</span>}
    </label>
  );
};


export default Input;
