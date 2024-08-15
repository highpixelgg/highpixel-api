export interface IActiveAccount {
  execute(secretCode: string): Promise<void>;
}
