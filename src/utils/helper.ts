import {
    Hex,
    hashTypedData,
    parseUnits
} from "viem"

import {
    PermitDetails,
    PermitBatch, PermitBatchData, PERMIT_BATCH_TYPES, TypedDataDomain
} from "./type";

import { PERMIT2_DOMAIN_NAME, PERMIT2_ADDRESS, MAINNET_CHAIN_ID } from "./constant";


export const getPermitData = (
    permit: PermitBatch,
    permit2Address: Hex,
    chainId: number
): PermitBatchData => {

    const domain = permit2Domain(permit2Address, chainId);

    return {
        domain,
        types: PERMIT_BATCH_TYPES,
        values: permit
    }

}


export function permit2Domain(permit2Address: Hex, chainId: number): TypedDataDomain {
    return {
        name: PERMIT2_DOMAIN_NAME,
        chainId,
        verifyingContract: permit2Address,
    }
}

export const getPermitBatchSignature = (spender: Hex, sigDeadline: bigint, tokens: Hex[], amounts: bigint[], expirations: bigint[], nonces: bigint[]) => {
    const details: PermitDetails[] = [];

    tokens.forEach((token, index) => {
        const permitDetails: PermitDetails = {
            token,
            amount: amounts[index],
            expiration: expirations[index],
            nonce: nonces[index]
        };

        details.push(permitDetails);
    });

    const permitBatch: PermitBatch = {
        details,
        spender,
        sigDeadline
    }

    const {
        domain,
        types,
        values
    } = getPermitData(permitBatch, PERMIT2_ADDRESS, MAINNET_CHAIN_ID);

    return hashTypedData({
        domain,
        types,
        primaryType: "PermitBatch",
        message: { ...values }
    })
}



export const strToBigInt = (value: string) => {
    return parseUnits(value, 0);
}

