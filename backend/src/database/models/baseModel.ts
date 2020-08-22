import connection from '../../config/connnection'

class BaseModel {

    _table: string

    constructor(table: string) {
        this._table = table
    }

    find(id: number) {
        return connection(this._table).select().where('id', id)
    }

    save(data: any) {
        return connection(this._table).insert(data)
    }

    update(condition: any, data: any) {
        return connection(this._table).where(condition).update(data)
    }

    destroy() {}

    query() {
        return connection(this._table)
    }

    transaction(cb: any) {
        return connection.transaction(cb)
    }
}

export default BaseModel