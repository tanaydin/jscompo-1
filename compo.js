function f(p, a, b) {
    return r = b.x - a.x, u = b.y - a.y, o = p.y - a.y, k = p.x - a.x, t = max(0, min(1, (k * r + o * u) / (sq(r) + sq(u)))), (sq(k - t * r) + sq(o - t * u)) ** .5
}
