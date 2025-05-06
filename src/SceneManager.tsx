import LandingScene from "./landing/LandingScene";
import OfficeScene from "./office/OfficeScene";

const SceneManager: React.FC<{ showLanding: boolean }> = ({ showLanding }) => {
  return showLanding ? <LandingScene /> : <OfficeScene />;
};

export default SceneManager;