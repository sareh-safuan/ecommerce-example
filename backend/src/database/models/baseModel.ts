import connection from '../connnection'

class BaseModel {

    _table: string

    constructor(table: string) {
        this._table = table
    }

    findOne(column: string, value: string | number) {
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
}

export default BaseModel