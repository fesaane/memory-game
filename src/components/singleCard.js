const SingleCard = ({ card, handleChoise, flipped, disabled, hidecard }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoise(card);
    }
  };
  return (
    <div
      className={
        "relative flex text-center items-center justify-center " +
        (hidecard ? "hidecard" : "")
      }
    >
      <div className={"card rounded-md " + (flipped ? "flipped" : "")}>
        <img
          className="shadow-lg  ease-in duration-200 absolute bg-white rotate-y-90 inset-0 w-[100px] h-[100px]"
          src={card.src}
        />
        <div
          className="shadow-lg  delay-200 ease-in duration-200  back w-[100px] h-[100px] cursor-pointer bg-gradient-to-r 
          from-blue-400 
          to-orange-500 
          via-purple-500
          animate-gradient-x"
          onClick={handleClick}
        ></div>
      </div>
    </div>
  );
};
export default SingleCard;
