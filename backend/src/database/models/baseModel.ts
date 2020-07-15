import connection from '../connnection'

class BaseModel {

    _table: string

    constructor(table: string) {
        this._table = table
    }

    findBy(column: string, value: string | number) {
        return connection
            .select()
            .table(this._table)
            .where(column, value)
    }

    findAll() {
        return connection
            .select()
            .table(this._table)
    }

    save(data: any) {
        return connection(this._table)
            .insert(data)
    }

    update(condition: any, data: any) {
        return connection(this._table)
            .where(condition)
            .update(data)
    }

    query() {
        return connection(this._table)
    }

    transaction(cb: any) {
        return connection.transaction(cb)
    }
}

export default BaseModel