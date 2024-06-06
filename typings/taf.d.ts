declare namespace Taf {
  type Long = string | number

  type Vector<T> = {
    value: T[]
  }

  type Map<T> = {
    value: T
  }

  class JceInputStream {
    constructor(a: any)
  }

  class JceOutputStream {
    constructor()
    getBinBuffer(): Taf.BinBuffer
    getBuffer(): Taf.BinBuffer
  }

  interface BinBuffer extends ArrayBuffer {
    buf: ArrayBuffer
    len: number
    position: number
    vew: DataView
    buffer: ArrayBuffer
    length: number
  }

  class Wup {
    setServant(servantName: string): any
    setFunc(funcName: string): any
    setRequestId(id: any): any
    writeStruct(id: string, body: any): any
    readStruct(id: string, b: any, c: any): any
    decode(buffer: ArrayBuffer): any
    encode(): any
  }

  class Base {
    constructor()
    readFrom?(is: JceInputStream): any
    writeTo?(os: JceOutputStream): any
  }
}
