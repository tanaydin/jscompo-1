function f(p,a,b) {
    var t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / s(a, b);
    t = Math.max(0, Math.min(1, t));
    return sqrt(s(p, { x: a.x + t * (b.x - a.x),
        y: a.y + t * (b.y - a.y) }));
}

function s(a, b) {
    return pow(a.x - b.x, 2) + pow(a.y - b.y, 2);
}
