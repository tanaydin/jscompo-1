function f(p,a,b) {
    return t = max(0, min(1, ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / s(a, b))), sqrt(s(p, { x: a.x + t * (b.x - a.x),
        y: a.y + t * (b.y - a.y) }));
}

function s(a, b) {
    return pow(a.x - b.x, 2) + pow(a.y - b.y, 2);
}
