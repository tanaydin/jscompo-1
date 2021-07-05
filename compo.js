function f(p,a,b) {
    var t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / s(a, b);
    t = Math.max(0, Math.min(1, t));
    return e(p, { x: a.x + t * (b.x - a.x),
        y: a.y + t * (b.y - a.y) });
}

function e(a, b) {
    return sqrt(s(a, b))  ;
}

function s(a, b) {
    return pow(a.x - b.x, 2) + pow(a.y - b.y, 2);
}
