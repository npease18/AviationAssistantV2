import './Tab1Page.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <iframe id="tar1090-iframe" src="http://aa.local/tar1090/"></iframe>
    </div>
  );
};

export default ExploreContainer;
