module.exports = function (router, { database }) {


    /*
        SELECT artworks_id FROM artworks_artwork_tags AS a
        JOIN artworks_artwork_tags AS b USING (artworks_id)
        JOIN artworks AS c ON (a.artworks_id = c.id)
        WHERE c.artist IN (296)
        AND a.artwork_tags_id IN (8)
        AND b.artwork_tags_id IN (3);
    */

    /*
    SELECT DISTINCT artwork_tags_id FROM artworks_artwork_tags
    WHERE artworks_id IN (
      SELECT a.artworks_id FROM artworks_artwork_tags AS a
      JOIN artworks AS c ON (a.artworks_id = c.id)
      WHERE c.artist IN (24)
      AND a.artwork_tags_id IN (18)
    );
    */



    // -------------------
    // Artists
    // -------------------

    function getArtists ({ artist, ...tags }) {

        const filters = Object.values(tags).filter(tag => tag);
        if (!filters.length) return Promise.resolve(null);

        return database.raw(`
            SELECT DISTINCT artworks.artist FROM artworks_artwork_tags AS tags
            JOIN artworks AS artworks ON (tags.artworks_id = artworks.id)
            ${filters.map((filter, i) => `JOIN artworks_artwork_tags AS f${i} USING (artworks_id)`).join(' ')}
            WHERE artworks.hidden_in_artworks = 0 AND
            ${filters.map((filter, i) => `f${i}.artwork_tags_id IN (${filter.join(',')})`).join(' AND ')};
        `).then(data => data[0].map(item => item.artist))
    }



    // -------------------
    // Tags
    // -------------------

    function getTags (key, _tags, artist) {

        const tags = { ..._tags };
        delete tags[key];
        const filters = Object.values(tags).filter(tag => tag);
        if (!filters.length && !artist) return Promise.resolve(null);

        return database.raw(`
            SELECT DISTINCT artwork_tags_id FROM artworks_artwork_tags
            WHERE artworks_id IN (
                SELECT tags.artworks_id FROM artworks_artwork_tags AS tags
                JOIN artworks AS artworks ON (tags.artworks_id = artworks.id)
                ${filters.map((filter, i) => `JOIN artworks_artwork_tags AS f${i} USING (artworks_id)`).join(' ')} 
                WHERE artworks.hidden_in_artworks = 0 AND                
                ${artist ? `artworks.artist IN (${artist})` : ''}
                ${artist && filters.length ? ' AND ' : ''}
                ${filters.map((filter, i) => `f${i}.artwork_tags_id IN (${filter.join(',')})`).join(' AND ')}
            );
        `).then(data => data[0].map(item => item.artwork_tags_id))
    }


    // -------------------
    // Tags parsers
    // -------------------

    function tags2req ({ artist, ...tags }) {
        return Object.keys(tags).map(key => getTags(key, tags, artist))
    }

    function res2tags (_tags, { artist, ...tags }) {
        return Object.fromEntries(_tags.map((tag, i) => {
            return [Object.keys(tags)[i], tag]
        }))
    }



    // -------------------
    // Route
    // -------------------

    router.get('/', async (req, res, next) => {

        Promise
            .all([
                getArtists(req.query),
                ...tags2req(req.query)
            ])
            .then(([ artist, ...tagRes ]) => {
                res.json({
                    data: { artist, ...res2tags(tagRes , req.query) }
                })
            })
            .catch(next);
    });



};