import useQueryCards from "@/hooks/use-query-cards";
import Card from "./card";

const Cards = () => {
    const { cards } = useQueryCards();

    return (
        <div>
            { cards.map((card) => (
                <Card card={card} key={card.id}/>
            ))}
        </div>
    );
};

export default Cards;


