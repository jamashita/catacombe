# Catacombe

A repository packages that provides from various datasource.

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![CI](https://github.com/jamashita/catacombe/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/jamashita/catacombe/actions/workflows/ci.yml)

## Requisite

```
> node -v
v18.9.1

> npm -v
8.19.1

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

This class provides a simple interface for making API requests to the server.  
`FetchResponseType` represents the type of data that you can retrieve from the server. It can be one of the following
values: `'arrayBuffer'`, `'blob'`, `'json'`, or `'text'`.

### `new Fetch<T extends FetchResponseType>(type: T)`

This is a constructor for a class that always returns a response of the given `type`.

### `fetch.delete(url: string): Promise<FetchResponseType<T>>`

Send a delete request to the server.

### `fetch.get(url: string): Promise<FetchResponseType<T>>`

Send a get request to the server.

### `fetch.head(url: string): Promise<FetchResponseType<T>>`

Send a head request to the server.

### `fetch.post(url: string): Promise<FetchResponseType<T>>`

Send a post request to the server.

### `fetch.put(url: string): Promise<FetchResponseType<T>>`

Send a put request to the server.

## FetchError

`FetchError` is an error type for `Fetch`. It extends the `DataSourceError` class.

# File classes

## File

This class provides a simple interface for accessing files.

### `File.exists(path: string): Promise<boolean>`

Return `true` if a file with the given `path` exists, or `false` if it does not exist."

### `File.read(path: string): Promise<Buffer>`

Read a file with the given `path`.

### `File.write(path: string, data: Buffer | string): Promise<void>`

Write the given `data` to the file with the given `path`.

## FileError

`FileError` is an error type for `File`. It extends the `DataSourceError` class.

# Heap classes

## Heap

This class provides a simple interface for storing data in memory.

### `new Heap(seconds: number = Infinity)`

This is a constructor for a class that retains data for a specified number of `seconds`.

### `heap.get<H>(identifier: symbol): H`

Returns the value of the given `identifier`.

### `heap.set(identifier: symbol, value: unknown): void`

Store the given `value` with the given `identifier`.

## HeapError

`HeapError` is an error type for `Heap`. It extends the `DataSourceError` class.

This class provides a simple interface for storing data into MySQL.

# MySQL classes

## Connection

### `connection.commit(): Promise<void>`

Commit the pending transactions.

### `connection.execute<R>(sql: string, value?: ObjectLiteral): Promise<R>`

Execute the SQL statement. The result `R` will be returned. The `value` is assigned to the prepared statement before
execution.

### `connection.release(): void`

Terminate the current connection to the resource.

### `connection.rollback(): Promise<void>`

Rollback the current transactions.

## (interface) ISQL

### `sql.execute<R>(sql: string, value?: ObjectLiteral): Promise<R>`

Execute the `sql` statement. The result `R` will be returned. The `value` is assigned to the prepared statement before
execution.

## (interface) ITransaction\<R\>

### `transaction.with(sql: ISQL): Promise<R>`

This function handles a single transaction, with `R` indicating the returned value.

## MySQL

### `mysql.execute<R>(sql: string, value?: ObjectLiteral): Promise<R>`

Execute the SQL statement. The result `R` will be returned. The `value` is assigned to the prepared statement before
execution.

### `mysql.getConnection(): Promise<Connection>`

Return the `Connection`.

### `mysql.transact<R>(transaction: ITransaction<R>): Promise<R>`

Execute the given `transaction`. If successful, commit the changes and release the connection. If not, roll back the
transaction and release the connection.

## MySQLError

`MySQLError` is an error type for `MySQL`. It extends the `DataSourceError` class.

# Redis classes

## Redis

### `redis.delete(...keys: ReadonlyArray<string>): Promise<boolean>`

Delete the values associated with the keys specified in the `keys` list. Return `true` if all keys were successfully
deleted.

### `redis.exists(...keys: ReadonlyArray<string>): Promise<boolean>`

Check if the specified keys in the `keys` list exist and return `true` if all of them do, otherwise return `false`.

### `redis.exipires(key: string, seconds: number): Promise<boolean>`

Assign an expiration time of `seconds` to the key specified in `key`. Return `true` if the operation was successful.

### `redis.getHash(): RedisHash`

Return `RedisHash`.

### `redis.getList(): RedisList`

Return `RedisList`.

### `redis.getSet(): RedisSet`

Return `RedisSet`.

### `redis.getString(): RedisString`

Return `RedisString`.

### `redis.on(callback: BinaryConsumer<string, string>): void`

Add the event listener.

### `redis.publish(channel: string, message: string): Promise<number>`

Broadcast a `message` to the specified `channel`.

### `redis.subscribe(channel: string, callback: BinaryConsumer<string, string>): Promise<void>`

Begin listening for events on the specified `channel`.

### `redis.unsubscribe(...channels: ReadonlyArray<string>): Promise<void>`

Stop listening for events on the specified `channels`.

## RedisError

`RedisError` is an error type for `Redis`. It extends the `DataSourceError` class.

## RedisHash

Redis methods for hash.

### `redisHash.delete(key: string, field: string): Promise<number>`

Remove the field specified in `field` from the Hash stored at the key specified in `key`.

### `redisHash.get(key: string, field: string): Promise<Nullable<string>>`

Get the value of the given `field` from the Hash stored at the key specified in `key`. Return `null` if the value does
not exist.

### `redisHash.has(key: string, field: string): Promise<boolean>`

Return `true` if the given `field` exists in the Hash stored at the key specified in `key`.

### `redisHash.length(key: string): Promise<number>`

Retrieve the number of fields in the Hash stored at the given `key`.

### `redisHash.set(key: string, field: string, value: string): Promise<boolean>`

Set the value of `field` in the Hash stored at the key specified `key` to the given `value`.

## RedisList

Redis methods for list.

### `redisList.dump(key: string): Promise<Array<string>>`

Retrieve all values stored under the given `key` as an Array.

### `redisList.length(key: string): Promise<number>`

Retrieve the length of the Array stored at the given `key`.

### `redisList.pop(key: string): Promise<Nullable<string>>`

Return the last value of the Array stored in the given `key` and remove it from the it. May return `null` if it has no
elements.

### `redisList.push(key: string, value: string): Promise<number>`

Set the given `value` to the Array stored in the given `key`. Then return the current length of the Array.

### `redisList.remove(key: string, value: string): Promise<number>`

Remove the given `value` from the the Array stored in the given `key`. Return the current length of the Array.

### `redisList.select(key: string, offset: number, limit: number): Promise<Array<string>>`

Retrieve a subset of values from the Array stored in `key`, starting at `offset` and ending at `offset + limit`.

### `redisList.shift(key: string): Promise<Nullable<string>>`

Return the first value of the Array stored in the given `key` and remove it from the it. May return `null` if it has no
elements.

## RedisSet

Redis methods for set.

### `redisSet.add(key: string, ...values: ReadonlyArray<string>): Promise<number>`

Add the given `values` to the Set stored in specified `key`.

### `redisSet.dump(key: string)`

Retrieve all values stored under the given `key` as a Set.

### `redisSet.has(key: string, value: string): Promise<boolean>`

Return `true` if the given `value` exists in the Set stored at the key specified in `key`.

### `redisSet.length(key: string): Promise<number>`

Retrieve the length of the Array stored at the given `key`.

### `redisSet.pop(key: string): Promise<Nullable<string>>`

Return the last value of the Set stored in the given `key` and remove it from the it. May return `null` if it has no
elements.

### `redisSet.random(key: string): Promise<Array<number> | Nullable<string>>`

Retrieve a random element from the Set stored at the specified `key`.

### `redisSet.remove(key: string, ...values: ReadonlyArray<string>): Promise<number>`

Remove the given `values` from the the Set stored in the given `key`. Return the current size of the Set.

## RedisString

Redis methods for string.

### `redisString.get(key: string): Promise<Nullable<string>>`

Return the string of the given `key`. May return `null` if the string does not exist.
Retrieve the value stored at the given `key` as a string. May return `null` if the `key` does not exist or the value
stored at the `key`.

### `redisString.set(key: string, value: string): Promise<boolean>`

Set the given `value` to the given `key`.

# Request classes

## Request\<T extends RequestResponseType\>

This class provides a simple interface for sending requests to the server and receiving a response.
`RequestResponseType` represents the type of data that can be retrieved from the server, and it can be one of the
following values: `'buffer'`, `'json'`, or `'text'`.

### `new Request<T extends RequestResponseType>(type: T)`

This is a constructor for a class that returns a response of the specified `type` for every request.

### `request.delete(url: string): Promise<FetchResponseType<T>>`

Send a delete request to the server.

### `request.get(url: string): Promise<FetchResponseType<T>>`

Send a get request to the server.

### `request.head(url: string): Promise<FetchResponseType<T>>`

Send a head request to the server.

### `request.post(url: string): Promise<FetchResponseType<T>>`

Send a post request to the server.

### `request.put(url: string): Promise<FetchResponseType<T>>`

Send a put request to the server.

## RequestError

`RequestError` is an error type for `Request`. It extends the `DataSourceError` class.

## License

[MIT](LICENSE)