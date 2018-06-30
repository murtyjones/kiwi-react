import ReactGA from './index'

const performIfProd = action => process.env.NODE_ENV === 'production' ? action() : () => null

export const trackPage = performIfProd((page, options) => {
    ReactGA.set({
        page,
        ...options
    })
    ReactGA.pageview(page)
})