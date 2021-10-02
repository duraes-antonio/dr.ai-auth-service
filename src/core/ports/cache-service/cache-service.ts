export interface CacheService {
    /***
     * Requests a value related to a key to be cached
     * @param key Key that identifies the value to be stored
     * @param value Value to be stored
     */
    set<K extends string, V>(key: K, value: V): Promise<void>;

    /***
     * Retrieves the value related to input key
     * @param key Key that identifies value
     * @returns Value if existing, otherwise undefined
     */
    get<K extends string, V>(key: K): Promise<V | null>;

    /***
     * Remove the value related to input key
     * @param key Key that identifies value
     */
    remove<K extends string, V>(key: K): Promise<void>;
}
