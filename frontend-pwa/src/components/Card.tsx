interface CardProps {
  title: string;
  onClick?: () => void;
  cardActions?: React.ReactNode;
  children: React.ReactNode;
}

function Card({ title, children, cardActions, onClick }: CardProps) {
  return (
    <div className="border rounded p-1 w-full h-full" onClick={onClick}>
      <div className="flex justify-between">
        <p>{title}</p>
        <div className="flex gap-1"> {cardActions} </div>
      </div>

      {children}
    </div>
  );
}

export default Card;
