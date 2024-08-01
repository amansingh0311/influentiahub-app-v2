import MainLayout from "../../components/MainLayout";
import { ConnectChannels } from "./ConnectChannels";
import DashboardCalendar from "./DashboardCalendar";

export default function OnboardingDashboard() {
  return (
    <MainLayout>
      <div className="flex gap-2">
        <div>
          <ConnectChannels />
        </div>
        <div>
         <DashboardCalendar/>
        </div>
      </div>
    </MainLayout>
  );
}
