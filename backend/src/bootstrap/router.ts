import { Router } from 'express'

interface RouteList {
    basePath: string,
    router: Router
}

interface RouteObject {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | '*',
    path: string,
    middleware?: Array<any>,
    handler: any
}

const assignRoute = (router: Router, routeObject: RouteObject) => {
    const { method, path, handler } = routeObject
    const middleware = routeObject.middleware || []

    switch (method) {
        case 'GET':
            router.get(path, middleware, handler)
            break
        case 'POST':
            router.post(path, middleware, handler)
            break
        case 'PUT':
            router.put(path, middleware, handler)
            break
        case 'DELETE':
            router.delete(path, middleware, handler)
            break
        default:
            router.all(path, middleware, handler)
            break
    }

    return router
}

class Route {
    routeList: Array<RouteList>

    constructor() {
        this.routeList = []
    }

    list() {
        return this.routeList
    }

    register(...args: any): void {
        if (args.length === 1) {
            const ungroup = this.routeList.find(rl => rl.basePath === '/')
            const routeObject: RouteObject = args[0]
            let router: Router

            if (!ungroup) {
                router = Router()
                router = assignRoute(router, routeObject)

                this.routeList.push({ basePath: '/', router })
            } else {
                ungroup.router = assignRoute(ungroup.router, routeObject)
            }

        } else {
            const basePath: string = args[0]
            const routeObjects: Array<RouteObject> = args[1]
            let router = Router()

            routeObjects.forEach(ro => {
               router = assignRoute(router, ro) 
            })

            this.routeList.push({ basePath, router })
        }
    }
}

export default new Route