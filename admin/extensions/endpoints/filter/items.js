module.exports = database => {

    // return async ({ collection, limit = 100, offset = 0, sort, filters, fields = '*' }) => {
    return async (query) => {

        const fields = query.fields || '*'
        const sort = query.sort ? `ORDER BY ${query.sort.field} ${query.sort.order}` : ''
        const limit = query.limit ? `LIMIT ${limit}` : ''
        const offset = query.offset ? `OFFSET ${offset}` : ''


        database.raw(`
            SELECT ${fields}
            FROM ${collection} 
            WHERE FIND_IN_SET('Theatre Designs', in_types) OR FIND_IN_SET('Watercolours', in_types) AND artist in ('263', '265')
     
            ${sort} ${limit} ${offset};       
        `)


        return Promise.resolve([])

    }


}