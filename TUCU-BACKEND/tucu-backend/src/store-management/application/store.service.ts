import { Store } from "../domain/Store";
import { IStoreRepository } from "../domain/interfaces/store.interface";

export class StoreService {
  private storeRepository: IStoreRepository;

  constructor(storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }

  public async addStore(
    id_store: number,
    name: string,
    street: string,
    number: number,
    city: string,
    province: string,
    country: string,
    prefix: string,
    numberPhone: string,
    postal_code?: number,
    details?: string
  ): Promise<Store> {
    const store = new Store(
      id_store,
      name,
      street,
      number,
      city,
      province,
      country,
      prefix,
      numberPhone,
      postal_code,
      details
    );

    return await this.storeRepository.addStore(store);
  }

  public async getAllStores(): Promise<Store[]> {
    return await this.storeRepository.findAll();
  }

  public async getStoreById(id: number): Promise<Store | null> {
    return await this.storeRepository.findById(id);
  }

  public async disableStore(id: number): Promise<boolean> {
    return await this.storeRepository.disableStore(id);
  }
}
