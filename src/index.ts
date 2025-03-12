import { getPermitBatchSignature, strToBigInt } from "./utils/helper";
import { ZERO, MAX_UINT_256, MAX_UINT_48 } from "./utils/constant";

const dataToSign = getPermitBatchSignature(
    "0xE91C6BeAD217558Ab07038E1CEC8EaCa4bB59b31", // spender address
    MAX_UINT_256, // sigDeadline
    ["0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0"], // token list
    [strToBigInt("5000000000000000000")], // amount list
    [MAX_UINT_48], // expiration list
    [ZERO], // nonce list
)