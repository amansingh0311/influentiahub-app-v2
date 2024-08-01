import MainLayout from "../../components/MainLayout";
import { ConnectChannels } from "./ConnectChannels";


export default function OnboardingDashboard() {
  return (
    <MainLayout className="text-black">
      <ConnectChannels/>
    </MainLayout>
  );
}
