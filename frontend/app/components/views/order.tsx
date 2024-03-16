import TokenPair from "../token-pair";

const Order = () => {
  return (
    <>
      <h1 className="font-semibold text-2xl mb-2 text-center">Place an order</h1>
      <TokenPair type={"swap"} />
    </>
  );
};
export default Order;
