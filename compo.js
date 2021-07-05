function f(p, a, b) {
    return r = b.x - a.x, u = b.y - a.y, t = max(0, min(1, ((p.x - a.x) * r + (p.y - a.y) * u) / s(r, u))), s(p.x - (a.x + t * r), p.y - (a.y + t * u)) ** .5
}

function s(a, b) {
    return sq(a) + sq(b)
}
