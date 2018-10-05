import slugify from 'slugify'

export default function slug(name) {
    return slugify(name, {lowe: true}).replace(/[^\w\-]+/g, '')
}