import connection from '../../config/connnection'

class BaseModel {

    _table: string

    constructor(table: string) {
        this._table = table
    }

    find(options: any) {
        const query = connection.select().table(this._table)

        const {
            filterColumn, filterValue, sortColumn, sortValue,
            pgColumn, pgOperator, pgLastItem, limit
        } = options

        if (filterColumn && filterValue) {
            query.where(filterColumn, filterValue)
        }

        if (sortColumn && sortValue) {
            query.orderBy(sortColumn, sortValue)
        }

        if (pgColumn && pgOperator && pgLastItem) {
            const operator = pgOperator === "gt" ? ">" : "<"
            query.where(pgColumn, operator, pgLastItem)
        }

        if (limit) {
            query.limit(limit)
        }

        return query
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