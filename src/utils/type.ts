import { Hex, TypedData } from "viem"

export interface PermitDetails {
    token: Hex
    amount: bigint
    expiration: bigint
    nonce: bigint
}

export interface PermitBatch {
    details: PermitDetails[]
    spender: Hex
    sigDeadline: bigint
}

export type PermitBatchData = {
    domain: TypedDataDomain
    types: Record<string, TypedDataField[]>
    values: PermitBatch
}

export interface TypedDataDomain {
    name: string;
    chainId: number;
    verifyingContract: Hex;
};

export interface TypedDataField {
    name: string;
    type: string;
};

export interface TokenPermissions {
    token: Hex
    amount: bigint
}

export interface PermitBatchTransferFrom {
    permitted: TokenPermissions[]
    spender: Hex
    nonce: bigint
    deadline: bigint
}

export type PermitBatchTransferFromData = {
    domain: TypedDataDomain
    types: TypedData
    values: PermitBatchTransferFrom
}


export const PERMIT_DETAILS = [
    { name: 'token', type: 'address' },
    { name: 'amount', type: 'uint160' },
    { name: 'expiration', type: 'uint48' },
    { name: 'nonce', type: 'uint48' },
]

export const PERMIT_BATCH_TYPES = {
    PermitBatch: [
        { name: 'details', type: 'PermitDetails[]' },
        { name: 'spender', type: 'address' },
        { name: 'sigDeadline', type: 'uint256' },
    ],
    PermitDetails: PERMIT_DETAILS,
}

