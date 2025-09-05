declare module '@prisma/client' {
  export class PrismaClient {
    [key: string]: any;
    $connect(): Promise<void>;
    $on(event: string, cb: (...args: any[]) => any): void;
    $transaction<T>(cb: (tx: any) => Promise<T>): Promise<T>;
  }
}


