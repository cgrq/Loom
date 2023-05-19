import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"


export function ProductPage(){
    const { productId } = useParams()

    useEffect(()=>{
        
    },[])

    return (
        <div>
            Hello {productId}
        </div>
    )
}
