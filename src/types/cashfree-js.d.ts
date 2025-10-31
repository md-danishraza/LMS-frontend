declare module "@cashfreepayments/cashfree-js" {
  export interface LoadOptions {
    mode: "sandbox" | "production";
  }

  export interface Cashfree {
    checkout(options: any): Promise<any>;
    create(component: string, options?: any): any;
  }

  export function load(options: LoadOptions): Promise<Cashfree | null>;
}
