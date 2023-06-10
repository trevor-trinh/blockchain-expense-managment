const IdCard = ({ src }) => {
  return (
    <div class="relative z-50">
      <img src={src} alt="Card" className="w-[24rem] rounded-md" />
      <img
        src={'images/Bitcoinfloaty.png'}
        alt="Bitcoin Floaty"
        className="w-[16rem] rounded-md absolute inset-0 left-24 bottom-16"
      />
    </div>
  );
};

export default IdCard;
