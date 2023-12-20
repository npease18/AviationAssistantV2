import './Tab3Page.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong><br></br>
      Tab3
    </div>
  );
};

export default ExploreContainer;
