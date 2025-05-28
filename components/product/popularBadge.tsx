
interface BadgeProps {
    item: any
}
const PopularBadge = ({item}: BadgeProps)=>{
    return (
        <div>
               {item.numOfItemsSold > 5 && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Popular
                    </div>
                )}
        </div>
    )
}

export default PopularBadge