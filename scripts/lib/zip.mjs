// Minimal zero-dependency ZIP reader/writer.
// A .docx file is a ZIP archive, so this is all we need to read and write them.

import zlib from "node:zlib";

const SIG_EOCD    = 0x06054b50;
const SIG_CENTRAL = 0x02014b50;
const SIG_LOCAL   = 0x04034b50;

let CRC_TABLE = null;
function crcTable() {
  if (CRC_TABLE) return CRC_TABLE;
  CRC_TABLE = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    CRC_TABLE[n] = c;
  }
  return CRC_TABLE;
}

function crc32(buf) {
  const t = crcTable();
  let c = 0 ^ -1;
  for (let i = 0; i < buf.length; i++) c = (c >>> 8) ^ t[(c ^ buf[i]) & 0xff];
  return (c ^ -1) >>> 0;
}

/**
 * Read a ZIP archive into a Map of filename -> Buffer (decompressed).
 */
export function unzip(buffer) {
  // Locate End Of Central Directory by scanning backwards.
  let eocd = -1;
  for (let i = buffer.length - 22; i >= 0 && i >= buffer.length - 65557; i--) {
    if (buffer.readUInt32LE(i) === SIG_EOCD) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error("Not a valid ZIP/.docx file (no end-of-archive marker found).");

  const entryCount = buffer.readUInt16LE(eocd + 10);
  let offset = buffer.readUInt32LE(eocd + 16);

  const files = new Map();

  for (let i = 0; i < entryCount; i++) {
    if (buffer.readUInt32LE(offset) !== SIG_CENTRAL) break;

    const method      = buffer.readUInt16LE(offset + 10);
    const compSize    = buffer.readUInt32LE(offset + 20);
    const nameLen     = buffer.readUInt16LE(offset + 28);
    const extraLen    = buffer.readUInt16LE(offset + 30);
    const commentLen  = buffer.readUInt16LE(offset + 32);
    const localOffset = buffer.readUInt32LE(offset + 42);
    const name        = buffer.toString("utf8", offset + 46, offset + 46 + nameLen);

    // Jump to the local header to find where the data actually starts.
    if (buffer.readUInt32LE(localOffset) === SIG_LOCAL) {
      const lNameLen  = buffer.readUInt16LE(localOffset + 26);
      const lExtraLen = buffer.readUInt16LE(localOffset + 28);
      const dataStart = localOffset + 30 + lNameLen + lExtraLen;
      const raw = buffer.subarray(dataStart, dataStart + compSize);
      files.set(name, method === 8 ? zlib.inflateRawSync(raw) : Buffer.from(raw));
    }

    offset += 46 + nameLen + extraLen + commentLen;
  }

  return files;
}

/**
 * Build a ZIP archive from an array of { name, data } entries.
 */
export function zip(entries) {
  const locals = [];
  const centrals = [];
  let offset = 0;

  for (const { name, data } of entries) {
    const content    = Buffer.isBuffer(data) ? data : Buffer.from(data, "utf8");
    const compressed = zlib.deflateRawSync(content, { level: 9 });
    const nameBuf    = Buffer.from(name, "utf8");
    const sum        = crc32(content);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(SIG_LOCAL, 0);
    local.writeUInt16LE(20, 4);                  // version needed
    local.writeUInt16LE(0, 6);                   // flags
    local.writeUInt16LE(8, 8);                   // method: deflate
    local.writeUInt16LE(0, 10);                  // mod time
    local.writeUInt16LE(0x21, 12);               // mod date (1980-01-01)
    local.writeUInt32LE(sum, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(content.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);                  // extra length
    locals.push(local, nameBuf, compressed);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(SIG_CENTRAL, 0);
    central.writeUInt16LE(20, 4);                // version made by
    central.writeUInt16LE(20, 6);                // version needed
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(0, 12);
    central.writeUInt16LE(0x21, 14);
    central.writeUInt32LE(sum, 16);
    central.writeUInt32LE(compressed.length, 20);
    central.writeUInt32LE(content.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt16LE(0, 30);                // extra
    central.writeUInt16LE(0, 32);                // comment
    central.writeUInt16LE(0, 34);                // disk number
    central.writeUInt16LE(0, 36);                // internal attrs
    central.writeUInt32LE(0, 38);                // external attrs
    central.writeUInt32LE(offset, 42);           // local header offset
    centrals.push(central, nameBuf);

    offset += local.length + nameBuf.length + compressed.length;
  }

  const localPart   = Buffer.concat(locals);
  const centralPart = Buffer.concat(centrals);

  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(SIG_EOCD, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(centralPart.length, 12);
  eocd.writeUInt32LE(localPart.length, 16);
  eocd.writeUInt16LE(0, 20);

  return Buffer.concat([localPart, centralPart, eocd]);
}
