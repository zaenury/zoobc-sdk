import { writeInt64, writeInt32, getZBCAddress, readInt64 } from '../utils';
import { ADDRESS_LENGTH, VERSION } from './constant';
import { BIP32Interface } from 'bip32';

const TRANSACTION_TYPE = new Buffer([2, 0, 0, 0]);

export interface RegisterNodeInterface {
  accountAddress: string;
  fee: number;
  nodePublicKey: Buffer;
  nodeAddress: string;
  funds: number;
}

export function registerNodeBuilder(data: RegisterNodeInterface, poown: Buffer, seed?: BIP32Interface): Buffer {
  let bytes: Buffer;

  const timestamp = writeInt64(Math.trunc(Date.now() / 1000));
  const accountAddress = Buffer.from(data.accountAddress, 'utf-8');
  const recipient = new Buffer(ADDRESS_LENGTH);
  const addressLength = writeInt32(ADDRESS_LENGTH);
  const fee = writeInt64(data.fee * 1e8);

  const nodePublicKey = data.nodePublicKey;
  const funds = writeInt64(data.funds * 1e8);
  const bodyLength = writeInt32(nodePublicKey.length + addressLength.length + accountAddress.length + funds.length + poown.length);

  bytes = Buffer.concat([
    TRANSACTION_TYPE,
    VERSION,
    timestamp,
    addressLength,
    accountAddress,
    addressLength,
    recipient,
    fee,
    bodyLength,
    nodePublicKey,
    addressLength,
    accountAddress,
    funds,
    poown,
  ]);

  // ========== NULLIFYING THE ESCROW ===========
  const approverAddressLength = writeInt32(0);
  const commission = writeInt64(0);
  const timeout = writeInt64(0);
  const instructionLength = writeInt32(0);

  bytes = Buffer.concat([bytes, approverAddressLength, commission, timeout, instructionLength]);
  // ========== END NULLIFYING THE ESCROW =========

  if (seed) {
    const signatureType = writeInt32(0);
    const signature = seed.sign(bytes);
    const bodyLengthSignature = writeInt32(signatureType.length + signature.length);
    return Buffer.concat([bytes, bodyLengthSignature, signatureType, signature]);
  } else return bytes;
}

export function readNodeRegistrationBytes(txBytes: Buffer) {
  const bodyBytesRegisterNodeLength = txBytes.slice(161, 165).readInt32LE(0);
  const bodyBytesRegister = txBytes.slice(165, 165 + bodyBytesRegisterNodeLength);
  const pubkeyRegister = bodyBytesRegister.slice(0, 32);
  const accountaddress = bodyBytesRegister.slice(36, 102);
  const lockedBalance = bodyBytesRegister.slice(102, 110);
  const txBody = {
    nodepublickey: getZBCAddress(pubkeyRegister, 'ZNK'),
    accountaddress: accountaddress.toString(),
    lockedbalance: readInt64(lockedBalance, 0),
  };
  return txBody;
}
