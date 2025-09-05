export class PrismaClient {
  [key: string]: any;
  async $connect() {}
  $on() {}
  async $transaction<T>(cb: (tx: any) => Promise<T>): Promise<T> {
    return cb({});
  }
}


