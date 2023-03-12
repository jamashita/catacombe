# Catacombe

A repository packages that provides from various datasource.

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![CI](https://github.com/jamashita/catacombe/actions/workflows/ci.yml/badge.svg)](https://github.com/jamashita/catacombe/actions/workflows/ci.yml)

## Install

```text
yarn add @jamashita/catacombe
```

## Todo

- [ ] IndexedDB
- [ ] LocalStorage
- [ ] SessionStorage

## Requisite

```
> node -v
v19.7.0

> npm -v
9.5.0

> yarn -v
1.22.19
```

## Conventional commit

```
git cz
```

# DataSource

## DatasourceError

An error class for data source that extends `RuntimeError` from `@jamashita/anden`.

# Fetch classes

## Fetch\<T extends FetchResponseType\>

This class provides a simple interface for making API requests to the server. `FetchResponseType` represents the type of
data that you can retrieve from the server. It can be one of the following values: `'arrayBuffer'`, `'blob'`, `'json'`,
or `'text'`.

### `new Fetch<T extends FetchResponseType>(type: T)`

This is a constructor for a class that always returns a response of the given `type`.

### `Fetch.prototype.delete(url: string): Promise<FetchResponseType<T>>`

Sends a DELETE request to the server at the specified `url`. Returns a promise that resolves to the server's response
with the specified data `type`.

### `Fetch.prototype.get(url: string): Promise<FetchResponseType<T>>`

Sends a GET request to the server at the specified `url`. Returns a promise that resolves to the server's response with
the specified data `type`.

### `Fetch.prototype.head(url: string): Promise<FetchResponseType<T>>`

Sends a HEAD request to the server at the specified `url`. Returns a promise that resolves to the server's response with
the specified data `type`.

### `Fetch.prototype.post(url: string, payload?: ObjectLiteral): Promise<FetchResponseType<T>>`

Sends a POST request to the server at the specified `url` with an optional body `payload`. Returns a promise that
resolves to the server's response with the specified data `type`.

### `Fetch.prototype.put(url: string, payload: ObjectLiteral): Promise<FetchResponseType<T>>`

Sends a PUT request to the server at the specified `url` with an optional body `payload`. Returns a promise that
resolves to the server's response with the specified data `type`.

## FetchError

`FetchError` is an error type for `Fetch`. It extends the `DataSourceError` class.

# File classes

## File

This class provides a simple interface for interacting with files on the file system.

### `File.exists(path: string): Promise<boolean>`

Checks whether a file with the given `path` exists. Returns a promise that resolves to `true` if the file exists,
or `false` if it does not exist.

### `File.read(path: string): Promise<Buffer>`

Reads the contents of a file with the given `path`. Returns a promise that resolves to a `Buffer` object containing the
file's data.

### `File.write(path: string, data: Buffer | string): Promise<void>`

Writes the given data to the file with the given `path`. `data` can be either a `Buffer` object or a string. Returns a
promise that resolves when the write operation is complete.

## FileError

`FileError` is an error type for `File`. It extends the `DataSourceError` class.

# Heap classes

## Heap

This class provides a simple interface for storing data in memory.

### `new Heap(seconds: number = Infinity)`

This is a constructor for a class that retains data for a specified number of `seconds`. If you set the seconds to
`Infinity`, the data will be retained forever.

### `Heap.prototype.get<H>(identifier: symbol): H`

Retrieves the value associated with the given `identifier`. The type of the returned value is specified by the generic
type `H`.

### `Heap.prototype.set(identifier: symbol, value: unknown): void`

Stores the given `value` with the given `identifier`. The stored value can be retrieved using the get method with the
same `identifier`.

## HeapError

`HeapError` is an error type for `Heap`. It extends the `DataSourceError` class.

This class provides a simple interface for storing data into MySQL.

# MySQL classes

## Connection

### `Connection.prototype.commit(): Promise<void>`

Commits the pending transactions.

### `Connection.prototype.execute<R>(sql: string, value?: ObjectLiteral): Promise<R>`

Executes the SQL statement. The result `R` will be returned. The `value` is assigned to the prepared statement before
execution.

### `Connection.prototype.release(): void`

Terminates the current connection to the resource.

### `Connection.prototype.rollback(): Promise<void>`

Rollbacks the current transactions.

## (interface) ISQL

### `SQL.prototype.execute<R>(sql: string, value?: ObjectLiteral): Promise<R>`

Executes the `sql` statement. The result `R` will be returned. The `value` is assigned to the prepared statement before
execution.

## (interface) ITransaction\<R\>

### `Transaction.prototype.with(sql: ISQL): Promise<R>`

This method handles a single transaction, with `R` indicating the returned value. The `ISQL` instance is used to execute
SQL statements within the transaction.

## MySQL

### `MySQL.prototype.execute<R>(sql: string, value?: ObjectLiteral): Promise<R>`

Executes the SQL statement. The result `R` will be returned. The `value` is assigned to the prepared statement before
execution.

### `MySQL.prototype.getConnection(): Promise<Connection>`

Returns the `Connection`.

### `MySQL.prototype.transact<R>(transaction: ITransaction<R>): Promise<R>`

Executes the given `transaction`. If successful, commit the changes and release the connection. If not, roll back the
transaction and release the connection.

## MySQLError

`MySQLError` is an error type for `MySQL`. It extends the `DataSourceError` class.

# Redis classes

## Redis

### `Redis.prototype.delete(...keys: ReadonlyArray<string>): Promise<boolean>`

Deletes the values associated with the keys specified in the `keys` list. Returns `true` if all keys were successfully
deleted.

### `Redis.prototype.exists(...keys: ReadonlyArray<string>): Promise<boolean>`

Checks if the specified keys in the `keys` list exist and return `true` if all of them do, otherwise return `false`.

### `Redis.prototype.exipires(key: string, seconds: number): Promise<boolean>`

Assigns an expiration time of `seconds` to the key specified in `key`. Returns `true` if the operation was successful.

### `Redis.prototype.getHash(): RedisHash`

Returns `RedisHash`.

### `Redis.prototype.getList(): RedisList`

Returns `RedisList`.

### `Redis.prototype.getSet(): RedisSet`

Returns `RedisSet`.

### `Redis.prototype.getString(): RedisString`

Returns `RedisString`.

### `Redis.prototype.on(callback: BinaryConsumer<string, string>): void`

Adds the event listener.

### `Redis.prototype.publish(channel: string, message: string): Promise<number>`

Broadcasts a `message` to the specified `channel`. Returns the number of clients that received the message.

### `Redis.prototype.subscribe(channel: string, callback: BinaryConsumer<string, string>): Promise<void>`

Begins listening for events on the specified `channel`.

### `Redis.prototype.unsubscribe(...channels: ReadonlyArray<string>): Promise<void>`

Stops listening for events on the specified `channels`.

## RedisError

`RedisError` is an error type for `Redis`. It extends the `DataSourceError` class.

## RedisHash

Redis methods for hash.

### `RedisHash.prototype.delete(key: string, field: string): Promise<number>`

Removes the field specified in `field` from the Hash stored at the key specified in `key`. Returns the number of fields
that were removed.

### `RedisHash.prototype.get(key: string, field: string): Promise<Nullable<string>>`

Gets the value of the given `field` from the Hash stored at the key specified in `key`. Return `null` if the value does
not exist.

### `RedisHash.prototype.has(key: string, field: string): Promise<boolean>`

Returns `true` if the given `field` exists in the Hash stored at the key specified in `key`.

### `RedisHash.prototype.length(key: string): Promise<number>`

Retrieves the number of fields in the Hash stored at the given `key`.

### `RedisHash.prototype.set(key: string, field: string, value: string): Promise<boolean>`

Sets the value of `field` in the Hash stored at the key specified `key` to the given `value`. Returns `true` if
the `field` is new, `false` if it was updated.

## RedisList

Redis methods for list.

### `RedisList.prototype.dump(key: string): Promise<Array<string>>`

Retrieves all elements stored under the given `key` as an Array.

### `RedisList.prototype.length(key: string): Promise<number>`

Retrieves the length of the list stored at the given `key`.

### `RedisList.prototype.pop(key: string): Promise<Nullable<string>>`

Returns the last element of the list stored in the given `key` and remove it from the list. May return `null` if it has
no elements.

### `RedisList.prototype.push(key: string, value: string): Promise<number>`

Adds the given `value` to the end of the list stored in the given `key`. Then return the current length of the list.

### `RedisList.prototype.remove(key: string, value: string): Promise<number>`

Removes the given `value` from the the list stored in the given `key`. Return the current length of the list.

### `RedisList.prototype.select(key: string, offset: number, limit: number): Promise<Array<string>>`

Retrieves a subset of elements from the list stored in `key`, starting at `offset` index and ending at `offset + limit`
index.

### `RedisList.prototype.shift(key: string): Promise<Nullable<string>>`

Returns the first element of the list stored in the given `key` and remove it from the list. May return `null` if it has
no elements.

## RedisSet

Redis methods for set.

### `RedisSet.prototype.add(key: string, ...values: ReadonlyArray<string>): Promise<number>`

Adds the given `values` to the Set stored in specified `key`. Returns the number of elements added to the set, not
including already existing elements.

### `RedisSet.prototype.dump(key: string)`

Retrieves all values stored under the given `key` as a Set.

### `RedisSet.prototype.has(key: string, value: string): Promise<boolean>`

Returns `true` if the given `value` exists in the Set stored at the key specified in `key`.

### `RedisSet.prototype.length(key: string): Promise<number>`

Retrieves the length of the Set stored at the given `key`.

### `RedisSet.prototype.pop(key: string): Promise<Nullable<string>>`

Removes and returns a random element from the Set stored in the given `key`. May return `null` if it has no elements.

### `RedisSet.prototype.random(key: string): Promise<Array<number> | Nullable<string>>`

Retrieves a random element from the Set stored at the specified `key`.

### `RedisSet.prototype.remove(key: string, ...values: ReadonlyArray<string>): Promise<number>`

Removes the given `values` from the the Set stored in the given `key`. Returns the current size of the Set.

## RedisString

Redis methods for string.

### `RedisString.prototype.get(key: string): Promise<Nullable<string>>`

Retrieves the value stored at the given `key` as a string. May return `null` if the key does not exist or the value
stored at the `key` is not a string.

### `RedisString.prototype.set(key: string, value: string): Promise<boolean>`

Store the given `value` at the given `key`. Return `true` if the operation was successful.

# Request classes

## Request\<T extends RequestResponseType\>

This class provides a simple interface for sending requests to the server and receiving a response.
`RequestResponseType` represents the type of data that can be retrieved from the server, and it can be one of the
following values: `'buffer'`, `'json'`, or `'text'`.

### `new Request<T extends RequestResponseType>(type: T)`

This is a constructor for a class that returns a response of the specified `type` for every request.

### `Request.prototype.delete(url: string): Promise<FetchResponseType<T>>`

Sends a DELETE request to the server at the specified `url`. Returns a promise that resolves to the server's response
with the specified data `type`.

### `Request.prototype.get(url: string): Promise<FetchResponseType<T>>`

Sends a GET request to the server at the specified `url`. Returns a promise that resolves to the server's response with
the specified data `type`.

### `Request.prototype.head(url: string): Promise<FetchResponseType<T>>`

Sends a HEAD request to the server at the specified `url`. Returns a promise that resolves to the server's response with
the specified data `type`.

### `Request.prototype.post(url: string, payload?: ObjectLiteral): Promise<FetchResponseType<T>>`

Sends a POST request to the server at the specified `url` with an optional body `payload`. Returns a promise that
resolves to the server's response with the specified data `type`.

### `Request.prototype.put(url: string, payload?: ObjectLiteral): Promise<FetchResponseType<T>>`

Sends a PUT request to the server at the specified `url` with an optional body `payload`. Returns a promise that
resolves to the server's response with the specified data `type`.

## RequestError

`RequestError` is an error type for `Request`. It extends the `DataSourceError` class.

## License

[MIT](LICENSE)