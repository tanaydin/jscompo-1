f=(p,a,b)=>(t=p.x-a.x,n=b.x-a.x,y=p.y-a.y,d=b.y-a.y,g=max(0,min(1,(t*n+y*d)/(n*n+d*d))),(sq(g*n-t)+sq(g*d-y))**.5)
