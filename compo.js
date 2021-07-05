function f(p, a, b) {
    return r = b.x - a.x, u = b.y - a.y, g = max(0, min(1, ((p.x - a.x) * r + (p.y - a.y) * u) / (sq(r) + sq(u)))), (sq(p.x - (a.x + g * r)) + sq(p.y - (a.y + g * u))) ** .5
}
