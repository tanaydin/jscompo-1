function f(p,a,b) {
    var lineLength = squaredDistance(a, b);
    if (lineLength == 0)
        return euclideanDistance(p, a);
    var t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / lineLength;
    t = Math.max(0, Math.min(1, t));
    return euclideanDistance(p, { x: a.x + t * (b.x - a.x),
        y: a.y + t * (b.y - a.y) });
}

function euclideanDistance(p1, p2) {
    return sqrt(squaredDistance(p1, p2))  ;
}

function squaredDistance(p1, p2) {
    return pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2);
}
