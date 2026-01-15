import { createContext, useContext, useEffect, useState } from "react";

const WishContext = createContext()

export function WishProvider({ children }) {

    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem("wishlist")
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }, [wishlist])

    const addToWish = (article) => {
        setWishlist((currentWish) => {
            if (currentWish.find((item) => item.id === article.id)) return currentWish
            return [...currentWish, article]
        })
    }

    const removeFromWish = (id) => {
        setWishlist((currentWish) => currentWish.filter((item) => item.id !== id))
    }

    const isInWish = (id) => {
        return wishlist.some((item) => item.id === id)
    }
    const clearWish = () => {
        setWishlist([])
    }

    return (
        <WishContext.Provider value={{ wishlist, addToWish, removeFromWish, isInWish, clearWish }}>
            {children}
        </WishContext.Provider>
    )



}

export function useWish() {
    return useContext(WishContext)
}